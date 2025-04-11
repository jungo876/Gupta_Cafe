import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CoffeeAnimation = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const coffeeRef = useRef<SVGRectElement>(null);
  const steam1Ref = useRef<SVGPathElement>(null);
  const steam2Ref = useRef<SVGPathElement>(null);
  const steam3Ref = useRef<SVGPathElement>(null);

  useEffect(() => {
    // Section fade in animation
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

    // Coffee cup fill animation
    if (coffeeRef.current && steam1Ref.current && steam2Ref.current && steam3Ref.current) {
      const coffeeTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 30%",
          scrub: true,
        },
      });

      coffeeTl.to(coffeeRef.current, {
        scaleY: 1,
        duration: 2,
        ease: "power1.inOut",
      });

      // Steam animations
      gsap.to(steam1Ref.current, {
        opacity: 0.7,
        duration: 1,
        repeat: -1,
        yoyo: true,
      });

      gsap.to(steam2Ref.current, {
        opacity: 0.7,
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        delay: 0.2,
      });

      gsap.to(steam3Ref.current, {
        opacity: 0.7,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        delay: 0.4,
      });
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
              ref={coffeeRef}
              id="coffee"
              x="40"
              y="70"
              width="120"
              height="130"
              rx="10"
              fill="#5D4037"
              transform="scaleY(0)"
              style={{ transformOrigin: "center top" }}
            />

            {/* Steam */}
            <path
              ref={steam1Ref}
              id="steam1"
              d="M70,50 Q65,35 75,30 Q85,25 80,15"
              stroke="#E6DED1"
              strokeWidth="3"
              fill="none"
              opacity="0"
            />
            <path
              ref={steam2Ref}
              id="steam2"
              d="M100,50 Q95,35 105,30 Q115,25 110,15"
              stroke="#E6DED1"
              strokeWidth="3"
              fill="none"
              opacity="0"
            />
            <path
              ref={steam3Ref}
              id="steam3"
              d="M130,50 Q125,35 135,30 Q145,25 140,15"
              stroke="#E6DED1"
              strokeWidth="3"
              fill="none"
              opacity="0"
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
