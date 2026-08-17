// Central place for the "enum" string values (SQLite has no native enums).

export const Role = {
  EMPLOYEE: "EMPLOYEE",
  LEAD: "LEAD",
  HR_OPS: "HR_OPS",
} as const;
export type Role = (typeof Role)[keyof typeof Role];

export const LeaveStatus = {
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  DECLINED: "DECLINED",
  CANCELLED: "CANCELLED",
  EXPIRED: "EXPIRED",
} as const;
export type LeaveStatus = (typeof LeaveStatus)[keyof typeof LeaveStatus];

/** Statuses that hold a reservation against the balance. */
export const ACTIVE_STATUSES: LeaveStatus[] = [LeaveStatus.PENDING, LeaveStatus.APPROVED];

/** Statuses whose reservation has been released back to the balance. */
export const RELEASED_STATUSES: LeaveStatus[] = [
  LeaveStatus.DECLINED,
  LeaveStatus.CANCELLED,
  LeaveStatus.EXPIRED,
];

export const NotificationTarget = {
  REQUEST: "REQUEST",
  DOCUMENT: "DOCUMENT",
  PAYSLIP: "PAYSLIP",
  PAGE: "PAGE",
} as const;
export type NotificationTarget = (typeof NotificationTarget)[keyof typeof NotificationTarget];

export const DocumentStatus = { SIGNED: "SIGNED", NEEDS_SIGN: "NEEDS_SIGN" } as const;

/** A working day = 8 hours. Used to convert Days <-> Hours. */
export const HOURS_PER_DAY = 8;
