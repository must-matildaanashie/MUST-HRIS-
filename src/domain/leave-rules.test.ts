import { describe, it, expect } from "vitest";
import { validateLeaveRequest, calendarDays, type LeaveTypeRule } from "./leave-rules";

const today = new Date(Date.UTC(2026, 6, 23)); // 2026-07-23

const annual: LeaveTypeRule = {
  key: "annual", name: "Annual Leave", unlimited: false, entitlementHours: 120,
  maxDaysPerRequest: 3, exactDays: null, maxHoursPerDay: null, incrementHours: 4,
  requiresAdvance: false, requiresProof: false,
};
const bvl: LeaveTypeRule = {
  key: "bvl", name: "Bonus Vacation Leave", unlimited: false, entitlementHours: 32,
  maxDaysPerRequest: null, exactDays: 4, maxHoursPerDay: null, incrementHours: null,
  requiresAdvance: false, requiresProof: false,
};
const ot: LeaveTypeRule = {
  key: "ot", name: "Overtime", unlimited: true, entitlementHours: null,
  maxDaysPerRequest: null, exactDays: null, maxHoursPerDay: 2, incrementHours: null,
  requiresAdvance: true, requiresProof: false,
};
const family: LeaveTypeRule = {
  key: "family", name: "Family Leave", unlimited: false, entitlementHours: 40,
  maxDaysPerRequest: null, exactDays: null, maxHoursPerDay: null, incrementHours: null,
  requiresAdvance: false, requiresProof: true,
};

const day = (iso: string) => new Date(iso + "T00:00:00Z");

describe("calendarDays", () => {
  it("counts inclusive days", () => {
    expect(calendarDays(day("2026-08-12"), day("2026-08-14"))).toBe(3);
    expect(calendarDays(day("2026-08-12"), day("2026-08-12"))).toBe(1);
  });
});

describe("Annual increments (half/full day)", () => {
  const base = { availableHours: 56, today };
  it("blocks 2 hours", () => {
    const r = validateLeaveRequest(annual, { fromDate: day("2026-08-12"), toDate: day("2026-08-12"), hours: 2 }, base);
    expect(r.ok).toBe(false);
    expect(r.error).toMatch(/4-hour steps/);
  });
  it("allows 4 hours (half day)", () => {
    const r = validateLeaveRequest(annual, { fromDate: day("2026-08-12"), toDate: day("2026-08-12"), hours: 4 }, base);
    expect(r.ok).toBe(true);
  });
  it("allows 8 hours (full day)", () => {
    const r = validateLeaveRequest(annual, { fromDate: day("2026-08-12"), toDate: day("2026-08-12"), hours: 8 }, base);
    expect(r.ok).toBe(true);
  });
  it("blocks more than 3 days", () => {
    const r = validateLeaveRequest(annual, { fromDate: day("2026-08-12"), toDate: day("2026-08-16"), hours: 40 }, base);
    expect(r.ok).toBe(false);
    expect(r.error).toMatch(/at most 3 days/);
  });
});

describe("BVL exact-days", () => {
  it("requires exactly 4 days", () => {
    const ctx = { availableHours: 32, today };
    expect(validateLeaveRequest(bvl, { fromDate: day("2026-08-12"), toDate: day("2026-08-14"), hours: 24 }, ctx).ok).toBe(false);
    expect(validateLeaveRequest(bvl, { fromDate: day("2026-08-12"), toDate: day("2026-08-15"), hours: 32 }, ctx).ok).toBe(true);
  });
});

describe("Overtime advance-only", () => {
  const ctx = { availableHours: Infinity, today };
  it("blocks past/today dates", () => {
    expect(validateLeaveRequest(ot, { fromDate: day("2026-07-23"), toDate: day("2026-07-23"), hours: 2 }, ctx).ok).toBe(false);
  });
  it("allows a future date within the daily cap", () => {
    expect(validateLeaveRequest(ot, { fromDate: day("2026-07-30"), toDate: day("2026-07-30"), hours: 2 }, ctx).ok).toBe(true);
  });
  it("blocks over the daily cap", () => {
    expect(validateLeaveRequest(ot, { fromDate: day("2026-07-30"), toDate: day("2026-07-30"), hours: 4 }, ctx).ok).toBe(false);
  });
});

describe("Past-date retrospective", () => {
  const ctx = { availableHours: 56, today };
  it("blocks a past date without the retrospective flag", () => {
    expect(validateLeaveRequest(annual, { fromDate: day("2026-07-01"), toDate: day("2026-07-01"), hours: 8 }, ctx).ok).toBe(false);
  });
  it("allows a past date when marked retrospective", () => {
    expect(validateLeaveRequest(annual, { fromDate: day("2026-07-01"), toDate: day("2026-07-01"), hours: 8, retrospective: true }, ctx).ok).toBe(true);
  });
});

describe("Family proof", () => {
  const ctx = { availableHours: 40, today };
  it("requires proof", () => {
    expect(validateLeaveRequest(family, { fromDate: day("2026-08-12"), toDate: day("2026-08-12"), hours: 8 }, ctx).ok).toBe(false);
    expect(validateLeaveRequest(family, { fromDate: day("2026-08-12"), toDate: day("2026-08-12"), hours: 8, hasProof: true }, ctx).ok).toBe(true);
  });
});

describe("Balance + overlap", () => {
  it("blocks over available balance", () => {
    expect(validateLeaveRequest(annual, { fromDate: day("2026-08-12"), toDate: day("2026-08-12"), hours: 8 }, { availableHours: 4, today }).ok).toBe(false);
  });
  it("allows same date if the day stays within 8h, blocks if it exceeds", () => {
    const booked = { "2026-08-12": 4 };
    expect(validateLeaveRequest(annual, { fromDate: day("2026-08-12"), toDate: day("2026-08-12"), hours: 4 }, { availableHours: 56, today, bookedByDate: booked }).ok).toBe(true);
    expect(validateLeaveRequest(annual, { fromDate: day("2026-08-12"), toDate: day("2026-08-12"), hours: 8 }, { availableHours: 56, today, bookedByDate: booked }).ok).toBe(false);
  });
});
