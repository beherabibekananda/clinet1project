import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";
import {
  Heart,
  Stethoscope,
  Shield,
  Users,
  Clock,
  Award,
  ChevronRight,
  Star,
  Brain,
  Activity,
  Facebook,
  Smartphone,
  MessageCircle,
  ClipboardList,
  Sparkles
} from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { services } from "@/data/services";
import { useRef, useState, useEffect } from "react";
import { assets } from "@/lib/assets";
import Magnetic from "@/components/ui/Magnetic";
import { RevealSection } from "@/components/ui/RevealSection";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const VideoCard = ({ item, idx }: { item: any, idx: number }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!videoRef.current) return;
    if (isInView) {
      videoRef.current.play().catch(() => { });
    } else {
      videoRef.current.pause();
    }
  }, [isInView]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      transition={{ duration: 0.5, delay: idx % 3 * 0.1 }}
      className="group relative h-[400px] overflow-hidden rounded-[2.5rem] bg-card shadow-2xl border border-white/10"
    >
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        poster={item.poster}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 transform-gpu"
      >
        <source src={item.webm} type="video/webm" />
        <source src={item.mp4} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
      <div className="absolute bottom-10 left-10 transition-transform duration-500 group-hover:-translate-y-2">
        <h3 className="text-2xl font-bold text-white drop-shadow-lg">{item.title}</h3>
        <div className="mt-2 h-1 w-12 bg-primary rounded-full group-hover:w-full transition-all duration-500" />
      </div>
    </motion.div>
  );
};

