import React, { useState, useEffect } from 'react';

const PromoBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { text: "🚀 Mega Electronics Sale — Up to 40% Off", bg: "linear-gradient(135deg, #2b5876 0%, #4e4376 100%)" },
    { text: "✨ Festive Fashion Special — Extra ₹500 Cashback", bg: "linear-gradient(135deg, #e65c00 0%, #f9d423 100%)" },
    { text: "💳 Instant 10% Discount with Major Bank Cards", bg: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000); // Transitions automatically every 4 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="banner-slider">
      {slides.map((slide, index) => (
        <div
          key={index}
          className="banner-slide"
          style={{
            background: slide.bg,
            opacity: currentSlide === index ? 1 : 0,
            zIndex: currentSlide === index ? 1 : 0
          }}
        >
          {slide.text}
        </div>
      ))}
    </div>
  );
};

export default PromoBanner;