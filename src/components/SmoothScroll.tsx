import Lenis from "lenis";
import { useEffect } from "react";
import "lenis/dist/lenis.css";

const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.5, // Increased for dreamier, smoother feel
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            wheelMultiplier: 1.0,
            touchMultiplier: 1.8, // More responsive on touch devices
            infinite: false,
            lerp: 0.05, // Lower lerp = smoother transition (more fluid)
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
};

export default SmoothScroll;
