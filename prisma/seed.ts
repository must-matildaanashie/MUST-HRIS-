import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const YEAR = 2026;
const d = (iso: string) => new Date(iso + "T00:00:00Z");

async function main() {
  console.log("Seeding MUST HRIS…");

  // ---- reset (dev only) ----
  await prisma.notification.deleteMany();
  await prisma.leaveRequest.deleteMany();
  await prisma.leaveBalance.deleteMany();
  await prisma.document.deleteMany();
  await prisma.payslip.deleteMany();
  await prisma.leaveType.deleteMany();
  await prisma.employee.deleteMany();

  // ---- leave types (rules) ----
  const types = [
    { key: "annual", name: "Annual Leave", entitlementHours: 120, maxDaysPerRequest: 3, incrementHours: 4, policyUrl: "/sops/leave-time-off", color: "#018038" },
    { key: "bvl", name: "Bonus Vacation Leave (BVL)", entitlementHours: 32, exactDays: 4, color: "#7c3aed" },
    { key: "family", name: "Family Leave", entitlementHours: 40, requiresProof: true, color: "#e0396b" },
    { key: "maternity", name: "Maternity Leave", entitlementHours: 360, color: "#e0396b" },
    { key: "ot", name: "Overtime (OT)", unlimited: true, maxHoursPerDay: 2, requiresAdvance: true, color: "#b9770e" },
    { key: "pto", name: "Paid Time Off (PTO)", unlimited: true, color: "#018038" },
    { key: "public", name: "Public Holiday", entitlementHours: 120, color: "#018038" },
    { key: "tenure", name: "Tenure Leave", entitlementHours: 40, color: "#7c3aed" },
    { key: "uto", name: "Unpaid Time Off (UTO)", entitlementHours: 96, color: "#667c72" },
    { key: "vl", name: "Vacation Leave (VL)", entitlementHours: 24, exactDays: 3, color: "#7c3aed" },
  ] as const;
  const typeByKey: Record<string, string> = {};
  for (const t of types) {
    const created = await prisma.leaveType.create({ data: { ...t } });
    typeByKey[t.key] = created.id;
  }

  // ---- employees ----
  const ethan = await prisma.employee.create({
    data: {
      email: "ethan.miller@must.company", name: "Ethan Miller", role: "LEAD",
      title: "Lead · UI/UX Dept", department: "Blockchain Dp.", team: "UX/UI Team",
      location: "Lahore, PK", timezone: "Asia/Karachi (GMT+5)", joinedAt: d("2023-04-10"),
      avatarUrl: "https://randomuser.me/api/portraits/men/76.jpg",
    },
  });

  const team = [
    { email: "sarah.miller@must.company", name: "Sarah Miller", title: "Creative Engineer", team: "UX/UI Team", location: "Lahore, PK", timezone: "Asia/Karachi (GMT+5)", joinedAt: d("2025-02-26"), avatar: "women/79" },
    { email: "sophie.grant@must.company", name: "Sophie Grant", title: "Product Designer", team: "UX/UI Team", location: "Singapore", timezone: "GMT+8", joinedAt: d("2024-06-01"), avatar: "women/44" },
    { email: "liam.ortega@must.company", name: "Liam Ortega", title: "UX Engineer", team: "UX/UI Team", location: "Manila, PH", timezone: "GMT+8", joinedAt: d("2024-09-15"), avatar: "men/45" },
    { email: "felix.harper@must.company", name: "Felix Harper", title: "Visual Designer", team: "UX/UI Team", location: "London, UK", timezone: "GMT+0", joinedAt: d("2024-03-01"), avatar: "men/32" },
    { email: "aisha.khan@must.company", name: "Aisha Khan", title: "UI/UX Intern", team: "UX/UI Team", location: "Lahore, PK", timezone: "GMT+5", joinedAt: d("2026-01-05"), avatar: "women/68" },
    { email: "adam.mercer@must.company", name: "Adam Mercer", title: "Video Editor", team: "UX/UI Team", location: "Lahore, PK", timezone: "GMT+5", joinedAt: d("2024-11-01"), avatar: "men/22" },
  ];
  const emp: Record<string, string> = {};
  for (const m of team) {
    const created = await prisma.employee.create({
      data: {
        email: m.email, name: m.name, role: "EMPLOYEE", title: m.title, department: "Blockchain Dp.",
        team: m.team, location: m.location, timezone: m.timezone, joinedAt: m.joinedAt,
        avatarUrl: `https://randomuser.me/api/portraits/${m.avatar}.jpg`, managerId: ethan.id,
      },
    });
    emp[m.name] = created.id;
  }
  const sarah = emp["Sarah Miller"];

  // ---- Sarah's balances (hours) ----  entitlement / used / reserved
  const balances: Array<[string, number, number, number]> = [
    ["annual", 120, 56, 8], // 8 reserved by a pending request below → available 56
    ["bvl", 32, 32, 0],
    ["family", 40, 0, 0],
    ["maternity", 360, 0, 0],
    ["public", 120, 104, 0],
    ["tenure", 40, 24, 0],
    ["uto", 96, 96, 0],
    ["vl", 24, 24, 0],
  ];
  for (const [key, ent, used, reserved] of balances) {
    await prisma.leaveBalance.create({
      data: { employeeId: sarah, leaveTypeId: typeByKey[key], year: YEAR, entitlementHours: ent, usedHours: used, reservedHours: reserved },
    });
  }

  // ---- Sarah's requests ----
  await prisma.leaveRequest.createMany({
    data: [
      { employeeId: sarah, leaveTypeId: typeByKey["annual"], fromDate: d("2026-08-20"), toDate: d("2026-08-20"), hours: 8, days: 1, status: "PENDING", reason: "Personal day" },
      { employeeId: sarah, leaveTypeId: typeByKey["ot"], fromDate: d("2026-06-18"), toDate: d("2026-06-18"), hours: 4, days: 1, status: "APPROVED", reason: "Sprint deadline", decidedById: ethan.id, decidedAt: d("2026-06-17") },
      { employeeId: sarah, leaveTypeId: typeByKey["ot"], fromDate: d("2026-05-20"), toDate: d("2026-05-20"), hours: 6, days: 1, status: "DECLINED", reason: "Extra QA", decidedById: ethan.id, decidedAt: d("2026-05-20"), decisionReason: "Not pre-approved" },
      { employeeId: sarah, leaveTypeId: typeByKey["annual"], fromDate: d("2026-06-09"), toDate: d("2026-06-10"), hours: 16, days: 2, status: "CANCELLED", reason: "Plans changed", decidedAt: d("2026-06-02") },
      { employeeId: sarah, leaveTypeId: typeByKey["ot"], fromDate: d("2026-04-02"), toDate: d("2026-04-02"), hours: 2, days: 1, status: "EXPIRED", decidedAt: d("2026-04-10"), decisionReason: "Not actioned in time" },
    ],
  });

  // ---- Team pending requests (Ethan's queue) — reserve against each requester ----
  const pending: Array<[string, string, string, string, number, number, string]> = [
    ["Sophie Grant", "annual", "2026-08-12", "2026-08-14", 24, 3, "Family trip, back Monday."],
    ["Felix Harper", "ot", "2026-08-14", "2026-08-14", 2, 1, "Client delivery push."],
    ["Liam Ortega", "annual", "2026-08-11", "2026-08-11", 8, 1, "Doctor's appointment."],
    ["Aisha Khan", "annual", "2026-08-18", "2026-08-18", 8, 1, "Family event."],
  ];
  for (const [name, key, from, to, hours, days, reason] of pending) {
    const eid = emp[name];
    if (key !== "ot") {
      await prisma.leaveBalance.upsert({
        where: { employeeId_leaveTypeId_year: { employeeId: eid, leaveTypeId: typeByKey[key], year: YEAR } },
        create: { employeeId: eid, leaveTypeId: typeByKey[key], year: YEAR, entitlementHours: 120, usedHours: 0, reservedHours: hours },
        update: { reservedHours: { increment: hours } },
      });
    }
    await prisma.leaveRequest.create({
      data: { employeeId: eid, leaveTypeId: typeByKey[key], fromDate: d(from), toDate: d(to), hours, days, status: "PENDING", reason },
    });
  }

  // ---- Team decision history (Ethan) ----
  await prisma.leaveRequest.createMany({
    data: [
      { employeeId: emp["Sophie Grant"], leaveTypeId: typeByKey["annual"], fromDate: d("2026-07-05"), toDate: d("2026-07-06"), hours: 16, days: 2, status: "APPROVED", decidedById: ethan.id, decidedAt: d("2026-07-08"), decisionReason: "Sufficient balance, no clashes." },
      { employeeId: emp["Aisha Khan"], leaveTypeId: typeByKey["annual"], fromDate: d("2026-07-02"), toDate: d("2026-07-02"), hours: 8, days: 1, status: "APPROVED", decidedById: ethan.id, decidedAt: d("2026-07-06") },
      { employeeId: emp["Liam Ortega"], leaveTypeId: typeByKey["annual"], fromDate: d("2026-07-02"), toDate: d("2026-07-02"), hours: 8, days: 1, status: "APPROVED", decidedById: ethan.id, decidedAt: d("2026-07-02"), decisionReason: "Medical note received." },
      { employeeId: emp["Felix Harper"], leaveTypeId: typeByKey["ot"], fromDate: d("2026-06-20"), toDate: d("2026-06-20"), hours: 6, days: 1, status: "DECLINED", decidedById: ethan.id, decidedAt: d("2026-06-21"), decisionReason: "Over the 2 hrs/day cap." },
      { employeeId: emp["Adam Mercer"], leaveTypeId: typeByKey["ot"], fromDate: d("2026-06-12"), toDate: d("2026-06-12"), hours: 2, days: 1, status: "EXPIRED", decidedAt: d("2026-06-19"), decisionReason: "Not actioned within the window." },
    ],
  });

  // ---- Sarah's notifications, documents, payslips ----
  await prisma.notification.createMany({
    data: [
      { employeeId: sarah, title: "Casual Leave approved", body: "Approved by Ethan Miller", targetType: "PAGE", targetId: "requests" },
      { employeeId: sarah, title: "Employment Contract needs your signature", body: "Review & sign your 2026 contract", targetType: "PAGE", targetId: "documents" },
      { employeeId: sarah, title: "June payslip is ready", body: "$588.00 credited to your account", targetType: "PAGE", targetId: "salary" },
    ],
  });
  await prisma.document.createMany({
    data: [
      { employeeId: sarah, name: "Employee NDA", status: "SIGNED" },
      { employeeId: sarah, name: "Employee Handbook", status: "SIGNED" },
      { employeeId: sarah, name: "Employment Contract 2026", status: "NEEDS_SIGN" },
    ],
  });
  await prisma.payslip.createMany({
    data: [
      { employeeId: sarah, period: "June 2026", netAmount: 588, baseSalary: 560, overtime: 28, deductions: 0, hours: 392, rate: 1.5, paidAt: d("2026-07-01") },
      { employeeId: sarah, period: "May 2026", netAmount: 560, baseSalary: 560, overtime: 0, deductions: 0, hours: 373, rate: 1.5, paidAt: d("2026-06-01") },
    ],
  });

  console.log("Seed complete: 7 employees, 10 leave types, balances, requests, decisions.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
