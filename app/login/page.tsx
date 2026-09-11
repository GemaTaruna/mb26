/**
 * app/login/page.tsx — Halaman Login Peserta (Server Component)
 * Jika sudah login, langsung redirect ke /hasil.
 */

import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { sessionOptions, type SessionData } from "@/lib/session";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LoginForm from "@/components/LoginForm";

export const dynamic = "force-dynamic";

export default async function LoginPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const session = await getIronSession<SessionData>(cookies() as any, sessionOptions);

  if (session.isLoggedIn && session.nis) {
    redirect("/hasil");
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <LoginForm />
      </main>
      <Footer />
    </div>
  );
}
