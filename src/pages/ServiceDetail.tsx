import { useParams, Link, Navigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { services } from "@/data/services";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
    ChevronRight,
    ArrowLeft,
    CheckCircle2,
    Sparkles,
    ShieldCheck,
    Users,
    Clock,
    Award,
    MessageCircle,
    Star,
    Quote
} from "lucide-react";

const ServiceDetail = () => {
    const { id } = useParams<{ id: string }>();
    const service = services.find((s) => s.slug === id);
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const rotate = useTransform(scrollYProgress, [0, 1], [0, 10]);

    if (!service) {
        return <Navigate to="/services" replace />;
    }

    const Icon = service.icon;

    return (
        <Layout>
            <div ref={containerRef} className="relative min-h-screen bg-background">
                {/* 1. Boutique Hero Section */}
                <section className={`relative flex items-center pt-[160px] pb-[80px] overflow-hidden`} style={{ minHeight: '85vh' }}>
                    {/* Background Image with Overlay */}
                    <motion.div
                        initial={{
                            scale: service.needsRotation ? 1.4 : 1.1,
                            rotate: service.needsRotation ? -90 : 0,
                        }}
                        animate={{
                            scale: service.needsRotation ? 1.3 : 1,
                            rotate: service.needsRotation ? -90 : 0,
                        }}
                        transition={{ duration: 1.5 }}
                        className={`absolute z-0 bg-cover bg-center bg-no-repeat ${service.needsRotation
                            ? 'w-[200vw] h-[200vh] -left-[50vw] -top-[50vh]'
                            : 'inset-0'
                            }`}
                        style={{ backgroundImage: `url('${service.image}')` }}
                    >
                        <div className={`absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-background/20 backdrop-blur-[1px]`} />
                        <img
                            src={service.image}
                            alt=""
                            className="hidden"
                            loading="eager"
                            decoding="async"
                        />
                    </motion.div>

                    <div className="container relative z-20">
                        <div className="max-w-5xl">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <Link to="/services" className="group inline-flex items-center text-white font-bold mb-12 hover:translate-x-[-4px] transition-transform drop-shadow-md">
                                    <ArrowLeft className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />
                                    Back to Services
                                </Link>

                                <div className="flex flex-col md:flex-row md:items-center gap-6 mb-10">
                                    <motion.div
                                        initial={{ scale: 0.8, rotate: -10 }}
                                        animate={{ scale: 1, rotate: 0 }}
                                        className={`flex h-24 w-24 items-center justify-center rounded-[2rem] bg-white shadow-2xl ${service.iconColor}`}
                                    >
                                        <Icon className="h-12 w-12" />
                                    </motion.div>
                                    <h2 className="font-display text-2xl font-semibold text-white uppercase tracking-[0.3em] drop-shadow-lg">
                                        {service.title}
                                    </h2>
                                </div>

                                <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.1] mb-8 drop-shadow-xl">
                                    {service.headline}
                                </h1>

                                <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-3xl font-light drop-shadow-lg">
                                    {service.description}
                                </p>
                            </motion.div>
                        </div>
                    </div>

                    {/* Floating 3D Background Icon */}
                    <motion.div
                        style={{ rotate }}
                        className="absolute top-1/2 -right-20 w-[600px] h-[600px] opacity-[0.03] pointer-events-none translate-y-[-50%]"
                    >
                        <Icon className="w-full h-full" />
                    </motion.div>
                </section>

                {/* 2. Pull Quote Section */}
                <section className="py-16 bg-background relative overflow-hidden">
                    <div className="container relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="max-w-4xl mx-auto text-center"
                        >
                            <Quote className={`h-16 w-16 mx-auto mb-10 opacity-20 ${service.iconColor}`} />
                            <h3 className="font-display text-2xl md:text-3xl italic font-medium text-foreground leading-tight">
                                "{service.quote}"
                            </h3>
                        </motion.div>
                    </div>
                </section>

                {/* 3. Narrative Content Section */}
                <section className="py-16">
                    <div className="container">
                        <div className="grid grid-cols-1 gap-20 lg:grid-cols-12 items-start">
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="lg:col-span-7"
                            >
                                <div className="space-y-10">
                                    <div>
                                        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                                            The <span className="text-primary italic">Tiny Triumph</span> Approach
                                        </h2>
                                        <div className="prose prose-lg text-muted-foreground leading-relaxed">
                                            <p>{service.longDescription}</p>
                                        </div>
                                    </div>

                                    {/* Interactive Core Areas */}
                                    <div className="pt-10">
                                        <h3 className="font-display text-2xl font-bold tracking-wider uppercase text-foreground mb-10">Core Expertise</h3>
                                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                            {service.features.map((feature, idx) => (
                                                <motion.div
                                                    key={idx}
                                                    whileHover={{ scale: 1.02, x: 5 }}
                                                    className="flex items-center gap-4 p-6 rounded-3xl bg-muted/20 border border-border/40 hover:border-primary/30 transition-all group"
                                                >
                                                    <div className={`h-3 w-3 rounded-full ${service.bgColor.replace('50/90', '500')} opacity-40 group-hover:opacity-100 transition-opacity`} />
                                                    <span className="text-base font-medium text-foreground/80 group-hover:text-primary transition-colors">{feature}</span>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            <div className="lg:col-span-5 space-y-12">
                                {/* 4. 3D Benefits Card */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    className="group relative overflow-hidden rounded-[3.5rem] bg-card p-8 md:p-12 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-border/50"
                                >
                                    {/* Black Shade Sweep Effect */}
                                    <motion.div
                                        className="absolute inset-0 z-0 pointer-events-none bg-[#1d2f38]/5"
                                        initial={{ y: "-210%", rotate: 90, scaleX: 0.5, scaleY: 1.5 }}
                                        whileHover={{ y: "210%" }}
                                        transition={{ duration: 0.8, ease: "easeInOut" }}
                                    />

                                    <div className="relative z-10">
                                        <div className="flex items-center gap-5 mb-10">
                                            <div className={`h-14 w-14 flex items-center justify-center rounded-2xl bg-primary/10 ${service.iconColor}`}>
                                                <Sparkles className="h-7 w-7" />
                                            </div>
                                            <h3 className="font-display text-3xl font-bold">Clinical Benefits</h3>
                                        </div>
                                        <ul className="space-y-8">
                                            {service.benefits.map((benefit, idx) => (
                                                <li key={idx} className="flex gap-5">
                                                    <div className={`mt-2 h-2.5 w-2.5 rounded-full flex-shrink-0 ${service.iconColor.replace('text-', 'bg-')}`} />
                                                    <p className="text-base text-muted-foreground leading-snug">{benefit}</p>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </motion.div>

                                {/* 5. High-Impact CTA */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="rounded-[3.5rem] bg-primary p-8 md:p-12 text-primary-foreground shadow-2xl relative overflow-hidden group"
                                >
                                    <div className="relative z-10">
                                        <h3 className="font-display text-2xl md:text-3xl font-bold mb-6">Begin the Journey</h3>
                                        <p className="text-lg text-primary-foreground/80 mb-8 leading-relaxed">
                                            Schedule a personalized assessment with our {service.title} specialists.
                                        </p>
                                        <Button asChild size="lg" variant="secondary" className="w-full sm:w-auto rounded-full px-8 py-6 text-lg md:px-12 md:py-8 md:text-xl shadow-xl hover-lift bg-white text-primary hover:bg-white/90">
                                            <a href={`https://api.whatsapp.com/send?phone=919114222044&text=Hi%2C%20I'm%20interested%20in%20${service.title}%20for%20my%20child.`} target="_blank" rel="noopener noreferrer">
                                                Book Consultation
                                                <ChevronRight className="ml-2 h-6 w-6" />
                                            </a>
                                        </Button>
                                    </div>
                                    <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700" />
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 6. Expert Insight Grid */}
                <section className="py-16 bg-muted/10 relative overflow-hidden border-y border-border/50">
                    <div className="container relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-20"
                        >
                            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">Clinical Mastery</h2>
                            <p className="text-xl text-muted-foreground">Expertly crafted protocols for meaningful progress.</p>
                        </motion.div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {service.clinicalInsights.map((insight, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.15 }}
                                    className="relative group p-8 md:p-12 rounded-[3rem] bg-card border border-border/50 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.1)] hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
                                >
                                    <div className={`mb-8 h-16 w-16 flex items-center justify-center rounded-2xl bg-muted transition-colors duration-300 group-hover:bg-primary group-hover:text-white ${service.iconColor}`}>
                                        {idx === 0 ? <ShieldCheck className="h-8 w-8" /> : idx === 1 ? <Users className="h-8 w-8" /> : <Award className="h-8 w-8" />}
                                    </div>
                                    <p className="text-xl font-medium text-foreground/80 leading-relaxed">
                                        {insight}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default ServiceDetail;

