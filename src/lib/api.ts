import { NextResponse } from "next/server";
import { ZodError } from "zod";

/** Map thrown errors to sensible JSON responses. */
export function jsonError(e: unknown) {
  if (e instanceof ZodError) {
    return NextResponse.json({ error: "Invalid input.", issues: e.issues }, { status: 400 });
  }
  const message = e instanceof Error ? e.message : "Server error";
  if (message === "Unauthorized") return NextResponse.json({ error: message }, { status: 401 });
  if (message === "Forbidden") return NextResponse.json({ error: message }, { status: 403 });
  const status = typeof (e as { status?: number })?.status === "number" ? (e as { status: number }).status : 500;
  return NextResponse.json({ error: message }, { status });
}
