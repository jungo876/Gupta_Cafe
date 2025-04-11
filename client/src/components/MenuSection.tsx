import { useEffect, useRef } from "react";

const menuItems = [
  {
    id: 1,
    name: "Signature Latte",
    description: "Our house specialty with velvety microfoam and double espresso shot.",
    price: "$4.95",
    image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    tag: "Bestseller",
    tagColor: "green-custom",
  },
  {
    id: 2,
    name: "Artisan Cappuccino",
    description: "Perfect balance of espresso, steamed milk, and thick, rich foam.",
    price: "$4.50",
    image: "https://images.unsplash.com/photo-1579888944880-d98341245702?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    tag: "Popular",
    tagColor: "green-custom",
  },
  {
    id: 3,
    name: "Artisanal Pastry",
    description: "Freshly baked croissant with almond filling and chocolate drizzle.",
    price: "$3.75",
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    tag: "Freshly Baked",
    tagColor: "brown-400",
  },
  {
    id: 4,
    name: "Cold Brew Delight",
    description: "Slow-steeped for 24 hours with hints of chocolate and caramel.",
    price: "$5.25",
    image: "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    tag: "Refreshing",
    tagColor: "blue-500",
  },
];

const MenuSection = () => {
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
      id="menu"
      ref={sectionRef}
      className="py-20 bg-white opacity-0 translate-y-8 transition-all duration-1000 ease-out"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-['Playfair_Display'] font-bold mb-6 text-brown-600">Our Signature Menu</h2>
          <p className="text-brown-500 max-w-2xl mx-auto">
            Discover our handcrafted beverages and freshly prepared treats, made with the finest ingredients.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className="bg-cream rounded-lg overflow-hidden shadow-lg transition-transform hover:shadow-2xl hover:-translate-y-1"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform hover:scale-110 duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="font-['Playfair_Display'] font-bold text-xl mb-2 text-brown-600">{item.name}</h3>
                <p className="text-brown-500 mb-4 text-sm">{item.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-orange-400 font-semibold">{item.price}</span>
                  <span className={`text-xs text-${item.tagColor} font-medium px-2 py-1 bg-${item.tagColor} bg-opacity-10 rounded-full`}>
                    {item.tag}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="inline-block px-8 py-3 bg-brown-500 text-white rounded-full font-medium hover:bg-brown-600 transition-all transform hover:scale-105">
            View Full Menu
          </button>
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
