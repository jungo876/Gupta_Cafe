import { useEffect, useRef, useState } from "react";

const CoffeeAnimation = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [steamVisible, setSteamVisible] = useState(false);
  const [steamOpacity1, setSteamOpacity1] = useState(0);
  const [steamOpacity2, setSteamOpacity2] = useState(0);
  const [steamOpacity3, setSteamOpacity3] = useState(0);

  // Animate steam effect
  useEffect(() => {
    if (!steamVisible) return;
    
    // Create steam animation effect
    const animateSteam = () => {
      setSteamOpacity1(0.4 + Math.sin(Date.now() / 1000) * 0.3);
      setSteamOpacity2(0.4 + Math.sin((Date.now() / 800) + 1) * 0.3);
      setSteamOpacity3(0.4 + Math.sin((Date.now() / 900) + 2) * 0.3);
    };
    
    // Run animation at 30fps
    const steamInterval = setInterval(animateSteam, 33);
    
    return () => clearInterval(steamInterval);
  }, [steamVisible]);

  // Handle scroll effects without GSAP
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const section = sectionRef.current;
      const sectionTop = section.getBoundingClientRect().top;
      const sectionHeight = section.offsetHeight;
      const windowHeight = window.innerHeight;
      
      // Check if section is visible
      if (sectionTop < windowHeight * 0.7 && sectionTop + sectionHeight > 0) {
        setIsVisible(true);
        
        // Calculate how far into the section we've scrolled (0-100%)
        const scrolled = Math.min(
          Math.max(
            (windowHeight * 0.7 - sectionTop) / (sectionHeight * 0.8),
            0
          ),
          1
        );
        
        setScrollPercentage(scrolled);
        
        // Show steam when coffee is half full
        if (scrolled > 0.3 && !steamVisible) {
          setSteamVisible(true);
        }
      }
    };

    // Initial check
    handleScroll();
    
    // Add event listener
    window.addEventListener("scroll", handleScroll);
    
    // Clean up
    return () => window.removeEventListener("scroll", handleScroll);
  }, [steamVisible]);

  // Section fade in with IntersectionObserver
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
      id="coffee-animation"
      ref={sectionRef}
      className="py-16 bg-brown-100 relative overflow-hidden opacity-0 translate-y-8 transition-all duration-1000 ease-out"
    >
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-['Playfair_Display'] font-bold mb-6 text-brown-600">Crafted With Love</h2>
        <p className="text-brown-500 mb-10 max-w-2xl mx-auto">
          We believe in the art of coffee making. Each cup is crafted with precision and care to bring out the perfect flavor profile.
        </p>

        <div className="h-[300px] relative mx-auto">
          <svg
            className="w-[200px] mx-auto"
            viewBox="0 0 200 220"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Cup */}
            <path
              id="cup"
              d="M40,70 L40,180 Q40,200 60,200 L140,200 Q160,200 160,180 L160,70 Z"
              fill="#E6DED1"
              stroke="#5D4037"
              strokeWidth="3"
            />

            {/* Handle */}
            <path
              id="handle"
              d="M160,100 Q190,100 190,130 Q190,160 160,160"
              fill="none"
              stroke="#5D4037"
              strokeWidth="8"
            />

            {/* Coffee */}
            <rect
              id="coffee"
              x="40"
              y="70"
              width="120"
              height="130"
              rx="10"
              fill="#5D4037"
              style={{ 
                transformOrigin: "center top",
                transform: `scaleY(${scrollPercentage})`,
                transition: "transform 0.1s ease-out"
              }}
            />

            {/* Steam */}
            <path
              id="steam1"
              d="M70,50 Q65,35 75,30 Q85,25 80,15"
              stroke="#E6DED1"
              strokeWidth="3"
              fill="none"
              style={{ 
                opacity: steamVisible ? steamOpacity1 : 0,
                transition: "opacity 0.5s ease-out"
              }}
            />
            <path
              id="steam2"
              d="M100,50 Q95,35 105,30 Q115,25 110,15"
              stroke="#E6DED1"
              strokeWidth="3"
              fill="none"
              style={{ 
                opacity: steamVisible ? steamOpacity2 : 0,
                transition: "opacity 0.5s ease-out"
              }}
            />
            <path
              id="steam3"
              d="M130,50 Q125,35 135,30 Q145,25 140,15"
              stroke="#E6DED1"
              strokeWidth="3"
              fill="none"
              style={{ 
                opacity: steamVisible ? steamOpacity3 : 0,
                transition: "opacity 0.5s ease-out"
              }}
            />
          </svg>
        </div>

        <div className="mt-8">
          <p className="font-medium text-brown-600 inline-block border-b-2 border-orange-400 pb-1">
            Watch the coffee pour as you scroll
          </p>
        </div>
      </div>

      <div className="absolute -left-20 top-1/3 opacity-5">
        <i className="fas fa-coffee text-9xl text-brown-500"></i>
      </div>
      <div className="absolute -right-20 bottom-1/3 opacity-5">
        <i className="fas fa-coffee text-9xl text-brown-500"></i>
      </div>
    </section>
  );
};

export default CoffeeAnimation;
