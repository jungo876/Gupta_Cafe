import { useEffect, useRef } from "react";

const features = [
  {
    id: 1,
    icon: "fa-mug-hot",
    title: "Desi Flavors, Every Sip",
    description: "Our chai is slow-brewed with traditional Indian spices and served in mitti ke kulhads for that earthy, nostalgic aroma.",
  },
  {
    id: 2,
    icon: "fa-chair",
    title: "Desi Vibes & Comfort",
    description: "Experience the warmth of a roadside chai tapri with cozy seating, ambient lights, and a soulful desi atmosphere.",
  },
  {
    id: 3,
    icon: "fa-leaf",
    title: "Locally Sourced Ingredients",
    description: "We use fresh milk, whole spices, and premium tea leaves from Indian farms to deliver authentic desi taste in every cup.",
  },
  
];

const WhyChooseUs = () => {
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
      id="why-us"
      ref={sectionRef}
      className="py-20 bg-brown-500 text-cream opacity-0 translate-y-8 transition-all duration-1000 ease-out"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-['Playfair_Display'] font-bold mb-6">Why Choose Us</h2>
          <p className="max-w-2xl mx-auto opacity-90">
            We're committed to creating more than just great Chai—we're creating experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((feature) => (
            <div key={feature.id} className="text-center">
              <div className="mb-6 inline-block p-4 bg-brown-600 rounded-full">
                <i className={`fas ${feature.icon} text-3xl text-orange-400`}></i>
              </div>
              <h3 className="text-xl font-['Playfair_Display'] font-bold mb-4">{feature.title}</h3>
              <p className="opacity-90">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
