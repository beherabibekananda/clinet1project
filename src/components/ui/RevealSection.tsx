import { ReactNode, memo } from "react";
import { motion } from "framer-motion";

interface RevealSectionProps {
    children: ReactNode;
    delay?: number;
}

export const RevealSection = memo(({ children, delay = 0.1 }: RevealSectionProps) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay, ease: "easeOut" }}
        >
            {children}
        </motion.div>
    );
});

RevealSection.displayName = "RevealSection";
