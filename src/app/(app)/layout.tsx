import { redirect } from "next/navigation";
import { currentEmployee } from "@/lib/session";
import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";
import { Role } from "@/domain/enums";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const me = await currentEmployee();
  if (!me) redirect("/signin");
  const isLead = me.role === Role.LEAD || me.role === Role.HR_OPS;

  return (
    <div className="flex min-h-screen">
      <Sidebar isLead={isLead} name={me.name} title={me.title} />
      <main className="flex-1 min-w-0">
        <TopBar name={me.name} />
        <div className="p-8 max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
