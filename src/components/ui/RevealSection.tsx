import { ReactNode, memo } from "react";

interface RevealSectionProps {
    children: ReactNode;
    delay?: number;
}

export const RevealSection = memo(({ children }: RevealSectionProps) => {
    // Render content immediately — no animation to avoid CLS
    return (
        <div>
            {children}
        </div>
    );
});

RevealSection.displayName = "RevealSection";
