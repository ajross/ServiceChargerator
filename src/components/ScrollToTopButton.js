import React, { useState, useEffect } from 'react';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'  // Enables smooth scrolling
    });
  };

  return (
    isVisible && (
      <button
        onClick={scrollToTop}
        className={`scrollToTopButton ${isVisible ? 'show' : ''}`}
      >
        ↑
      </button>
    )
  );
};

export default ScrollToTopButton;