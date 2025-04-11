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
          backgroundImage: "url('https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60"></div>
      </div>
      <div className="container mx-auto px-4 md:px-6 z-10 text-center">
        <h1 className="text-4xl md:text-6xl font-['Playfair_Display'] font-bold text-cream mb-6 tracking-wide">
          Brewing Happiness<br />In Every Cup
        </h1>
        <p className="text-xl text-cream mb-8 max-w-2xl mx-auto">
          Experience our artisanal coffee in a warm, inviting atmosphere that feels like home.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button
            onClick={() => scrollToSection("menu")}
            className="px-8 py-3 bg-orange-400 text-white rounded-full font-medium hover:bg-opacity-90 transition-all transform hover:scale-105"
          >
            Explore Menu
          </button>
          <button
            onClick={() => scrollToSection("franchise")}
            className="px-8 py-3 border-2 border-cream text-cream rounded-full font-medium hover:bg-cream hover:bg-opacity-20 transition-all transform hover:scale-105"
          >
            Get a Franchise
          </button>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <button
          onClick={() => scrollToSection("about")}
          className="text-cream opacity-80 hover:opacity-100"
          aria-label="Scroll down"
        >
          <i className="fas fa-chevron-down text-2xl"></i>
        </button>
      </div>
    </header>
  );
};

export default HeroSection;
