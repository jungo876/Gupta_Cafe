import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location, setLocation] = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Handle scroll events to change navbar style and visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determine if we should show or hide based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and not at the top
        setIsVisible(false);
        // Close mobile menu when hiding navbar
        if (isMobileMenuOpen) setIsMobileMenuOpen(false);
      } else {
        // Scrolling up or at the top
        setIsVisible(true);
      }
      
      // Update scroll position
      setLastScrollY(currentScrollY);
      
      // Update background
      if (currentScrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const scrollToSection = (id: string) => {
    closeMobileMenu();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 py-4 transform ${
        isScrolled ? "bg-brown-500 bg-opacity-95 shadow-md" : ""
      } ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <div className="flex items-center">
          <a href="/" className="flex items-center">
            <span className="text-3xl font-['Pacifico'] text-white">
              Brew<span className="text-orange-400">Haven</span>
            </span>
          </a>
          {/* Admin link - subtle and small */}
          <Link href="/admin" className="ml-3 text-xs text-white/50 hover:text-orange-400 transition-colors">
            Admin
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-8">
          <button
            onClick={() => scrollToSection("about")}
            className="text-white hover:text-orange-400 transition-colors font-medium"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection("menu")}
            className="text-white hover:text-orange-400 transition-colors font-medium"
          >
            Menu
          </button>
          <button
            onClick={() => scrollToSection("why-us")}
            className="text-white hover:text-orange-400 transition-colors font-medium"
          >
            Why Us
          </button>
          <button
            onClick={() => scrollToSection("franchise")}
            className="text-white hover:text-orange-400 transition-colors font-medium"
          >
            Franchise
          </button>
          <button
            onClick={() => scrollToSection("testimonials")}
            className="text-white hover:text-orange-400 transition-colors font-medium"
          >
            Testimonials
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="text-white hover:text-orange-400 transition-colors font-medium"
          >
            Contact
          </button>
        </div>

        {/* Mobile Nav Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden text-white"
          aria-label="Toggle mobile menu"
        >
          <i className="fas fa-bars text-2xl"></i>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-brown-700 ${
          isMobileMenuOpen ? "block" : "hidden"
        }`}
      >
        <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
          <button
            onClick={() => scrollToSection("about")}
            className="text-white hover:text-orange-400 transition-colors font-medium text-left"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection("menu")}
            className="text-white hover:text-orange-400 transition-colors font-medium text-left"
          >
            Menu
          </button>
          <button
            onClick={() => scrollToSection("why-us")}
            className="text-white hover:text-orange-400 transition-colors font-medium text-left"
          >
            Why Us
          </button>
          <button
            onClick={() => scrollToSection("franchise")}
            className="text-white hover:text-orange-400 transition-colors font-medium text-left"
          >
            Franchise
          </button>
          <button
            onClick={() => scrollToSection("testimonials")}
            className="text-white hover:text-orange-400 transition-colors font-medium text-left"
          >
            Testimonials
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="text-white hover:text-orange-400 transition-colors font-medium text-left"
          >
            Contact
          </button>
          <Link href="/admin" className="text-white/50 hover:text-orange-400 transition-colors text-sm text-left mt-4 pt-4 border-t border-white/10">
            Admin Dashboard
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
