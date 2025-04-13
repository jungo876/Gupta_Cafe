import { useState } from "react";

const HeroSection = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="h-screen relative flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1521017432531-fbd92d768814?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')"
        }}
      >
        {/* Lighter overlay for better visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-brown-600/30 to-brown-800/40"></div>
      </div>
      <div className="container mx-auto px-4 md:px-6 z-10 text-center">
        <div className="bg-cream/90 p-8 rounded-lg inline-block max-w-3xl shadow-xl">
          <h1 className="text-4xl md:text-6xl font-['Playfair_Display'] font-bold text-brown-800 mb-6 tracking-wide">
            Brewing Happiness<br />In Every Cup
          </h1>
          <p className="text-xl text-brown-700 mb-8 max-w-2xl mx-auto">
            Experience our artisanal coffee in a warm, inviting atmosphere that feels like home.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              onClick={() => scrollToSection("menu")}
              className="px-8 py-3 bg-orange-400 text-white rounded-full font-medium hover:bg-opacity-90 transition-all transform hover:scale-105 shadow-lg"
            >
              Explore Menu
            </button>
            <button
              onClick={() => scrollToSection("franchise")}
              className="px-8 py-3 border-2 border-brown-600 text-brown-600 rounded-full font-medium hover:bg-brown-600 hover:text-white transition-all transform hover:scale-105 shadow-lg"
            >
              Get a Franchise
            </button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <button
          onClick={() => scrollToSection("about")}
          className="text-white opacity-80 hover:opacity-100"
          aria-label="Scroll down"
        >
          <i className="fas fa-chevron-down text-2xl"></i>
        </button>
      </div>
    </header>
  );
};

export default HeroSection;
