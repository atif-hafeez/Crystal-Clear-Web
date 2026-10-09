"use strict";
/**
 * Crystal Clear Home transport-neutral cloud adapter.
 * Injection-only: no tokens, endpoint URLs, or demo credentials are bundled.
 * Host app must supply authenticated transport and enforce roles SERVER SIDE.
 * No write is acknowledged until the remote service confirms persistence.
 */
(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root) root.HomeCloud = api;
})(typeof window === "undefined" ? null : window, function () {
  function assertTransport(transport) {
    if (!transport || typeof transport.invoke !== "function") throw new TypeError("Authenticated transport required");
  }
  function required(value, label) {
    if (typeof value !== "string" || !value.trim()) throw new TypeError(label + " required");
    return value.trim();
  }
  function create(transport) {
    assertTransport(transport);
    async function call(action, body) {
      const response = await transport.invoke(action, body);
      if (!response || response.ok !== true) {
        throw new Error(response?.error || "Remote operation failed");
      }
      return response.data;
    }
    return Object.freeze({
      async start(roomId, notes = "") {
        return call("createActivity", { roomId: required(roomId, "roomId"), notes: String(notes).slice(0, 500) });
      },
      async upload(activityId, photo) {
        required(activityId, "activityId");
        if (!photo || !["before", "after"].includes(photo.stage)) throw new TypeError("Valid photo stage required");
        if (!(photo.blob instanceof Blob)) throw new TypeError("Image blob required");
        if (!["image/jpeg", "image/png", "image/webp"].includes(photo.blob.type)) throw new TypeError("Unsupported photo type");
        if (photo.blob.size === 0 || photo.blob.size > 6 * 1024 * 1024) throw new RangeError("Image must be 1–6 MB");
        // Transport encodes image only after authentication; never store in public repository.
        return call("uploadEvidence", { activityId, stage: photo.stage, blob: photo.blob, capturedAt: photo.capturedAt || null });
      },
      async complete(activityId) {
        return call("completeActivity", { activityId: required(activityId, "activityId") });
      },
      async list({ fromUtc, toUtc, roomId = "", offset = 0, limit = 20 }) {
        required(fromUtc, "fromUtc"); required(toUtc, "toUtc");
        return call("listActivities", { fromUtc, toUtc, roomId, offset, limit: Math.min(50, Math.max(1, limit)) });
      },
      async details(activityId) {
        return call("activityDetails", { activityId: required(activityId, "activityId") });
      }
    });
  }
  return Object.freeze({create});
});
