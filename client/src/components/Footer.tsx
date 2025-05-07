const Footer = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-brown-700 text-cream py-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between mb-8">
          <div className="mb-8 md:mb-0">
            <a href="#" className="flex items-center mb-4">
              <span className="text-3xl font-['Pacifico']">
                Gupta<span className="text-orange-400">Cafe</span>
              </span>
            </a>
            <p className="max-w-xs opacity-80">
              Creating warm moments and unforgettable coffee experiences since 2015.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-['Playfair_Display'] font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 opacity-80">
                <li>
                  <button
                    onClick={() => scrollToSection("about")}
                    className="hover:text-orange-400 transition-colors"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("menu")}
                    className="hover:text-orange-400 transition-colors"
                  >
                    Menu
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("franchise")}
                    className="hover:text-orange-400 transition-colors"
                  >
                    Franchise
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("contact")}
                    className="hover:text-orange-400 transition-colors"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>

            {/* <div>
              <h4 className="font-['Playfair_Display'] font-bold mb-4">Legal</h4>
              <ul className="space-y-2 opacity-80">
                <li>
                  <a href="#" className="hover:text-orange-400 transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-400 transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-400 transition-colors">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div> */}

            <div>
              <h4 className="font-['Playfair_Display'] font-bold mb-4">Hours</h4>
              <ul className="space-y-2 opacity-80">
                <li>Monday-Sunday: 7am - 11pm</li>
                              </ul>
            </div>
          </div>
        </div> 

        <div className="pt-8 border-t border-brown-600 text-center opacity-70">
          <p>&copy; {new Date().getFullYear()} Gupta Café. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
