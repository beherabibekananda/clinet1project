import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import {
  ChevronRight,
  MessageCircle,
  Sparkles,
  ShieldCheck,
  Star,
  Quote,
  ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";
import { services } from "@/data/services";
import { assets } from "@/lib/assets";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Services = () => {

  return (
    <Layout>
      {/* 1. Theatrical Hero Section */}
      <section className="relative flex items-center overflow-hidden pt-[160px] pb-[80px]" style={{ minHeight: '75vh' }}>
        {/* Background Image with Overlay */}
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${assets.hero.reception})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/40" />
        </motion.div>

        <div className="container relative z-10 px-4 md:px-6">
          <div className="mx-auto max-w-5xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >

              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.1] md:leading-[1] mb-8 md:mb-10 drop-shadow-2xl">
                Crafting <span className="italic text-hero-gradient">Brighter</span> Futures.
              </h1>
              <p className="mx-auto max-w-2xl text-base md:text-lg text-white leading-relaxed font-light drop-shadow-md">
                Tailored therapy programs designed to unlock the unique potential within every child. Experience world-class care in a boutique clinical setting.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Abstract Background Decoration */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
      </section>

      {/* 2. Boutique Services Showcase */}
      <section className="py-16 bg-secondary/5 dark:bg-background">
        <div className="container">
          <div className="grid grid-cols-1 gap-12 lg:gap-16 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link
                  to={`/services/${service.slug}`}
                  className="group relative block h-full overflow-hidden rounded-[2.5rem] bg-white dark:bg-card border border-border/80 p-10 md:p-12 transition-all duration-500 shadow-sm hover:shadow-[0_40px_80px_rgba(0,0,0,0.06)] hover:-translate-y-2"
                >
                  {/* Large Faded Index Number at Bottom Left */}
                  <div className="absolute -bottom-8 -left-2 font-display text-[11rem] font-black text-foreground/5 transition-colors group-hover:text-primary/5 select-none leading-none">
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  <div className="relative z-10 space-y-8">
                    {/* Service Banner Image */}
                    <div className="aspect-[16/10] w-full overflow-hidden rounded-3xl relative group-hover:shadow-2xl transition-all duration-500 mb-8">
                      <LazyLoadImage
                        src={service.image}
                        alt={service.title}
                        effect="blur"
                        width={400}
                        height={250}
                        wrapperClassName="h-full w-full"
                        className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 ${service.needsRotation ? '-rotate-90 scale-[1.3]' : ''}`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    <div className="space-y-6">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-white dark:bg-background shadow-md border border-border/20 transition-all duration-500 group-hover:bg-primary group-hover:border-primary ${service.iconColor}`}>
                        <service.icon className="h-6 w-6 transition-colors duration-300 group-hover:text-white" />
                      </div>

                      <h3 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                    </div>

                    <p className="text-muted-foreground leading-relaxed text-sm md:text-base font-medium max-w-[90%]">
                      {service.headline}
                    </p>

                    <div className="pt-6 flex items-center gap-3 text-primary font-bold transition-all duration-300 group-hover:gap-4">
                      <span className="text-xs uppercase tracking-[0.2em]">Learn More</span>
                      <ArrowRight className="h-5 w-5" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Narrative "Our Philosophy" Section */}
      <section className="py-16 bg-secondary/5 dark:bg-background/40 relative overflow-hidden">
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-4xl md:text-5xl font-bold text-light-gradient dark:text-dark-gradient leading-tight mb-8">
                Clinical Mastery. <br />
                <span className="text-primary italic">Compassionate</span> Results.
              </h2>
              <div className="space-y-6 text-sm md:text-base text-gray-900 dark:text-gray-100 leading-relaxed font-medium">
                <p>
                  At Tiny Triumph, we don't believe in one-size-fits-all. Every child's developmental path is a unique tapestry of strengths and opportunities.
                </p>
                <p>
                  Our boutique approach ensures that your child is seen, heard, and deeply supported by a multi-disciplinary team of clinical experts who are as invested in their success as you are.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square rounded-[4rem] bg-card shadow-2xl p-12 flex flex-col justify-center text-center relative overflow-hidden">
                {/* Faded Background Logo */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] dark:opacity-[0.05]">
                  <img src={assets.logos.main} alt="" className="w-2/3 h-2/3 object-contain" width="200" height="200" />
                </div>
                <Quote className="h-20 w-20 text-primary/20 mx-auto mb-10 relative z-10" />
                <h3 className="font-display text-2xl italic font-medium text-light-gradient dark:text-dark-gradient mb-8 relative z-10">
                  "Our mission is to bridge the gap between clinical excellence and the joyful play of childhood."
                </h3>
                <div className="flex items-center justify-center gap-4 relative z-10">
                  <div className="h-px w-12 bg-primary/30" />
                  <span className="text-xl font-bold tracking-widest uppercase text-primary">Tiny Triumph Team</span>
                  <div className="h-px w-12 bg-primary/30" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. Contact/CTA Section */}
      <section className="bg-primary py-16 relative overflow-hidden group">
        <div className="container relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
              Ready to Experience the Difference?
            </h2>
            <p className="mx-auto max-w-xl text-lg text-white/90 dark:text-gray-100 mb-10 font-medium">
              Book a premium assessment today and start your child's journey toward clinical success.
            </p>
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="rounded-full px-6 py-6 h-auto text-lg md:px-16 md:py-10 md:text-2xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] hover:scale-105 transition-all bg-white text-primary hover:bg-white/90 whitespace-normal text-center min-h-[4rem]"
            >
              <a href="https://api.whatsapp.com/send?phone=919114222044&text=Hi%2C%20I%20would%20like%20to%20book%20a%20clinical%20assessment%20at%20Tiny%20Triumph%20CDC." target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                Begin Consultation
                <ChevronRight className="ml-2 h-6 w-6 md:ml-3 md:h-8 md:w-8 flex-shrink-0" />
              </a>
            </Button>
          </motion.div>
        </div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/5 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-1000" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-1000" />
      </section>
    </Layout>
  );
};

export default Services;

