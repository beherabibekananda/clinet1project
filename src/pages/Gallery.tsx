import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { Sparkles, ChevronRight, CheckCircle2, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { assets } from "@/lib/assets";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Gallery = () => {
    const [visibleVideos, setVisibleVideos] = useState(3);
    const [visibleImages, setVisibleImages] = useState(6);

    // Portrait images (no rotation needed):
    // 0 = specialist photo, 1 = clinic-1, 9 = clinic-9, 17 = clinic-21, 19 = clinic-24, 23 = clinic-34, 24 = clinic-37, 25 = clinic-39, 26 = clinic-40, 27 = clinic-41, 28 = clinic-43
    // All other images are landscape and need 90° rotation
    const portraitIndices = new Set([0, 1, 9, 17, 19, 23, 24, 25, 26, 27, 28]);

    const allVideos = [
        { id: 1, title: "Sensory Mastery", ...assets.videos.showcase1 },
        { id: 2, title: "Precision Motor Skills", ...assets.videos.showcase2 },
        { id: 3, title: "Developmental Therapy", ...assets.videos.showcase3 },
        { id: 4, title: "Therapeutic Play", ...assets.videos.showcase4 },
        { id: 5, title: "Developmental Milestones", ...assets.videos.showcase5 },
        { id: 6, title: "Developmental Milestone", ...assets.videos.showcase6 },
        { id: 7, title: "Motor Function", ...assets.videos.showcase7 },
        { id: 8, title: "Success Stories", ...assets.videos.showcase9 },
        { id: 9, title: "Clinical Excellence", ...assets.videos.showcase10 },
        { id: 10, title: "Comprehensive Support", ...assets.videos.showcase11 },
        { id: 11, title: "Empowering Journeys", ...assets.videos.showcase12 },
        { id: 12, title: "Developmental Play", ...assets.videos.showcase13 },
    ];
    const galleryItems = [
        assets.hero.specialist2,
        ...assets.gallery
    ];

    return (
        <Layout>
            {/* 1. Splendid Split-Screen Hero */}
            <section className="relative min-h-[85vh] flex items-center bg-[#0a2a24] overflow-hidden pt-[160px] pb-[80px]">
                {/* Faded Background Image */}
                <div
                    className="absolute inset-0 z-0 opacity-20"
                    style={{
                        backgroundImage: `url('${assets.hero.galleryHero}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                />
                <div className="absolute inset-0 bg-[#0a2a24]/40 z-0" />

                <div className="container relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-white space-y-8 flex flex-col items-center text-center max-w-4xl mx-auto"
                    >
                        <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight">
                            Our <br />
                            <span className="text-hero-gradient italic">Inspiring Spaces.</span>
                        </h1>
                        <p className="text-base md:text-xl text-white/70 leading-relaxed font-light max-w-2xl">
                            Step inside our specialized facilities, where every corner is designed to inspire joy, foster creativity, and support your child's developmental journey.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* 2. Video Showcase Section */}
            <section className="py-16 bg-secondary/10">
                <div className="container">
                    <div className="mx-auto max-w-2xl text-center mb-16">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="font-display text-3xl font-bold text-foreground md:text-5xl"
                        >
                            Clinic in <span className="text-primary italic">Motion</span>
                        </motion.h2>
                        <p className="mt-4 text-muted-foreground text-lg">
                            Witness the specialized therapeutic techniques and joyous moments within our centre.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        <AnimatePresence mode="popLayout">
                            {allVideos.slice(0, visibleVideos).map((video, idx) => (
                                <motion.div
                                    key={video.id}
                                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                    transition={{ duration: 0.5, delay: idx % 3 * 0.1 }}
                                    className="group relative aspect-square overflow-hidden rounded-xl bg-card shadow-sm border border-border/40 transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
                                >
                                    <video
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        poster={video.poster}
                                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 transform-gpu"
                                        onMouseEnter={(e) => {
                                            const playPromise = e.currentTarget.play();
                                            if (playPromise !== undefined) {
                                                playPromise.catch(() => {
                                                    // Auto-play was prevented
                                                });
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            // Keep playing for a living gallery
                                        }}
                                    >
                                        <source src={video.webm} type="video/webm" />
                                        <source src={video.mp4} type="video/mp4" />
                                    </video>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-100" />
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        <div className="h-16 w-16 rounded-full bg-primary/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                                            <Play className="h-8 w-8 text-white fill-white" />
                                        </div>
                                    </div>
                                    <div className="absolute bottom-8 left-8 transition-transform duration-500 group-hover:-translate-y-2">
                                        <h3 className="text-xl font-bold text-white drop-shadow-lg">{video.title}</h3>
                                        <div className="mt-2 h-0.5 w-12 bg-primary rounded-full group-hover:w-full transition-all duration-500" />
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {visibleVideos < allVideos.length && (
                            <div className="col-span-full mt-16 text-center">
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
                </div>
            </section>

            <section className="py-16 bg-secondary/5">
                <div className="container">
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        <AnimatePresence mode="popLayout">
                            {galleryItems.slice(0, visibleImages).map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                    transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
                                    className="group relative aspect-square overflow-hidden rounded-xl bg-card border border-border/40 shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
                                >
                                    <LazyLoadImage
                                        src={item}
                                        alt="Clinic Gallery"
                                        effect="blur"
                                        wrapperClassName="h-full w-full"
                                        className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 transform-gpu ${!portraitIndices.has(index) ? 'rotate-90 scale-[1.5]' : ''}`}
                                        style={!portraitIndices.has(index) ? {
                                            transformOrigin: 'center center'
                                        } : undefined}
                                    />
                                    {/* Hover text removed */}
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {visibleImages < galleryItems.length && (
                        <div className="mt-16 text-center">
                            <Button
                                onClick={() => setVisibleImages(prev => Math.min(prev + 6, galleryItems.length))}
                                variant="outline"
                                className="rounded-full px-12 py-7 text-lg hover:scale-105 transition-all duration-300 border-primary/20 text-primary hover:bg-primary hover:text-white group"
                            >
                                Load More Images
                                <Sparkles className="ml-2 h-5 w-5 group-hover:animate-pulse" />
                            </Button>
                        </div>
                    )}
                </div>
            </section>
        </Layout>
    );
};

export default Gallery;
