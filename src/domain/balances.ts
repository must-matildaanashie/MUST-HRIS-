import { HOURS_PER_DAY } from "./enums";

export function round1(n: number): number {
  return Math.round(n * 10) / 10;
}

export interface BalanceShape {
  entitlementHours: number;
  usedHours: number;
  reservedHours: number;
  unlimited?: boolean;
}

/** available = entitlement − used − reserved (Infinity for unlimited types) */
export function availableHours(b: BalanceShape): number {
  if (b.unlimited) return Infinity;
  return round1(b.entitlementHours - b.usedHours - b.reservedHours);
}

export function hoursToDays(hours: number): number {
  return round1(hours / HOURS_PER_DAY);
}
export function daysToHours(days: number): number {
  return round1(days * HOURS_PER_DAY);
}

/**
 * The reserved-while-pending lifecycle, as pure balance deltas.
 * The request service applies these inside a DB transaction.
 */
export const balanceDelta = {
  /** On submit: hold the hours (do not deduct yet). */
  reserve: (hours: number) => ({ reservedHours: hours, usedHours: 0 }),
  /** On approval: move reserved → used. */
  approve: (hours: number) => ({ reservedHours: -hours, usedHours: hours }),
  /** On cancel / decline / expire: release the hold. */
  release: (hours: number) => ({ reservedHours: -hours, usedHours: 0 }),
};

export function applyDelta(b: BalanceShape, d: { reservedHours: number; usedHours: number }): BalanceShape {
  return {
    ...b,
    reservedHours: Math.max(0, round1(b.reservedHours + d.reservedHours)),
    usedHours: Math.max(0, round1(b.usedHours + d.usedHours)),
  };
}
