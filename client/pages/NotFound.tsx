import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header />
      <div className="max-w-2xl mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[500px]">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl text-foreground/60 mb-8 text-center">Page not found</p>
        <Button asChild>
          <Link to="/">Return to Home</Link>
        </Button>
      </div>
      <BottomNav />
    </div>
  );
};

export default NotFound;
