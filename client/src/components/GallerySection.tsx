import { useState,useEffect } from "react";

const GallerySection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Gallery data with achievements
  const galleryItems = [
    {
      id: 1,
      image: "./src/photos/gc_award.jpg",
      title: "Best Café Award 2022",
      description: "Recognized for outstanding coffee quality and customer service."
    },
    {
      id: 2,
      image: "./src/photos/gc_banner.jpg",
      title: "Expansion Milestone",
      description: "Successfully opened our 25th franchise location nationwide."
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      title: "Community Leadership Award",
      description: "Honored for our sustainable sourcing and community support initiatives."
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
      title: "Barista Championship",
      description: "Our team won the National Barista Championship showcasing exceptional skills."
    }
  ];

  const nextSlide = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === galleryItems.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? galleryItems.length - 1 : prevIndex - 1
    );
  };
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3500); // Change slide every 3 seconds
  
    return () => clearInterval(interval); // Cleanup on unmount
  }, [activeIndex]);
  

  return (
    <section id="gallery" className="py-16 bg-brown-50">
      <div className="container mx-auto px-4 md:px-6">
        {/* <h2 className="text-3xl md:text-4xl font-['Playfair_Display'] font-bold text-center mb-12 text-brown-600">
          Our Achievements
        </h2> */}

        <div className="relative max-w-4xl mx-auto overflow-hidden rounded-lg shadow-xl">
          {/* Main gallery carousel */}
          <div className="relative h-[400px] md:h-[500px]">
            {galleryItems.map((item, index) => (
              <div 
                key={item.id}
                className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                  index === activeIndex ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              >
                <div className="relative h-full">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 md:p-8">
                    <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-white/90 mb-4">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Controls */}
          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all"
            aria-label="Previous slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all"
            aria-label="Next slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>

          {/* Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {galleryItems.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full ${
                  index === activeIndex ? "bg-white" : "bg-white/40 hover:bg-white/60"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-brown-600 max-w-2xl mx-auto">
            We're proud of our journey and the milestones we've achieved. Each award and recognition is a testament to our commitment to quality, community, and exceptional coffee experiences.
          </p>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;