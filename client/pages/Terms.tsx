import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";

export default function Terms() {
  return (
    <div className="min-h-screen bg-background pb-24">
      <Header />
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        <h1 className="text-3xl font-bold">Terms & Conditions</h1>
        <p className="text-sm text-foreground/70">
          NIROG provides lifestyle-based health risk estimations. This is not a medical diagnosis.
        </p>
      </div>
      <BottomNav />
    </div>
  );
}
