import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Contact() {
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    alert("Message sent successfully!");
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header />

      <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        <h1 className="text-3xl font-bold">Contact Us</h1>

        <p className="text-sm text-foreground/70">
          Have feedback or need assistance? Send us a message below.
        </p>

        <div className="space-y-4">
          <Input placeholder="Your Email Address" type="email" />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Your message..."
            className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground min-h-[120px]"
          />

          <Button onClick={handleSubmit} className="w-full">
            Send Message
          </Button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
