/**
 * app/page.tsx — Landing Page (Server Component)
 */
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LandingContent from "@/components/LandingContent";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <main className="flex-1">
        <LandingContent />
      </main>
      <Footer />
    </div>
  );
}
