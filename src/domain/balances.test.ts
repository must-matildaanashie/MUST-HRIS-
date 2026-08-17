import { describe, it, expect } from "vitest";
import { availableHours, balanceDelta, applyDelta, hoursToDays, daysToHours } from "./balances";

describe("availableHours", () => {
  it("subtracts used and reserved", () => {
    expect(availableHours({ entitlementHours: 120, usedHours: 64, reservedHours: 0 })).toBe(56);
    expect(availableHours({ entitlementHours: 120, usedHours: 64, reservedHours: 8 })).toBe(48);
  });
  it("is Infinity for unlimited types", () => {
    expect(availableHours({ entitlementHours: 0, usedHours: 0, reservedHours: 0, unlimited: true })).toBe(Infinity);
  });
});

describe("reserved-while-pending lifecycle", () => {
  const start = { entitlementHours: 120, usedHours: 64, reservedHours: 0 };

  it("reserve holds hours without deducting", () => {
    const after = applyDelta(start, balanceDelta.reserve(8));
    expect(after.reservedHours).toBe(8);
    expect(after.usedHours).toBe(64);
    expect(availableHours(after)).toBe(48);
  });

  it("approve moves reserved -> used, available unchanged", () => {
    const reserved = applyDelta(start, balanceDelta.reserve(8));
    const approved = applyDelta(reserved, balanceDelta.approve(8));
    expect(approved.reservedHours).toBe(0);
    expect(approved.usedHours).toBe(72);
    expect(availableHours(approved)).toBe(48);
  });

  it("release returns hours to available", () => {
    const reserved = applyDelta(start, balanceDelta.reserve(8));
    const released = applyDelta(reserved, balanceDelta.release(8));
    expect(released.reservedHours).toBe(0);
    expect(released.usedHours).toBe(64);
    expect(availableHours(released)).toBe(56);
  });
});

describe("day/hour conversion", () => {
  it("converts both ways at 8h/day", () => {
    expect(daysToHours(3)).toBe(24);
    expect(hoursToDays(24)).toBe(3);
    expect(hoursToDays(4)).toBe(0.5);
  });
});
