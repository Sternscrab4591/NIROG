import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background pb-24">
      <Header />

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        <h1 className="text-3xl font-bold">Privacy Policy</h1>

        <p className="text-sm text-foreground/70">
          Last Updated: {new Date().toLocaleDateString()}
        </p>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">1. Information We Collect</h2>
          <p className="text-foreground/70 text-sm">
            NIROG collects personal and health-related information that you
            voluntarily provide, including:
          </p>
          <ul className="list-disc pl-6 text-sm text-foreground/70 space-y-1">
            <li>Name and email address</li>
            <li>Age, height, weight, and gender</li>
            <li>Medical history and medications</li>
            <li>Lifestyle information (sleep, exercise, diet)</li>
            <li>Health metrics such as blood pressure and glucose levels</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">2. How We Use Your Information</h2>
          <p className="text-sm text-foreground/70">
            Your data is used solely to:
          </p>
          <ul className="list-disc pl-6 text-sm text-foreground/70 space-y-1">
            <li>Provide personalized health risk assessments</li>
            <li>Generate lifestyle recommendations</li>
            <li>Improve user experience and app functionality</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">3. Data Storage</h2>
          <p className="text-sm text-foreground/70">
            Currently, NIROG stores data locally on your device using secure
            browser storage. We do not upload your data to external servers.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">4. Data Sharing</h2>
          <p className="text-sm text-foreground/70">
            We do not sell, rent, or share your personal or medical data with
            third parties.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">5. Security</h2>
          <p className="text-sm text-foreground/70">
            We implement reasonable safeguards to protect your information.
            However, no digital platform can guarantee 100% security.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">6. Medical Disclaimer</h2>
          <p className="text-sm text-foreground/70">
            NIROG provides AI-based health risk assessments for informational
            purposes only. It does not replace professional medical advice,
            diagnosis, or treatment. Always consult a qualified healthcare
            provider.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">7. Changes to This Policy</h2>
          <p className="text-sm text-foreground/70">
            We may update this Privacy Policy from time to time. Continued use
            of the app indicates acceptance of any changes.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">8. Contact Us</h2>
          <p className="text-sm text-foreground/70">
            If you have questions regarding this Privacy Policy, please contact
            us at:
          </p>
          <p className="text-sm font-medium">support@nirog.health</p>
        </section>
      </div>

      <BottomNav />
    </div>
  );
}