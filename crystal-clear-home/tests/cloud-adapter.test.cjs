"use strict";
const assert = require("node:assert/strict");
const test = require("node:test");
const { create } = require("../cloud-adapter.js");
test("rejects missing trusted transport", () => {
  assert.throws(() => create(null), /Authenticated transport/);
});
test("start delegates with bounded notes, waits for confirmation", async () => {
  const events = [];
  const api = create({ invoke: async (action, payload) => {
    events.push({action, payload});
    return {ok: true, data: {activityId: "ACT-1"}};
  }});
  assert.deepEqual(await api.start("ROOM-LIVING", "a".repeat(600)), {activityId: "ACT-1"});
  assert.equal(events[0].action, "createActivity");
  assert.equal(events[0].payload.notes.length, 500);
});
test("rejected backend response never reports a successful save", async () => {
  const api = create({ invoke: async () => ({ok: false, error: "Unauthorized"}) });
  await assert.rejects(api.complete("ACT-1"), /Unauthorized/);
});
test("validates before/after and photo size locally before calling backend", async () => {
  let calls = 0;
  const api = create({invoke: async () => {calls++; return {ok: true, data:{}};}});
  await assert.rejects(api.upload("ACT-1", {stage: "during", blob: new Blob(["a"],{type:"image/jpeg"})}), /stage/);
  await assert.rejects(api.upload("ACT-1", {stage: "before", blob: new Blob(["a"],{type:"text/plain"})}), /type/);
  assert.equal(calls, 0);
});
test("Manager list enforces bounded page size", async () => {
  let payload;
  const api = create({invoke: async (_action, body) => {payload=body;return {ok:true,data:{items:[]}};}});
  await api.list({fromUtc:"2026-10-09T00:00:00Z",toUtc:"2026-10-10T00:00:00Z",limit:500});
  assert.equal(payload.limit,50);
});
