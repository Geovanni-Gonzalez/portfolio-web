import { Warp, type WarpProps } from '@paper-design/shaders-react';
import { useEffect, useState } from 'react';

interface ThemeAwareWarpProps extends WarpProps {
    darkColors?: string[];
    lightColors?: string[];
}

export default function WarpBackground({ darkColors, lightColors, ...props }: ThemeAwareWarpProps) {
    const [theme, setTheme] = useState('dark');

    useEffect(() => {
        const updateTheme = () => {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
            setTheme(currentTheme);
        };

        // Initial check
        updateTheme();

        // Observer for theme changes
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

        return () => observer.disconnect();
    }, []);

    const defaultProps = {
        speed: 0.4,
        rotation: 0.5,
        style: { width: '100%', height: '100%', pointerEvents: 'none' as const }
    };

    // Determine colors based on current theme
    const themeColors = theme === 'light' ? lightColors : darkColors;
    const finalColors = (darkColors && lightColors) ? themeColors : props.colors;

    // Key forces remount on theme change to ensure shader updates
    return <Warp key={theme} {...defaultProps} {...props} colors={finalColors} style={{ ...defaultProps.style, ...props.style }} />;
}