import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";

export default function Help() {
  return (
    <div className="min-h-screen bg-background pb-24">
      <Header />

      <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        <h1 className="text-3xl font-bold">Help & Support</h1>

        <div className="space-y-4 text-sm text-foreground/70">
          <p>
            If you are experiencing issues with NIROG, please review the
            following:
          </p>

          <div>
            <h2 className="font-semibold text-base mb-2">
              Frequently Asked Questions
            </h2>
            <ul className="space-y-2 list-disc pl-5">
              <li>How is my health risk calculated?</li>
              <li>Is my data stored securely?</li>
              <li>Can I edit my medical history?</li>
              <li>Why is my risk score high?</li>
            </ul>
          </div>

          <p>
            For technical issues, please contact our support team using the
            Contact Us page.
          </p>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
