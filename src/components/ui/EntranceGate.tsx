import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { assets } from "@/lib/assets";

interface EntranceGateProps {
    onComplete: () => void;
    mode?: "full" | "minimal";
}

const EntranceGate = ({ onComplete, mode = "full" }: EntranceGateProps) => {
    const [animationStage, setAnimationStage] = useState<"ecg" | "peak" | "logo" | "thread" | "reveal" | "complete">("ecg");

    useEffect(() => {
        // Timeline adjustments based on mode - optimized for speed
        let peakDelay = 600;
        let logoDelay = 1000;
        let threadDelay = 1200;
        let revealDelay = 1500;
        let completeDelay = 2600;

        if (mode === "minimal") {
            peakDelay = 50;
            logoDelay = 51;
            threadDelay = 52;
            revealDelay = 150;
            completeDelay = 400; // Jet Flow Speed
        }

        const peakTimer = setTimeout(() => setAnimationStage("peak"), peakDelay);

        const logoTimer = setTimeout(() => {
            if (mode === "full") setAnimationStage("logo");
            else setAnimationStage("reveal");
        }, logoDelay);

        const threadTimer = mode === "full" ? setTimeout(() => setAnimationStage("thread"), threadDelay) : null;
        const revealTimer = mode === "full" ? setTimeout(() => setAnimationStage("reveal"), revealDelay) : null;
        const completeTimer = setTimeout(() => onComplete(), completeDelay);

        return () => {
            clearTimeout(peakTimer);
            clearTimeout(logoTimer);
            if (threadTimer) clearTimeout(threadTimer);
            if (revealTimer) clearTimeout(revealTimer);
            clearTimeout(completeTimer);
        };
    }, [onComplete, mode]);

    const showLogo = mode === "full" && (animationStage === "peak" || animationStage === "logo" || animationStage === "thread" || animationStage === "reveal");
    const isRevealActive = animationStage === "reveal";
    const isThreadActive = animationStage === "thread" || animationStage === "reveal";

    // Complex 15-point polygon for the "Wrinkled Blanket" effect
    // Simplified 9-point polygon for the "Wrinkled Blanket" effect - much faster for CPU/GPU
    const initialPath = "polygon(0% 0%, 100% 0%, 100% 100%, 75% 100%, 50% 100%, 25% 100%, 0% 100%)";
    const wrinkledPath = "polygon(0% 0%, 100% 0%, 100% -10%, 75% -25%, 50% -100%, 25% -25%, 0% -10%)";

    return (
        <motion.div
            initial={mode === "minimal" ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden pointer-events-none transform-gpu will-change-transform"
        >
            {/* The Wrinkled Blanket Banner */}
            <motion.div
                initial={mode === "full" ? { clipPath: initialPath } : { opacity: 1 }}
                animate={
                    mode === "full"
                        ? { clipPath: isRevealActive ? wrinkledPath : initialPath }
                        : { opacity: isRevealActive ? 0 : 1 }
                }
                transition={
                    mode === "full"
                        ? {
                            duration: 2.2,
                            ease: [0.77, 0, 0.175, 1],
                            type: "spring",
                            damping: 18,
                            stiffness: 60
                        }
                        : { duration: 0.8, ease: "easeOut" }
                }
                className={`absolute inset-0 bg-[#0a2a24] z-[45] ${mode === "minimal" ? "bg-opacity-100 shadow-none border-none" : ""}`}
            >
                {/* Panel Texture/Grid */}
                <div
                    className={`absolute inset-0 opacity-[0.06] pointer-events-none ${mode === "minimal" ? "opacity-[0.03]" : ""}`}
                    style={{
                        backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                        backgroundSize: '48px 48px'
                    }}
                />

                {/* The Thread (Visible in Full Mode) */}
                {mode === "full" && (
                    <div className="absolute inset-x-0 bottom-0 h-screen flex flex-col items-center justify-end">
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{
                                height: isThreadActive ? "60vh" : "0vh",
                                opacity: isThreadActive ? 1 : 0,
                                y: isRevealActive ? "-110vh" : "0vh" // Matching the deepest point of wrinkledPath
                            }}
                            transition={{
                                height: { duration: 0.8, ease: "easeOut" },
                                opacity: { duration: 0.3 },
                                y: {
                                    duration: 2.2,
                                    ease: [0.77, 0, 0.175, 1],
                                    type: "spring",
                                    damping: 18,
                                    stiffness: 60
                                }
                            }}
                            className="absolute top-0 left-1/2 w-[2px] bg-primary shadow-[0_0_15px_rgba(72,160,147,0.8)] z-50 origin-top -translate-x-1/2 transform-gpu will-change-[height,opacity,transform]"
                        >
                            {/* Hook Point */}
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-3 w-3 bg-primary rounded-full shadow-[0_0_10px_rgba(72,160,147,0.5)]" />
                        </motion.div>
                    </div>
                )}

                {/* Identity Presentation (Center) */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <AnimatePresence>
                        {showLogo && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.7, y: 30 }}
                                animate={{
                                    opacity: isRevealActive ? 0 : 1,
                                    scale: isRevealActive ? 1.2 : 1,
                                    y: isRevealActive ? -450 : 0, // Pull it up fast with the blanket
                                }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
                                className="relative z-[60] flex flex-col items-center"
                            >
                                {/* Logo with Pulse Glow */}
                                <div className="relative mb-10">
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{
                                            opacity: isRevealActive ? 0 : 1,
                                            scale: isRevealActive ? 1.4 : 1,
                                            y: isRevealActive ? -500 : 0,
                                        }}
                                        transition={{
                                            duration: isRevealActive ? 1.2 : 1.5,
                                            ease: [0.34, 1.56, 0.64, 1]
                                        }}
                                        className="relative overflow-hidden flex items-center justify-center p-6 bg-white rounded-full shadow-[0_0_80px_rgba(94,194,180,0.3)] z-[60] w-72 h-72 md:w-96 md:h-96 transform-gpu will-change-transform"
                                    >
                                        <img
                                            src={assets.logos.square}
                                            alt="Tiny Triumph Icon"
                                            className="h-full w-full object-contain"
                                        />
                                    </motion.div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>

            {/* Corner Markers (Visible until reveal) */}
            {mode === "full" && !isRevealActive && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-[44] pointer-events-none"
                >
                    <div className="absolute top-16 left-16 w-12 h-12 border-l border-t border-white/10 hidden md:block" />
                    <div className="absolute top-16 right-16 w-12 h-12 border-r border-t border-white/10 hidden md:block" />
                    <div className="absolute bottom-16 left-16 w-12 h-12 border-l border-b border-white/10 hidden md:block" />
                    <div className="absolute bottom-16 right-16 w-12 h-12 border-r border-b border-white/10 hidden md:block" />
                </motion.div>
            )}

            {/* The Vital Line (ECG) Layer */}
            <AnimatePresence>
                {animationStage === "ecg" && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center z-[100] h-[240px]"
                    >
                        <div className="w-full max-w-2xl px-12">
                            <svg viewBox="0 0 100 20" className="w-full overflow-visible">
                                <motion.path
                                    d="M 0 10 L 40 10 L 42 2 L 48 18 L 50 10 L 100 10"
                                    fill="transparent"
                                    strokeWidth="0.8"
                                    stroke="hsl(174, 45%, 55%)"
                                    strokeLinecap="round"
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={{ pathLength: 1, opacity: [0, 1, 0.5, 1] }}
                                    transition={{ duration: mode === "minimal" ? 0.6 : 1.4, ease: "easeInOut" }}
                                    className="drop-shadow-[0_0_15px_rgba(72,160,147,0.8)]"
                                />
                            </svg>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default EntranceGate;
