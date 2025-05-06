import { useEffect, useRef } from "react";

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 bg-white opacity-0 translate-y-8 transition-all duration-1000 ease-out"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
            <h2 className="text-3xl md:text-4xl font-['Playfair_Display'] font-bold mb-6 text-brown-600">Our Story</h2>
            <p className="text-brown-500 mb-6 leading-relaxed">
              Founded in 2015, Gupta Cafe as a small corner café with a big dream: to create a space where coffee wasn't just served—it was experienced. Our founder Gupta Ji traveled the nation sourcing the finest beans and perfecting brewing techniques.
            </p>
            <p className="text-brown-500 mb-8 leading-relaxed">
              Today, we're proud to offer an authentic café experience that honors coffee traditions while embracing innovation. Every cup we serve is a testament to our journey and passion for creating moments of joy through exceptional coffee.
            </p>
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-brown-300 mr-4"></div>
              <div>
                <p className="font-medium text-brown-600">Gupta</p>
                <p className="text-sm text-brown-400">Founder</p>
              </div>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="relative rounded-lg overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1559925393-8be0ec4767c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                alt="Cozy café interior"
                className="w-full h-auto rounded-lg transform transition-transform hover:scale-105 duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
