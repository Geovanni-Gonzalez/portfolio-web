import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <button
            onClick={scrollToTop}
            className={`fixed bottom-8 right-8 z-50 p-3 rounded-full shadow-lg backdrop-blur-md transition-all duration-300 transform border border-orange-400/20 group
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}
        bg-white/80 dark:bg-black/50 text-orange-600 dark:text-orange-400 hover:bg-orange-500 hover:text-white dark:hover:bg-orange-500 dark:hover:text-white hover:scale-110 hover:shadow-orange-500/30
      `}
            aria-label="Volver arriba"
        >
            <ArrowUp className="w-6 h-6 stroke-[3px]" />

            {/* Ripple effect or glow */}
            <span className="absolute inset-0 rounded-full bg-orange-400/20 opacity-0 group-hover:opacity-100 animate-pulse -z-10"></span>
        </button>
    );
}
