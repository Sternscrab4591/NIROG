import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import logo from "../../nirog-logo.png";


export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-40 bg-background border-b border-border"
      style={{ paddingTop: "env(safe-area-inset-top)" }}
>
      <div className="flex items-center justify-between px-4 py-2 md:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img 
            src={logo}
            alt="NIROG Logo"
            className="w-12 h-12 object-contain"
          />
          
          <span className="text-2xl font-bold tracking-wide 
            text-black dark:text-white">
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
