import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(2, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { toast } = useToast();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: ContactFormValues) => {
      await apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Message Sent",
        description: "Thank you for contacting us. We'll be in touch soon!",
        duration: 5000,
      });
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

  const onSubmit = (data: ContactFormValues) => {
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

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-20 bg-white opacity-0 translate-y-8 transition-all duration-1000 ease-out"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 md:pr-10 mb-10 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-['Playfair_Display'] font-bold mb-6 text-brown-600">
              Get In Touch
            </h2>
            <p className="text-brown-500 mb-8">
              Have questions or feedback? We'd love to hear from you. Reach out
              to us using the contact form or visit one of our locations.
            </p>

            <a href="https://www.google.co.in/maps/place/Gupta+Cafe/@22.5771464,88.4000162,13z/data=!4m10!1m2!2m1!1sgupta+cafe!3m6!1s0x3a027575ddf2d59d:0x877b4100261c01be!8m2!3d22.5821486!4d88.4385742!15sCgpndXB0YSBjYWZlWgwiCmd1cHRhIGNhZmWSAQRjYWZlqgEzEAEyHxABIhvEIQS8teHM9SqGKxUnYi6hu9tY2STUxSwltwgyDhACIgpndXB0YSBjYWZl4AEA!16s%2Fg%2F11gxwr29r2?entry=ttu&g_ep=EgoyMDI1MDUwNS4wIKXMDSoJLDEwMjExNDUzSAFQAw%3D%3D">
            <div className="mb-8">
              <h3 className="text-xl font-['Playfair_Display'] font-semibold mb-4 text-brown-600">
                Find Us
              </h3>
              <div className="flex items-start mb-4">
                <i className="fas fa-map-marker-alt text-orange-400 mt-1 mr-4"></i>
                <div>
                  <p className="text-brown-500">
                    NP-264 Nayapatty Main Road Salt Lake Sector 5
                  </p>
                  <p className="text-brown-500">Kolkata 700102</p>
                </div>
              </div>
              <div className="flex items-start mb-4">
                <i className="fas fa-phone-alt text-orange-400 mt-1 mr-4"></i>
                <p className="text-brown-500">8240068416</p>
              </div>
              <div className="flex items-start">
                <i className="fas fa-envelope text-orange-400 mt-1 mr-4"></i>
                <p className="text-brown-500">guptacafe10@gmail.com</p>
              </div>
            </div>
            </a>

            <div>
              <h3 className="text-xl font-['Playfair_Display'] font-semibold mb-4 text-brown-600">
                Follow Us
              </h3>
              <div className="flex space-x-4">
                <a
                  href="https://www.facebook.com/share/19P9DceGyZ/?mibextid=wwXIfr"
                  className="w-10 h-10 bg-amber-400 hover:bg-orange-500 text-white rounded-full flex items-center justify-center  transition-colors"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a
                  href="https://www.instagram.com/gupta_cafe/profilecard/?igsh=MWRmeXlpYzllOXBycg=="
                  className="w-10 h-10 bg-amber-400 hover:bg-orange-500 text-white rounded-full flex items-center justify-center  transition-colors"
                >
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>

          <div className="md:w-1/2">
            <div className="bg-cream p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-['Playfair_Display'] font-bold mb-6 text-brown-600">
                Send Us a Message
              </h3>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-brown-500">Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your name"
                            {...field}
                            className="text-brown-600"
                          />
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
                        <FormLabel className="text-brown-500">Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your email"
                            {...field}
                            className="text-brown-600"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-brown-500">
                          Subject
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Subject"
                            {...field}
                            className="text-brown-600"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-brown-500">
                          Message
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Your message"
                            {...field}
                            className="text-brown-600 h-32 resize-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full py-6 bg-amber-700 text-white rounded hover:bg-amber-800 transition-all"
                    disabled={isPending}
                  >
                    {isPending ? "Sending..." : "Send Message"}
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

export default ContactSection;
