import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function AOSWrapper() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      mirror: true,
      once: false,
      easing: 'ease-out-cubic',
    });
  }, []);

  return null;
}

