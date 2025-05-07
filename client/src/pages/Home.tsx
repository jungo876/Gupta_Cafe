import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import CoffeeAnimation from "@/components/CoffeeAnimation";
import MenuSection from "@/components/MenuSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import GallerySection from "@/components/GallerySection";
import FranchiseSection from "@/components/FranchiseSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import BlogPreviewSection from "@/components/BlogPreviewSection";

export default function Home() {
  return (
    <div className="bg-cream text-brown-700 overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <CoffeeAnimation />
      <MenuSection />
      <WhyChooseUs />
      <GallerySection />
      <FranchiseSection />
      <TestimonialsSection />
      {/* <BlogPreviewSection /> */}
      <ContactSection />
      <Footer />
    </div>
  );
}
