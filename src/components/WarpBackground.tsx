import { Warp, type WarpProps } from '@paper-design/shaders-react';
import { useEffect, useState } from 'react';

interface ThemeAwareWarpProps extends WarpProps {
    darkColors?: string[];
    lightColors?: string[];
}

export default function WarpBackground({ darkColors, lightColors, ...props }: ThemeAwareWarpProps) {
    const [theme, setTheme] = useState('dark');
    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
        const updateTheme = () => {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
            setTheme(currentTheme);
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            const isMobile = window.matchMedia('(max-width: 767px)').matches;
            setShouldRender(currentTheme === 'dark' && !prefersReducedMotion && !isMobile);
        };

        updateTheme();

        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
                    updateTheme();
                }
            });
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme']
        });

        const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        const mobileQuery = window.matchMedia('(max-width: 767px)');
        motionQuery.addEventListener('change', updateTheme);
        mobileQuery.addEventListener('change', updateTheme);

        return () => {
            observer.disconnect();
            motionQuery.removeEventListener('change', updateTheme);
            mobileQuery.removeEventListener('change', updateTheme);
        };
    }, []);

    const defaultProps = {
        speed: 0.4,
        rotation: 0.5,
        style: { width: '100%', height: '100%', pointerEvents: 'none' as const }
    };

    if (!shouldRender) return null;

    const themeColors = theme === 'light' ? lightColors : darkColors;
    const finalColors = (darkColors && lightColors) ? themeColors : props.colors;

    return <Warp key={theme} {...defaultProps} {...props} colors={finalColors} style={{ ...defaultProps.style, ...props.style }} />;
}