const Index = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const [currentBanner, setCurrentBanner] = useState(0);
  const [visibleVideos, setVisibleVideos] = useState(3);
  const banners = [
    assets.hero.banner,
    assets.hero.banner2,
    assets.hero.banner3,
  ];

  const allVideos = [
    { id: 1, ...assets.videos.showcase1, title: "Sensory Mastery" },
    { id: 2, ...assets.videos.showcase2, title: "Precision Motor Skills" },
    { id: 3, ...assets.videos.showcase3, title: "Developmental Therapy" },
    { id: 4, ...assets.videos.showcase4, title: "Therapeutic Play" },
    { id: 5, ...assets.videos.showcase5, title: "Developmental Milestones" },
    { id: 6, ...assets.videos.showcase6, title: "Developmental Milestone" },
    { id: 7, ...assets.videos.showcase7, title: "Motor Function" },
    { id: 8, ...assets.videos.showcase9, title: "Success Stories" },
    { id: 9, ...assets.videos.showcase10, title: "Clinical Excellence" },
    { id: 10, ...assets.videos.showcase11, title: "Comprehensive Support" },
    { id: 11, ...assets.videos.showcase12, title: "Empowering Journeys" },
    { id: 12, ...assets.videos.showcase13, title: "Developmental Play" },
  ];

  const [testimonialProgress, setTestimonialProgress] = useState(0);
  const [socialProgress, setSocialProgress] = useState(0);

  const handleScrollIndicator = (e: React.UIEvent<HTMLDivElement>, setProgress: (val: number) => void) => {
    const el = e.currentTarget;
    const totalScroll = el.scrollWidth - el.clientWidth;
    if (totalScroll <= 0) return;
    const progress = (el.scrollLeft / totalScroll) * 100;
    setProgress(progress);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000); // Change banner every 5 seconds
    return () => clearInterval(timer);
  }, []);

  const socialFeedRef = useRef<HTMLDivElement>(null);
  const testimonialRef = useRef<HTMLDivElement>(null);

  const scrollFeed = (direction: 'left' | 'right') => {
    if (socialFeedRef.current) {
      const scrollAmount = 344; // Card width (320px) + gap (24px)
      socialFeedRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const scrollTestimonials = (direction: 'left' | 'right') => {
    if (testimonialRef.current) {
      const scrollAmount = testimonialRef.current.offsetWidth / 3;
      testimonialRef.current.scrollBy({
        left: direction === 'left' ? -testimonialRef.current.offsetWidth : testimonialRef.current.offsetWidth,
        behavior: 'smooth'
      });
    }
  };

  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const features = [
    {
      icon: Clock,
      title: "Flexible Hours",
      description: "Extended hours and weekend appointments available.",
    },
    {
      icon: Award,
      title: "Experienced Team",
      description: "Specialized pediatric therapists with years of clinical expertise.",
    },
    {
      icon: Heart,
      title: "Patient-Centered",
      description: "Your comfort and well-being is our top priority.",
    },
  ];

  const testimonials = [
    {
      name: "Sandeep Rao",
      role: "Parent",
      content: "The care our son receives at Tiny Triumph is exceptional. The therapists always take the time to listen and explain the progress thoroughly. We've seen remarkable improvement in his motor skills.",
      rating: 5,
    },
    {
      name: "Meera Nair",
      role: "Parent",
      content: "I was worried about finding the right support for my daughter, but the team here made us feel welcome and hopeful from day one. Their sensory integration program is truly world-class.",
      rating: 5,
    },
    {
      name: "Prakash Mohanty",
      role: "Parent",
      content: "As parents, we appreciate how wonderful they are with children. The therapeutic team at Tiny Triumph is truly amazing. They don't just treat the child; they support the whole family.",
      rating: 5,
    },
    {
      name: "Ananya Das",
      role: "Parent",
      content: "The speech therapy sessions have been a game-changer for our daughter. She has gained so much confidence in her communication. We are forever grateful to the dedicated staff.",
      rating: 5,
    },
    {
      name: "Rajesh Kumar",
      role: "Parent",
      content: "Finding Tiny Triumph was a blessing. The behavioral therapy approach here is so positive and encouraging. Our son looks forward to his sessions every single week!",
      rating: 5,
    },
    {
      name: "Sunita Misra",
      role: "Parent",
      content: "A truly professional yet warm environment. The attention to detail in the personalized therapy plans shows how much they care about each child's individual journey.",
      rating: 5,
    },
    {
      name: "Amitav Pattnaik",
      role: "Parent",
      content: "The holistic approach at Tiny Triumph is what sets them apart. They focus on both physical and emotional development, making every session fun and effective.",
      rating: 5,
    },
    {
      name: "Sujata Sethi",
      role: "Parent",
      content: "We've tried many centers, but the level of expertise and personal touch at Tiny Triumph is unmatched. Our child has made more progress here in months than years elsewhere.",
      rating: 5,
    },
    {
      name: "Bikash Jena",
      role: "Parent",
      content: "The support system for parents is incredible. They provide us with tools and activities to continue the therapy at home, which has been so helpful for our son's growth.",
      rating: 5,
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[85vh] md:min-h-[90vh] flex items-center overflow-hidden pt-[160px] pb-[80px]">
        <div className="absolute inset-0 z-0 overflow-hidden bg-black">
          <AnimatePresence initial={false}>
            <motion.div
              key={currentBanner}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                opacity: { duration: 2, ease: "easeInOut" },
                scale: { duration: 10, ease: "linear" }
              }}
              style={{ y: y1 }}
              className="absolute inset-0"
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${banners[currentBanner]}')` }}
              />
              <div className="absolute inset-0 bg-black/40" />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="container relative z-10 px-4 md:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white drop-shadow-2xl leading-[1.1]">
                <span className="text-hero-gradient">Nurturing Little Triumphs</span>
              </h1>
              <p className="mt-4 md:mt-6 text-base md:text-lg text-white/90 leading-relaxed max-w-2xl mx-auto font-light drop-shadow-lg">
                A premier child development centre in Balasore dedicated to unlocking your child's full potential through
                <span className="text-white font-medium"> compassionate care</span> and <span className="text-white font-medium">expert therapy</span>.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-10 md:mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6"
            >
              <Magnetic>
                <button className="w-full sm:w-auto rounded-full bg-[#5ec2b4] px-8 py-4 text-base md:px-12 md:py-6 md:text-xl font-medium text-white shadow-xl transition-all duration-300 hover:scale-105 hover:bg-[#4ea89c] flex items-center justify-center group">
                  <a href="https://api.whatsapp.com/send?phone=919114222044&text=Hi%2C%20I%20would%20like%20to%20book%20an%20appointment%20at%20Tiny%20Triumph%20CDC." target="_blank" rel="noopener noreferrer" className="flex items-center">
                    Book Appointment
                    <ChevronRight className="ml-2 h-5 w-5 md:h-6 md:w-6 transition-transform group-hover:translate-x-1" />
                  </a>
                </button>
              </Magnetic>
              <Magnetic>
                <Link
                  to="/services"
                  className="w-full sm:w-auto rounded-full border-2 border-white/40 bg-white/5 backdrop-blur-md px-8 py-4 text-base md:px-12 md:py-6 md:text-xl font-medium text-white transition-all duration-300 hover:bg-white/10 hover:border-white shadow-xl text-center block"
                >
                  Our Specialities
                </Link>
              </Magnetic>
            </motion.div>
          </div>
        </div>

        {/* Floating elements for visual interest */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-12 rounded-full bg-gradient-to-b from-white/20 to-transparent"
          />
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-secondary/30 dark:bg-background/60 relative overflow-hidden">
        <div className="container px-4 md:px-6">
          <RevealSection>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-light-gradient dark:text-dark-gradient">
                Specialized Child Development Services
              </h2>
              <p className="mt-3 text-sm sm:text-base text-gray-900 dark:text-gray-100">
                We offer a full range of therapeutic interventions tailored to your child's unique needs.
              </p>
            </div>
          </RevealSection>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <Link
                  to={`/services/${service.slug}`}
                  className="group relative block h-full overflow-hidden rounded-[2.5rem] border border-border/50 bg-white dark:bg-card shadow-xl transition-all duration-500 hover:shadow-primary/20 hover:-translate-y-2 group"
                >
                  <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  {/* Black Shade Sweep Effect */}
                  <motion.div
                    className="absolute inset-0 z-0 pointer-events-none bg-[#1d2f38]/10"
                    initial={{ y: "-210%", rotate: 90, scaleX: 0.5, scaleY: 1.5 }}
                    whileHover={{ y: "210%" }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                  />

                  {/* Light Sweep (Shine) Effect */}
                  <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
                    <div className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-all duration-1000 group-hover:translate-x-[300%]" />
                  </div>

                  <div className="relative z-20 flex h-full flex-col">
                    {/* Banner Image */}
                    <div className="h-48 w-full overflow-hidden relative">
                      <LazyLoadImage
                        src={service.image}
                        alt={service.title}
                        effect="blur"
                        wrapperClassName="h-full w-full"
                        className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 transform-gpu ${service.needsRotation ? '-rotate-90 scale-[1.3]' : ''}`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    <div className="relative flex flex-col items-center justify-center p-8 pt-0 text-center -mt-12">
                      {/* Icon Container with Backwash */}
                      <div className="relative mb-6 z-30">
                        <div className={`flex h-24 w-24 items-center justify-center rounded-[1.5rem] bg-white dark:bg-card border border-border/20 transition-all duration-500 group-hover:bg-primary group-hover:shadow-lg group-hover:shadow-primary/30 shadow-xl`}>
                          <motion.div
                            whileHover={{ scale: 1.2, rotate: [0, -10, 10, -10, 0] }}
                            transition={{ duration: 0.5 }}
                            className={`transition-colors duration-300 delay-75 group-hover:text-white ${service.textColor}`}
                          >
                            <service.icon className="h-12 w-12" />
                          </motion.div>
                        </div>

                        {/* Inner Glow */}
                        <div className="absolute inset-0 bg-primary/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                      </div>

                      <h3 className="font-display text-2xl font-bold transition-colors duration-300 group-hover:text-primary mb-4 text-gray-900 dark:text-white">
                        {service.title}
                      </h3>
                      <p className="text-gray-800 dark:text-gray-200 leading-relaxed font-semibold">
                        {service.description}
                      </p>

                      <div className="mt-6 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                        View Details <ChevronRight className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Button asChild variant="outline" className="rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <Link to="/services">
                View All Services
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>


      {/* Why Choose Us Section */}
      <section className="bg-secondary/20 dark:bg-background/40 py-16 relative overflow-hidden">
        <div className="container relative z-10">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <RevealSection>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="transform-gpu will-change-transform"
              >
                <h2 className="font-display text-3xl font-bold text-light-gradient dark:text-dark-gradient md:text-4xl leading-tight">
                  Why Parents Trust <br />
                  <span className="text-primary">Tiny Triumph</span>
                </h2>
                <p className="mt-4 text-base text-gray-900 dark:text-gray-100 leading-relaxed">
                  We provide a personalized sanctuary for development, combining clinical excellence with a nurturing heart.
                </p>

                <div className="mt-12 space-y-8">
                  {features.map((feature, idx) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex gap-6 group"
                    >
                      <motion.div
                        className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-card shadow-lg text-primary transition-colors group-hover:bg-primary group-hover:text-white"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: idx * 0.5 }}
                      >
                        <feature.icon className="h-7 w-7" />
                      </motion.div>
                      <div>
                        <h3 className="font-display text-xl font-bold text-gray-900 dark:text-white">
                          {feature.title}
                        </h3>
                        <p className="mt-2 text-gray-900 dark:text-gray-100 text-sm leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </RevealSection>

            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 50 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative"
            >
              <div className="aspect-square overflow-hidden rounded-[3rem] shadow-2xl relative">
                <img
                  src={assets.hero.specialist1}
                  alt="Clinical Specialist at Tiny Triumph"
                  className="absolute inset-0 w-full h-full object-cover transform-gpu"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-8 -right-8 rounded-3xl glass dark:bg-black/60 dark:border-white/10 p-8 shadow-2xl max-w-[240px]"
              >
                <div className="flex items-center gap-5">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
                    <Award className="h-8 w-8" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-foreground">4.9 ★</p>
                    <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Top Rated</p>
                  </div>
                </div>
              </motion.div>

              {/* Decorative elements */}
              <div className="absolute -top-10 -left-10 h-40 w-40 bg-accent/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -right-10 h-60 w-60 bg-primary/10 rounded-full blur-3xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Clinic in Action - Video Showcase */}
      <section className="py-16 bg-background relative overflow-hidden">
        <div className="container relative z-10">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-3xl font-bold text-foreground md:text-5xl"
            >
              See Us in <span className="text-primary italic">Action</span>
            </motion.h2>
            <p className="mt-4 text-lg text-muted-foreground font-medium leading-relaxed">
              Witness the dedicated care and specialized techniques our therapists use to empower every child.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {allVideos.slice(0, visibleVideos).map((item, idx) => (
                <VideoCard key={item.id} item={item} idx={idx} />
              ))}
            </AnimatePresence>
          </div>

          {visibleVideos < allVideos.length && (
            <div className="mt-16 text-center">
              <Button
                onClick={() => setVisibleVideos(prev => Math.min(prev + 3, allVideos.length))}
                variant="outline"
                className="rounded-full px-12 py-7 text-lg hover:scale-105 transition-all duration-300 border-primary/20 text-primary hover:bg-primary hover:text-white group"
              >
                Load More Action
                <Sparkles className="ml-2 h-5 w-5 group-hover:animate-pulse" />
              </Button>
            </div>
          )}
        </div>


        {/* Background Polish */}
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -translate-x-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-500/5 rounded-full blur-[120px] translate-x-1/3" />
      </section>
      <section className="py-16 bg-background relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 opacity-60" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#f48120]/5 rounded-full blur-[140px] translate-x-1/3 translate-y-1/3 opacity-60" />

        <div className="container relative z-10">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-display text-3xl font-bold text-foreground md:text-5xl"
            >
              Voices of Trust
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-4 text-lg text-muted-foreground font-medium"
            >
              Real stories from families who have experienced the magic of Tiny Triumph.
            </motion.p>
          </div>

          <div
            ref={testimonialRef}
            onScroll={(e) => handleScrollIndicator(e, setTestimonialProgress)}
            className="mt-12 flex gap-8 overflow-x-auto pb-12 scrollbar-hide snap-x snap-mandatory scroll-smooth"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                className="flex-shrink-0 w-full md:w-[calc(33.333%-1.5rem)] snap-center"
              >
                <Card className="h-full border border-border/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgb(0,0,0,0.08)] transition-all duration-500 rounded-[2.5rem] overflow-hidden bg-white dark:bg-card group hover:-translate-y-2">
                  <CardContent className="p-10 flex flex-col h-full">
                    <div className="mb-6 flex gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-[#f48120] text-[#f48120]" />
                      ))}
                    </div>
                    <p className="text-foreground/80 italic text-lg leading-relaxed mb-10 flex-grow font-medium">
                      "{testimonial.content}"
                    </p>
                    <div className="mt-auto flex items-center gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary font-bold text-xl shadow-inner border border-primary/20">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-foreground text-lg">{testimonial.name}</p>
                        <p className="text-sm font-semibold text-[#f48120] uppercase tracking-widest">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Pagination/Nav Indicator */}
          <div className="mt-12 flex flex-col items-center gap-8">
            <div className="w-full max-w-[300px] h-1 bg-primary/10 rounded-full overflow-hidden relative">
              <motion.div
                className="absolute top-0 left-0 h-full bg-primary"
                initial={{ width: "0%" }}
                animate={{ width: `${testimonialProgress}%` }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
              />
            </div>
            <div className="flex justify-center items-center gap-4">
              <button
                onClick={() => scrollTestimonials('left')}
                className="h-12 w-12 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:bg-secondary/20 hover:text-primary transition-all duration-300 active:scale-95 shrink-0"
              >
                <ChevronRight className="h-6 w-6 rotate-180" />
              </button>
              <button
                onClick={() => scrollTestimonials('right')}
                className="h-12 w-12 rounded-xl border border-[#f48120] bg-[#f48120]/5 flex items-center justify-center text-[#f48120] hover:bg-[#f48120] hover:text-white transition-all duration-300 active:scale-95 shadow-sm shrink-0"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Social Footprints Section */}
      <section className="bg-background pt-16 pb-12 relative">
        <div className="container relative">
          {/* Section Header Badge */}
          <div className="absolute -top-6 left-8 z-20">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#f48120] px-6 py-2 shadow-lg transition-transform hover:scale-105">
              <MessageCircle className="h-5 w-5 text-white fill-white" />
              <span className="text-sm font-bold uppercase tracking-wider text-white"># Social Footprints</span>
            </div>
          </div>

          <div className="rounded-[2.5rem] border-2 border-[#f48120]/10 bg-white dark:bg-card p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none">
            <div
              ref={socialFeedRef}
              onScroll={(e) => handleScrollIndicator(e, setSocialProgress)}
              className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide snap-x snap-mandatory scroll-smooth"
            >
              {[
                {
                  id: 1,
                  username: "tinytriumph",
                  content: "Our young champion making great progress in physical therapy today! Every step counts.",
                  type: "Achievement",
                  date: "Jan 9, 2026",
                  image: assets.gallery[6],
                  rotate: "rotate-90",
                  scale: "scale-[1.5]",
                  likes: "4.4K",
                  comments: "22",
                  url: "https://www.facebook.com/p/Tiny-Triumph-child-development-centre-61566975311848/"
                },
                {
                  id: 2,
                  username: "tinytriumph",
                  content: "New sensory play tools have arrived! Helping children explore and learn through touch and feel.",
                  type: "Update",
                  date: "Jan 8, 2026",
                  image: assets.services.sensoryIntegration,
                  likes: "6.3K",
                  comments: "73",
                  url: "https://www.facebook.com/p/Tiny-Triumph-child-development-centre-61566975311848/"
                },
                {
                  id: 3,
                  username: "tinytriumph",
                  content: "Speech therapy success stories! We're celebrating our little hero's first words this month.",
                  type: "Success Story",
                  date: "Jan 8, 2026",
                  image: assets.services.speechTherapy,
                  likes: "2.4K",
                  comments: "25",
                  url: "https://www.facebook.com/p/Tiny-Triumph-child-development-centre-61566975311848/"
                },
                {
                  id: 4,
                  username: "tinytriumph",
                  content: "Join us for our next parent-teacher workshop on understanding child behavioral patterns.",
                  type: "Event",
                  date: "Jan 7, 2026",
                  image: assets.gallery[7],
                  rotate: "rotate-90",
                  scale: "scale-[1.5]",
                  likes: "1.9K",
                  comments: "23",
                  url: "https://www.facebook.com/p/Tiny-Triumph-child-development-centre-61566975311848/"
                },
                {
                  id: 5,
                  username: "tinytriumph",
                  content: "A beautiful morning at Tiny Triumph! Creating a nurturing environment for every child.",
                  type: "Clinic Life",
                  date: "Jan 7, 2026",
                  image: assets.gallery[8],
                  likes: "754",
                  comments: "8",
                  url: "https://www.facebook.com/p/Tiny-Triumph-child-development-centre-61566975311848/"
                }
              ].map((post) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: post.id * 0.1 }}
                  className="flex-shrink-0 w-[280px] sm:w-[320px] snap-center group"
                >
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-white dark:bg-background border border-border/60 rounded-xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                  >
                    {/* Card Header */}
                    <div className="flex items-center justify-between p-4 border-b border-border/40">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-foreground leading-tight">{post.username}</span>
                      </div>
                      <Facebook className="h-5 w-5 text-blue-600 transition-transform group-hover:scale-95" />
                    </div>

                    {/* Card Image */}
                    <div className="aspect-square w-full overflow-hidden relative bg-secondary/5">
                      <LazyLoadImage
                        src={post.image}
                        alt="Social post"
                        effect="blur"
                        wrapperClassName="h-full w-full"
                        className={`h-full w-full object-cover transition-transform duration-700 transform-gpu ${"rotate" in post ? post.rotate : ""} ${"scale" in post ? post.scale : ""} ${"rotate" in post ? "group-hover:scale-[1.45]" : "group-hover:scale-95"}`}
                      />
                    </div>

                    {/* Interactions */}
                    <div className="p-4 bg-background transition-colors group-hover:bg-secondary/5">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="flex items-center gap-1.5 transition-colors group-hover:text-red-500">
                          <Heart className="h-5 w-5" />
                          <span className="text-xs font-semibold">{post.likes}</span>
                        </div>
                        <div className="flex items-center gap-1.5 transition-colors group-hover:text-blue-500">
                          <MessageCircle className="h-5 w-5" />
                          <span className="text-xs font-semibold">{post.comments}</span>
                        </div>
                      </div>

                      {/* Content */}
                      <p className="text-xs text-foreground/80 leading-relaxed line-clamp-3 font-medium group-hover:text-foreground transition-colors">
                        {post.content}
                      </p>
                    </div>
                  </a>
                </motion.div>
              ))}
            </div>

            {/* Pagination/Nav Indicator */}
            <div className="mt-12 flex flex-col items-center gap-6">
              <div className="w-full max-w-[240px] h-1 bg-[#f48120]/10 rounded-full overflow-hidden relative">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-[#f48120]"
                  initial={{ width: "0%" }}
                  animate={{ width: `${socialProgress}%` }}
                  transition={{ type: "spring", stiffness: 100, damping: 20 }}
                />
              </div>
              <div className="flex justify-center items-center gap-4">
                <button
                  onClick={() => scrollFeed('left')}
                  className="h-10 w-10 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:bg-secondary/20 hover:text-primary transition-all duration-300 active:scale-90 shrink-0"
                >
                  <ChevronRight className="h-5 w-5 rotate-180" />
                </button>
                <button
                  onClick={() => scrollFeed('right')}
                  className="h-10 w-10 rounded-lg border border-[#f48120] bg-[#f48120]/5 flex items-center justify-center text-[#f48120] hover:bg-[#f48120] hover:text-white transition-all duration-300 active:scale-90 shadow-sm shrink-0"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Highlights Section */}
      <section className="bg-background py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { label: "Happy Families", value: "500+", icon: Heart, color: "text-red-500" },
              { label: "Successful Therapies", value: "10k+", icon: Award, color: "text-yellow-500" },
              { label: "Experience", value: "5+ Yrs", icon: Clock, color: "text-blue-500" }
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center p-8 rounded-[2rem] bg-secondary/10 dark:bg-card border border-border/40 text-center hover:scale-105 transition-transform duration-300"
              >
                <stat.icon className={`h-8 w-8 ${stat.color} mb-4`} />
                <span className="text-3xl font-bold text-foreground mb-1">{stat.value}</span>
                <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background pt-8 pb-16 relative">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                Connect with Us
              </h2>
              <p className="text-muted-foreground text-lg">
                Stay updated with our latest activities and reach out for any queries.
              </p>
            </motion.div>
          </div>
          <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
            <Button asChild variant="outline" className="h-14 w-full max-w-[280px] rounded-full px-8 text-lg border-primary/20 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-blue-50 hover:text-blue-600 hover:border-blue-600/30 sm:w-auto overflow-hidden">
              <a
                href="https://www.facebook.com/p/Tiny-Triumph-child-development-centre-61566975311848/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center font-bold"
              >
                <Facebook className="mr-3 h-5 w-5 fill-current" />
                Follow on Facebook
              </a>
            </Button>
            <Button asChild variant="outline" className="h-14 w-full max-w-[280px] rounded-full px-8 text-lg border-primary/20 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-teal-50 hover:text-teal-600 hover:border-teal-600/30 sm:w-auto overflow-hidden">
              <a
                href="https://api.whatsapp.com/send?phone=919114222044&text=Hi%2C%20I%20would%20like%20to%20book%20an%20appointment%20at%20Tiny%20Triumph%20CDC."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center font-bold"
              >
                <svg
                  className="mr-3 h-5 w-5 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Connect on WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-white rounded-full blur-[150px] translate-x-1/3 translate-y-1/3" />
        </div>

        <div className="container relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="font-display text-4xl font-bold text-primary-foreground md:text-5xl leading-tight">
                Ready to Help Your <br />
                <span className="text-white/80">Child Thrive?</span>
              </h2>
              <p className="mt-6 text-lg text-primary-foreground/90 font-light max-w-2xl mx-auto">
                Schedule your comprehensive evaluation today and start the journey towards
                <span className="font-bold text-white"> lasting success</span>.
              </p>
              <motion.div
                whileHover={{ scale: 1.05, filter: "brightness(1.1)" }}
                whileTap={{ scale: 0.95 }}
                className="inline-block mt-12"
              >
                <Button
                  asChild
                  size="lg"
                  variant="secondary"
                  className="rounded-full px-6 py-6 h-auto text-lg md:px-12 md:py-8 md:text-2xl shadow-2xl hover:bg-white hover:text-primary transition-all duration-500 whitespace-normal text-center min-h-[4rem]"
                >
                  <a href="https://api.whatsapp.com/send?phone=919114222044&text=Hi%2C%20I%20would%20like%20to%20book%20an%20appointment%20at%20Tiny%20Triumph%20CDC." target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                    Book Your Appointment Now
                    <ChevronRight className="ml-2 h-6 w-6 md:ml-3 md:h-8 md:w-8 flex-shrink-0" />
                  </a>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
