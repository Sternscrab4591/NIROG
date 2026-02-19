import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";

export default function About() {
  return (
    <div className="min-h-screen bg-background pb-24">
      <Header />

      <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        <h1 className="text-3xl font-bold">About NIROG</h1>

        <p className="text-sm text-foreground/70">
          NIROG is a health risk assessment application designed to provide
          lifestyle-based insights into potential health risks.
        </p>

        <p className="text-sm text-foreground/70">
          The app evaluates lifestyle habits, medical history, and biometric
          data to generate a personalized health risk score.
        </p>

        <p className="text-sm text-foreground/70">
          This application is intended for informational purposes only and does
          not replace professional medical advice.
        </p>

        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-xs text-foreground/60">
            Version 1.0 • Built for Health Innovation Hackathon
          </p>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
