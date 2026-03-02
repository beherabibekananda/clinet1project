import { ReactNode } from "react";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col relative bg-background">
      {/* Lightweight Static Background Layer */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden bg-background">
        {/* Static Gradient Blobs — no JS animation, uses CSS only */}
        <div className="absolute inset-0 opacity-30">
          <div
            className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-primary/10 rounded-full blur-[100px]"
            style={{ transform: 'translate3d(0,0,0)' }}
          />
          <div
            className="absolute bottom-[5%] right-[-10%] w-[50%] h-[50%] bg-accent/10 rounded-full blur-[80px]"
            style={{ transform: 'translate3d(0,0,0)' }}
          />
        </div>

        {/* Grid Overlay */}
        <div
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]"
          style={{
            backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)',
            backgroundSize: '80px 80px'
          }}
        />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
