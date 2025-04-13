import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { whatsappConfig } from "../config";

const franchiseFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  location: z.string().min(2, "Please enter a preferred location"),
});

type FranchiseFormValues = z.infer<typeof franchiseFormSchema>;

const FranchiseSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { toast } = useToast();

  const form = useForm<FranchiseFormValues>({
    resolver: zodResolver(franchiseFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      location: "",
    },
  });

  // WhatsApp helper function
  const sendToWhatsApp = (data: FranchiseFormValues) => {
    // Format the message
    const message = `
*New Franchise Request*
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Location: ${data.location}
    `.trim();
    
    // Get the WhatsApp phone number from config
    const phoneNumber = whatsappConfig.phoneNumber;
    
    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // Create WhatsApp URL
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappURL, '_blank');
  };

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: FranchiseFormValues) => {
      // First save to database
      await apiRequest("POST", "/api/franchise", data);
      // Then send to WhatsApp
      return data;
    },
    onSuccess: (data) => {
      toast({
        title: "Franchise Request Submitted",
        description: "We'll get back to you soon with more information!",
        duration: 5000,
      });
      
      // Send to WhatsApp
      sendToWhatsApp(data);
      
      // Reset form
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Something went wrong",
        description: error.message || "Please try again later",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: FranchiseFormValues) => {
    mutate(data);
  };

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

  const franchiseFeatures = [
    "Comprehensive training and support",
    "Proven business model with strong ROI",
    "Access to our proprietary coffee blends and recipes",
    "Marketing and branding support",
  ];

  return (
    <section
      id="franchise"
      ref={sectionRef}
      className="py-20 bg-orange-400 text-white opacity-0 translate-y-8 transition-all duration-1000 ease-out"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 md:pr-10 mb-10 md:mb-0">
            <h2 className="text-3xl md:text-5xl font-['Playfair_Display'] font-bold mb-6">
              Join Our Coffee Revolution
            </h2>
            <p className="text-xl mb-8 opacity-90">
              We're expanding! Be a part of our coffee revolution. Get your franchise today and bring the BrewHaven experience to your community.
            </p>
            <ul className="mb-10 space-y-3">
              {franchiseFeatures.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <i className="fas fa-check-circle mt-1 mr-3"></i>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <button 
              onClick={() => document.getElementById('franchise-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-block px-8 py-3 bg-white text-orange-400 rounded-full font-medium hover:bg-opacity-90 transition-all transform hover:scale-105"
            >
              Apply Now
            </button>
          </div>
          <div className="md:w-1/2">
            <div id="franchise-form" className="bg-white p-8 rounded-lg shadow-xl">
              <h3 className="text-2xl font-['Playfair_Display'] font-bold mb-2 text-brown-600">
                Request Franchise Information
              </h3>
              <p className="text-brown-500 mb-4 text-sm">
                Fill out the form below and we'll contact you promptly. Your franchise request will also be sent via WhatsApp for faster response.
              </p>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-brown-500">Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} className="text-brown-600" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-brown-500">Email Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Your email" {...field} className="text-brown-600" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-brown-500">Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Your phone" {...field} className="text-brown-600" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-brown-500">Preferred Location</FormLabel>
                        <FormControl>
                          <Input placeholder="City, State" {...field} className="text-brown-600" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit" 
                    className="w-full py-6 bg-orange-400 text-white rounded hover:bg-opacity-90 transition-all"
                    disabled={isPending}
                  >
                    {isPending ? "Submitting..." : "Submit Request"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FranchiseSection;
