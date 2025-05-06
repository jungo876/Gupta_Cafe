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

  // Background coffee icons animation
  useEffect(() => {
    const animateBackgroundIcons = () => {
      const leftIcon = document.getElementById('bg-coffee-left');
      const rightIcon = document.getElementById('bg-coffee-right');
      
      if (leftIcon && rightIcon) {
        leftIcon.style.transform = `translateY(${5 * Math.sin(Date.now() / 3000)}px) rotate(${5 * Math.sin(Date.now() / 4000)}deg)`;
        rightIcon.style.transform = `translateY(${5 * Math.sin((Date.now() / 3000) + 2)}px) rotate(${5 * Math.sin((Date.now() / 4000) + 1)}deg)`;
      }
    };
    
    const bgAnimInterval = setInterval(animateBackgroundIcons, 50);
    
    return () => clearInterval(bgAnimInterval);
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
      </div>

      {/* Replaced FontAwesome with SVG Coffee Icons */}
      <div id="bg-coffee-left" className="absolute -left-16 top-1/4 transition-transform duration-700 ease-in-out">
        <svg className="w-36 h-36 text-brown-800 opacity-10" viewBox="0 0 640 512" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" d="M192 384h192c53 0 96-43 96-96h32c70.6 0 128-57.4 128-128S582.6 32 512 32H120c-13.3 0-24 10.7-24 24v232c0 53 43 96 96 96zM512 96c35.3 0 64 28.7 64 64s-28.7 64-64 64h-32V96h32zm47.7 384H48.3c-47.6 0-61-64-36-64h583.3c25 0 11.8 64-35.9 64z"/>
        </svg>
      </div>
      
      <div id="bg-coffee-right" className="absolute -right-16 bottom-1/4 transition-transform duration-700 ease-in-out">
        <svg className="w-36 h-36 text-brown-800 opacity-10 transform rotate-12" viewBox="0 0 640 512" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" d="M192 384h192c53 0 96-43 96-96h32c70.6 0 128-57.4 128-128S582.6 32 512 32H120c-13.3 0-24 10.7-24 24v232c0 53 43 96 96 96zM512 96c35.3 0 64 28.7 64 64s-28.7 64-64 64h-32V96h32zm47.7 384H48.3c-47.6 0-61-64-36-64h583.3c25 0 11.8 64-35.9 64z"/>
        </svg>
      </div>
      
      {/* Additional decorative coffee beans */}
      <div className="absolute top-10 right-10 opacity-10 transform rotate-45">
        <svg className="w-12 h-12 text-brown-900" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" d="M352 64c0-35.3-28.7-64-64-64s-64 28.7-64 64c0 23.6 12.9 44.3 32 55.4v52.8l-96 48v-70.2c19.1-11.1 32-31.8 32-55.4 0-35.3-28.7-64-64-64S64 59.3 64 94.6c0 23.6 12.9 44.3 32 55.4v209.2c-19.1 11.1-32 31.8-32 55.4 0 35.3 28.7 64 64 64s64-28.7 64-64c0-16.6-6.3-31.7-16.7-43.1l142.7-71.4c7.6 5.2 16.8 8.1 26.7 8.1 26.5 0 48-21.5 48-48V119.4c19.1-11.1 32-31.8 32-55.4zM160 434.6c0 17.6-14.4 32-32 32s-32-14.4-32-32 14.4-32 32-32 32 14.4 32 32zm128-192c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16-7.2 16-16 16zM288 96c0-17.6 14.4-32 32-32s32 14.4 32 32-14.4 32-32 32-32-14.4-32-32zM128 96c0-17.6 14.4-32 32-32s32 14.4 32 32-14.4 32-32 32-32-14.4-32-32z"/>
        </svg>
      </div>
      
      <div className=" absolute bottom-14 left-14 opacity-10 transform -rotate-15">
        <svg className="w-10 h-10 text-brown-900" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" d="M352 64c0-35.3-28.7-64-64-64s-64 28.7-64 64c0 23.6 12.9 44.3 32 55.4v52.8l-96 48v-70.2c19.1-11.1 32-31.8 32-55.4 0-35.3-28.7-64-64-64S64 59.3 64 94.6c0 23.6 12.9 44.3 32 55.4v209.2c-19.1 11.1-32 31.8-32 55.4 0 35.3 28.7 64 64 64s64-28.7 64-64c0-16.6-6.3-31.7-16.7-43.1l142.7-71.4c7.6 5.2 16.8 8.1 26.7 8.1 26.5 0 48-21.5 48-48V119.4c19.1-11.1 32-31.8 32-55.4zM160 434.6c0 17.6-14.4 32-32 32s-32-14.4-32-32 14.4-32 32-32 32 14.4 32 32zm128-192c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16-7.2 16-16 16zM288 96c0-17.6 14.4-32 32-32s32 14.4 32 32-14.4 32-32 32-32-14.4-32-32zM128 96c0-17.6 14.4-32 32-32s32 14.4 32 32-14.4 32-32 32-32-14.4-32-32z"/>
        </svg>
      </div>
    </section>
  );
};

export default CoffeeAnimation;