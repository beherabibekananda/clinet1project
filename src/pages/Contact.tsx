import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { useToast } from "@/hooks/use-toast";
import {
  MapPin,
  Phone,
  Mail,
  Send,
  ChevronRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import { assets } from "@/lib/assets";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number").max(20),
  subject: z.string().min(5, "Subject must be at least 5 characters").max(200),
  message: z.string().min(10, "Message must be at least 10 characters").max(1000),
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "+91 ",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    const message = `*New Inquiry from Website*\n*Name:* ${data.name}\n*Email:* ${data.email}\n*Phone:* ${data.phone}\n*Subject:* ${data.subject}\n*Message:* ${data.message}`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=919114222044&text=${encodeURIComponent(message)}`;
    await new Promise((resolve) => setTimeout(resolve, 800));
    window.open(whatsappUrl, "_blank");
    setIsSuccess(true);
    toast({
      title: "Opening WhatsApp...",
      description: "Send the pre-filled message to contact us directly.",
    });
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Us",
      content: "UPHC Hospital, Near Sunhat, Balasore",
      detail: "Chandan Bagicha, Mallikashpur, Odisha 756002",
      link: "https://www.google.com/maps/place/TINY+TRIUMPH+CHILD+DEVELOPMENT+CENTRE/@21.48219,86.9410483,15z/data=!4m6!3m5!1s0x3a1cf51a70385d63:0xc458a281696f2b7!8m2!3d21.4825192!4d86.9448545",
    },
    {
      icon: Phone,
      title: "Call Us",
      content: "+91 9114222044",
      detail: "Mon-Sun, 8am - 9pm",
      link: "tel:+919114222044",
    },
    {
      icon: Mail,
      title: "Email Us",
      content: "gananjalika@gmail.com",
      detail: "Quick response guaranteed",
      link: "mailto:gananjalika@gmail.com",
    },
  ];

  return (
    <Layout>
      {/* 1. Split-Screen Theatrical Hero */}
      <section className="relative flex items-center bg-[#0a1a1f] overflow-hidden pt-[160px] pb-[80px]" style={{ minHeight: '100vh' }}>
        <div className="container relative z-10 grid grid-cols-1 gap-12 lg:grid-cols-2 items-center px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-white space-y-6 md:space-y-8 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 text-primary-foreground text-xs md:text-sm font-bold uppercase tracking-widest backdrop-blur-sm">
              <Sparkles className="h-4 w-4" />
              <span>Get in Touch</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.1] tracking-tight">
              Let's Start Your <br className="hidden sm:block" />
              <span className="text-hero-gradient italic">Child's Journey.</span>
            </h1>
            <p className="text-base md:text-lg text-white/70 leading-relaxed font-light max-w-2xl mx-auto lg:mx-0">
              Have questions about our specialized programs? Our clinical experts are ready to listen, guide, and support your family at every step.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 md:gap-6 pt-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 md:h-12 md:w-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-primary transition-colors">
                  <CheckCircle2 className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                </div>
                <span className="text-white/90 text-sm md:text-base font-medium">Expert Consultation</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 md:h-12 md:w-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                  <CheckCircle2 className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                </div>
                <span className="text-white/90 text-sm md:text-base font-medium">Boutique Setting</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative lg:h-[80vh] flex items-center justify-center lg:items-end"
          >
            <div className="relative z-10 w-full max-w-md lg:max-w-xl aspect-[4/5] lg:aspect-auto lg:h-[90%] overflow-hidden rounded-[2.5rem] md:rounded-[3rem] shadow-2xl border border-white/10">
              <img
                src={assets.hero.specialist1}
                alt="Our Pediatric Specialist"
                className="w-full h-full object-cover"
                loading="eager"
                width="500"
                height="625"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a1a1f] via-transparent to-transparent opacity-40" />
            </div>
            {/* Background Decorations */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-primary/20 rounded-full blur-[120px] -z-10" />
          </motion.div>
        </div>
      </section>

      {/* 2. Stats Section */}
      <section className="py-8 md:py-12 bg-card dark:bg-card/50 border-b border-border/50 shadow-sm relative z-20 -mt-6 md:-mt-10 mx-auto max-w-6xl rounded-[1.5rem] md:rounded-[2.5rem] px-4 md:px-16 mx-4 md:mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {[
            { label: "Happy Families", value: "1200+" },
            { label: "Specialized Programs", value: "50+" },
            { label: "Expert Clinicians", value: "15+" },
            { label: "Success Rate", value: "99%" },
          ].map((stat, i) => (
            <div key={i} className="text-center space-y-1">
              <p className="text-2xl md:text-4xl font-bold text-primary font-display">{stat.value}</p>
              <p className="text-[10px] md:text-xs uppercase tracking-widest text-muted-foreground font-bold">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Contact Methods & Form */}
      <section className="relative py-16 bg-background overflow-hidden">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-10 grayscale-[0.5]"
          style={{ backgroundImage: "url('/contact-form-bg.webp')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background z-0" />

        <div className="container relative z-10">
          <div className="grid grid-cols-1 gap-12 lg:gap-20 lg:grid-cols-12">
            {/* Left side: Info Cards */}
            <div className="lg:col-span-5 space-y-10">
              <div className="space-y-6">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                  Connect With <span className="text-primary italic">Excellence.</span>
                </h2>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed font-light">
                  We're committed to building lasting relationships based on trust, respect, and excellent therapeutic care.
                </p>
              </div>

              <div className="grid gap-6">
                {contactInfo.map((info, idx) => (
                  <motion.a
                    key={info.title}
                    href={info.link}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="group relative flex flex-col md:flex-row items-center md:items-start gap-3 md:gap-6 p-5 md:p-8 rounded-[1.5rem] md:rounded-[2rem] bg-card dark:bg-secondary/20 border border-border/50 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all text-center md:text-left"
                  >
                    <div className="h-12 w-12 md:h-16 md:w-16 flex-shrink-0 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      <info.icon className="h-6 w-6 md:h-8 md:w-8" />
                    </div>
                    <div className="w-full">
                      <h3 className="font-display text-lg md:text-xl font-bold text-foreground mb-1">{info.title}</h3>
                      <p className="text-foreground/90 font-medium mb-1 break-all md:break-normal text-sm md:text-base">{info.content}</p>
                      <p className="text-[11px] md:text-sm text-muted-foreground">{info.detail}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Right side: Modern Form */}
            <div className="lg:col-span-7">
              <Card className="rounded-[2.5rem] md:rounded-[3rem] border-none shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] overflow-hidden bg-card dark:bg-secondary/10">
                <CardContent className="p-6 md:p-16">
                  {isSuccess ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12"
                    >
                      <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <CheckCircle2 className="h-12 w-12" />
                      </div>
                      <h3 className="font-display text-3xl font-bold text-foreground mb-4">Message Sent!</h3>
                      <p className="text-xl text-muted-foreground max-w-sm mx-auto mb-10">
                        Thank you for reaching out. We've received your inquiry and will connect with you shortly.
                      </p>
                      <Button
                        onClick={() => { setIsSuccess(false); form.reset(); }}
                        className="rounded-full px-12 py-7 text-lg hover-lift"
                      >
                        Send Another Message
                      </Button>
                    </motion.div>
                  ) : (
                    <>
                      <div className="mb-12">
                        <h3 className="font-display text-3xl font-bold text-foreground mb-2">Send a Message</h3>
                        <p className="text-muted-foreground">Complete the form below and start the journey.</p>
                      </div>

                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                          <div className="grid gap-6 md:grid-cols-2">
                            <FormField
                              control={form.control}
                              name="name"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-xs uppercase font-bold tracking-widest text-primary">Name</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Your full name" className="rounded-2xl border-border/50 bg-secondary/10 dark:bg-secondary/20 h-14" {...field} />
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
                                  <FormLabel className="text-xs uppercase font-bold tracking-widest text-primary">Email</FormLabel>
                                  <FormControl>
                                    <Input type="email" placeholder="email@address.com" className="rounded-2xl border-border/50 bg-secondary/10 dark:bg-secondary/20 h-14" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <div className="grid gap-6 md:grid-cols-2">
                            <FormField
                              control={form.control}
                              name="phone"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-xs uppercase font-bold tracking-widest text-primary">Phone</FormLabel>
                                  <FormControl>
                                    <Input type="tel" className="rounded-2xl border-border/50 bg-secondary/10 dark:bg-secondary/20 h-14" {...field} />
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
                                  <FormLabel className="text-xs uppercase font-bold tracking-widest text-primary">Subject</FormLabel>
                                  <FormControl>
                                    <Input placeholder="How can we help?" className="rounded-2xl border-border/50 bg-secondary/10 dark:bg-secondary/20 h-14" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-xs uppercase font-bold tracking-widest text-primary">Message</FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="Tell us about your requirements..."
                                    className="min-h-[160px] rounded-2xl border-border/50 bg-secondary/10 dark:bg-secondary/20 p-6"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <Button
                            type="submit"
                            size="lg"
                            className="w-full rounded-full h-16 text-xl shadow-2xl hover-lift bg-primary hover:bg-primary/90 mt-4"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? "Sending..." : (
                              <>
                                Send via WhatsApp
                                <Send className="ml-3 h-5 w-5" />
                              </>
                            )}
                          </Button>
                        </form>
                      </Form>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Boutique Map Section */}
      <section className="py-16 bg-secondary/10">
        <div className="container">
          <div className="rounded-[4rem] overflow-hidden border border-border/50 shadow-2xl h-[500px]">
            <iframe
              title="Tiny Triumph CDC Location"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14850.605666321404!2d86.9410483!3d21.48219!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1cf51a70385d63%3A0xc458a281696f2b7!2sTINY%20TRIUMPH%20CHILD%20DEVELOPMENT%20CENTRE!5e0!3m2!1sen!2sin!4v1767989390813!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "grayscale(0.2) contrast(1.1)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
