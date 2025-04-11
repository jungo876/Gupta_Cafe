import { useState, useEffect } from "react";
import { Link } from "wouter";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll events to change navbar style
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
      className={`fixed w-full z-50 transition-all duration-300 py-4 ${
        isScrolled ? "bg-brown-500 bg-opacity-95 shadow-md" : ""
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <a href="#" className="flex items-center">
          <span className="text-3xl font-['Pacifico'] text-cream">
            Brew<span className="text-orange-400">Haven</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-8">
          <button
            onClick={() => scrollToSection("about")}
            className="text-cream hover:text-orange-400 transition-colors font-medium"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection("menu")}
            className="text-cream hover:text-orange-400 transition-colors font-medium"
          >
            Menu
          </button>
          <button
            onClick={() => scrollToSection("why-us")}
            className="text-cream hover:text-orange-400 transition-colors font-medium"
          >
            Why Us
          </button>
          <button
            onClick={() => scrollToSection("franchise")}
            className="text-cream hover:text-orange-400 transition-colors font-medium"
          >
            Franchise
          </button>
          <button
            onClick={() => scrollToSection("testimonials")}
            className="text-cream hover:text-orange-400 transition-colors font-medium"
          >
            Testimonials
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="text-cream hover:text-orange-400 transition-colors font-medium"
          >
            Contact
          </button>
        </div>

        {/* Mobile Nav Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden text-cream"
          aria-label="Toggle mobile menu"
        >
          <i className="fas fa-bars text-2xl"></i>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-brown-500 ${
          isMobileMenuOpen ? "block" : "hidden"
        }`}
      >
        <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
          <button
            onClick={() => scrollToSection("about")}
            className="text-cream hover:text-orange-400 transition-colors font-medium text-left"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection("menu")}
            className="text-cream hover:text-orange-400 transition-colors font-medium text-left"
          >
            Menu
          </button>
          <button
            onClick={() => scrollToSection("why-us")}
            className="text-cream hover:text-orange-400 transition-colors font-medium text-left"
          >
            Why Us
          </button>
          <button
            onClick={() => scrollToSection("franchise")}
            className="text-cream hover:text-orange-400 transition-colors font-medium text-left"
          >
            Franchise
          </button>
          <button
            onClick={() => scrollToSection("testimonials")}
            className="text-cream hover:text-orange-400 transition-colors font-medium text-left"
          >
            Testimonials
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="text-cream hover:text-orange-400 transition-colors font-medium text-left"
          >
            Contact
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
