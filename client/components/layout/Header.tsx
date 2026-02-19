import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";


export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border backdrop-blur-sm">
      <div className="flex items-center justify-between px-4 py-4 md:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img 
            src="/nirog-logo.png" 
            alt="NIROG Logo" 
            className="w-9 h-9 object-contain flex-shrink-0"
          />
          <span className="font-bold text-xl hidden sm:inline 
            text-black 
            dark:bg-gradient-to-r dark:from-white dark:to-blue-200 
            dark:bg-clip-text dark:text-transparent">
            NIROG
          </span>

        </Link>

        {/* Menu */}
        <div className="flex items-center gap-4">
          <ThemeToggle />
          
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 hover:bg-secondary rounded-lg transition"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Dropdown Menu */}
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg py-2 z-10">

                  <Link
                    to="/terms"
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-2 hover:bg-secondary transition text-sm"
                  >
                    Terms and Conditions
                  </Link>

                  <Link
                    to="/privacy"
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-2 hover:bg-secondary transition text-sm"
                  >
                    Privacy Policy
                  </Link>

                  <Link
                    to="/help"
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-2 hover:bg-secondary transition text-sm"
                  >
                    Help and Support
                  </Link>

                  <Link
                    to="/about"
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-2 hover:bg-secondary transition text-sm"
                  >
                    About Us
                  </Link>

                  <Link
                    to="/contact"
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-2 hover:bg-secondary transition text-sm"
                  >
                    Contact Us
                  </Link>

                </div>
            )}

          </div>
        </div>
      </div>
    </header>
  );
}
