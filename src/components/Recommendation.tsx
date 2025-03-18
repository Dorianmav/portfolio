import React, { useRef } from "react";
import Slider from "react-slick";
import { FaQuoteLeft, FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { recommendationsData } from "../data/recommendationsData";
import { useTheme } from "../context/useTheme";
import { useTranslation } from "react-i18next";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Recommendation: React.FC = () => {
  const { themeColors, isDarkMode } = useTheme();
  const { t } = useTranslation();
  const sliderRef = useRef<Slider>(null);

  const settings = {
    dots: true,
    adaptiveHeight: true,
    infinite: true,
    speed: 800,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    draggable: true,
    swipeToSlide: true,
    swipe: true,
  };

  const gotoNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const gotoPrev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  if (recommendationsData.length === 0) {
    return null;
  }

  return (
    <div className="w-full py-16" style={{ backgroundColor: themeColors.background }}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center mb-12">
          <h2 
            className="text-4xl font-bold text-center relative inline-block"
            style={{ color: themeColors.primary }}
          >
            <span className="relative z-10">{t("recommendations.title", "Recommandations")}</span>
            <span 
              className="absolute bottom-0 left-0 w-full h-3 -z-10 transform -translate-y-2"
              style={{ backgroundColor: themeColors.accent, opacity: 0.3 }}
            ></span>
          </h2>
          <p 
            className="text-center mt-4 max-w-2xl"
            style={{ color: themeColors.textSecondary }}
          >
            {t("recommendations.subtitle", "Ce que disent mes collègues et clients à propos de mon travail")}
          </p>
        </div>
        
        <div className="relative w-full">
          <FaQuoteLeft
            className="absolute text-6xl opacity-50 z-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            style={{ color: themeColors.primary }}
          />
          
          <div className="w-full md:w-4/5 lg:w-3/4 mx-auto relative">
            <Slider {...settings} ref={sliderRef}>
              {recommendationsData.map((recommendation) => (
                <div key={recommendation.id} className="px-4 py-8">
                  <div className="flex flex-col items-center">
                    <div 
                      className="w-20 h-20 rounded-full flex items-center justify-center z-10 mb-[-1rem] shadow-md"
                      style={{ backgroundColor: themeColors.primary }}
                    >
                      <span className="text-2xl font-bold" style={{ color: themeColors.textLight }}>
                        {recommendation.name.charAt(0)}
                      </span>
                    </div>
                    
                    <div 
                      className="rounded-3xl p-8 pt-12 w-full md:w-4/5 transition-all duration-300 hover:shadow-lg"
                      style={{ 
                        backgroundColor: themeColors.card,
                        color: themeColors.text,
                        boxShadow: `0 4px 6px ${isDarkMode ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.1)'}`
                      }}
                    >
                      <p className="italic text-center mb-6">{recommendation.text}</p>
                      <h3 className="text-xl font-bold text-center">{recommendation.name}</h3>
                      <h4 className="text-center mb-2" style={{ color: themeColors.textSecondary }}>{recommendation.title}</h4>
                      {recommendation.link && (
                        <div className="text-center mt-4">
                          <a 
                            href={recommendation.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 hover:opacity-80"
                            style={{ 
                              backgroundColor: themeColors.accent,
                              color: isDarkMode ? themeColors.background : themeColors.text
                            }}
                          >
                            <span>LinkedIn</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                              <polyline points="15 3 21 3 21 9"></polyline>
                              <line x1="10" y1="14" x2="21" y2="3"></line>
                            </svg>
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
            
            <button
              className="absolute left-0 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center z-10 md:left-[-1.5rem] transition-all duration-300 hover:scale-110"
              onClick={gotoPrev}
              style={{ 
                backgroundColor: themeColors.primary,
                boxShadow: `0 2px 4px ${isDarkMode ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.1)'}`
              }}
              aria-label={t("accessibility.previousRecommendation", "Recommandation précédente")}
            >
              <FaArrowLeft style={{ color: themeColors.textLight }} />
            </button>
            
            <button
              className="absolute right-0 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center z-10 md:right-[-1.5rem] transition-all duration-300 hover:scale-110"
              onClick={gotoNext}
              style={{ 
                backgroundColor: themeColors.primary,
                boxShadow: `0 2px 4px ${isDarkMode ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.1)'}`
              }}
              aria-label={t("accessibility.nextRecommendation", "Recommandation suivante")}
            >
              <FaArrowRight style={{ color: themeColors.textLight }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recommendation;
