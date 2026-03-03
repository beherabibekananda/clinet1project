import { useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import Magnetic from "@/components/ui/Magnetic";

// Jet Flow: Pre-fetch page components
const prefetchMap: Record<string, () => Promise<any>> = {
  "/": () => import("@/pages/Index"),
  "/about": () => import("@/pages/About"),
  "/services": () => import("@/pages/Services"),
  "/gallery": () => import("@/pages/Gallery"),
  "/contact": () => import("@/pages/Contact"),
};

import { assets } from "@/lib/assets";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const [hidden, setHidden] = useState(false);
  const location = useLocation();
  const lastScrollY = useRef(0);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const diff = latest - lastScrollY.current;
    if (Math.abs(diff) < 5) return; // Ignore tiny micro-scrolls

    if (latest > 100 && diff > 0) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    lastScrollY.current = latest;
  });

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.header
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: "-100%", opacity: 0 },
      }}
      initial="visible"
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 w-full border-b border-border/40 bg-white/95 dark:bg-background/95 backdrop-blur-md shadow-md" style={{ minHeight: '64px' }}
    >
      <div className="container flex h-16 items-center justify-between lg:h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="flex h-10 lg:h-12 items-center justify-center overflow-hidden transition-transform duration-500 group-hover:scale-105">
            <img src={assets.logos.main} alt="Tiny Triumph Logo" className="h-full w-auto object-contain" width="120" height="48" loading="eager" decoding="async" />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:items-center lg:gap-4 xl:gap-8">
          {navLinks.map((link) => (
            <Magnetic key={link.path}>
              <Link
                to={link.path}
                onMouseEnter={() => {
                  setHoveredPath(link.path);
                  // Predictive Prefetch: Load the page before they click
                  if (prefetchMap[link.path]) prefetchMap[link.path]();
                }}
                onMouseLeave={() => setHoveredPath(null)}
                className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 ${isActive(link.path) ? "text-primary" : "text-muted-foreground hover:text-primary"
                  }`}
              >
                {isActive(link.path) && (
                  <motion.div
                    layoutId="active-nav"
                    className="absolute inset-0 z-0 rounded-full bg-primary/10"
                    transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                  />
                )}
                {hoveredPath === link.path && !isActive(link.path) && (
                  <motion.div
                    layoutId="hover-nav"
                    className="absolute inset-0 z-0 rounded-full bg-secondary/50"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </Link>
            </Magnetic>
          ))}
        </div>

        <div className="hidden lg:block">
          <Magnetic>
            <Button asChild size="lg" className="rounded-full px-6 transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <a href="https://api.whatsapp.com/send?phone=919114222044&text=Hi%2C%20I%20would%20like%20to%20book%20an%20appointment%20at%20Tiny%20Triumph%20CDC." target="_blank" rel="noopener noreferrer">Book Appointment</a>
            </Button>
          </Magnetic>
        </div>

        <button
          className="lg:hidden p-2 -mr-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X className="h-6 w-6 text-foreground" />
          ) : (
            <Menu className="h-6 w-6 text-foreground" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-border bg-background lg:hidden overflow-hidden"
          >
            <nav className="container flex flex-col gap-2 py-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 text-lg font-medium transition-all duration-300 rounded-2xl hover:bg-primary/5 hover:text-primary ${isActive(link.path)
                    ? "text-primary bg-primary/5"
                    : "text-muted-foreground"
                    }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="px-4 pt-4">
                <Button asChild className="w-full rounded-full h-14 text-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
                  <a href="https://api.whatsapp.com/send?phone=919114222044&text=Hi%2C%20I%20would%20like%20to%20book%20an%20appointment%20at%20Tiny%20Triumph%20CDC." target="_blank" rel="noopener noreferrer" onClick={() => setIsOpen(false)}>
                    Book Appointment
                  </a>
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
