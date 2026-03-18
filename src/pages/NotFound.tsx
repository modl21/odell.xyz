import { useSeoMeta } from "@unhead/react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useSeoMeta({
    title: "404 - Page Not Found",
    description: "The page you are looking for could not be found. Return to the home page to continue browsing.",
  });

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container flex min-h-screen items-center justify-center py-16">
        <div className="w-full max-w-xl rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 text-center shadow-[0_24px_100px_rgba(0,0,0,0.35)] backdrop-blur-xl md:p-12">
          <p className="text-xs font-medium uppercase tracking-[0.32em] text-primary/75">404</p>
          <h1 className="mt-4 font-serif text-5xl tracking-tight md:text-6xl">Page not found</h1>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            The page you are looking for could not be found. Return to the homepage to continue browsing.
          </p>
          <a
            href="/"
            className="mt-8 inline-flex rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-medium text-foreground underline-offset-4 transition-colors hover:bg-white/[0.08] hover:text-primary"
          >
            Return to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
