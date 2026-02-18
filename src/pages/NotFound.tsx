import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="text-center animate-fade-up">
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <h1 className="text-9xl font-display font-bold text-primary/10">404</h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-display font-semibold text-foreground">Oops! Location lost</span>
            </div>
          </div>
        </div>
        <h2 className="mb-4 text-3xl font-bold font-display text-foreground">Something went missing</h2>
        <p className="mb-8 max-w-md mx-auto text-lg text-muted-foreground">
          The page you're looking for was either moved or never existed.
          Don't worry, we can help you find your way back.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg" className="rounded-full px-8">
            <Link to="/">
              <Home className="mr-2 h-5 w-5" />
              Go to Homepage
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full px-8">
            <Link to="/contact">
              Contact Support
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
