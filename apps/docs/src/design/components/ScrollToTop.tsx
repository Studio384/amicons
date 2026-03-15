import { useEffect } from 'react';
import { useLocation } from 'react-router';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    document.querySelector('body')?.scrollIntoView({ behavior: 'smooth' });
  }, [pathname]);

  return null;
}

export default ScrollToTop;
