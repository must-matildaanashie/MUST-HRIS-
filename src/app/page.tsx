import { redirect } from "next/navigation";
import { currentEmployee } from "@/lib/session";

export default async function Home() {
  const me = await currentEmployee();
  redirect(me ? "/dashboard" : "/signin");
}
