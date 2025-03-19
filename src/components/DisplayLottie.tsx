import React from "react";
import Lottie from "lottie-react";
import codingBlackAnimation from "../assets/lottie/coding-black.json";
import { useTranslation } from "react-i18next";

const DisplayLottie: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div className="lottie-container">
      <Lottie
        animationData={codingBlackAnimation}
        loop={true}
        autoplay={true}
        aria-label={t("accessibility.codingAnimation")}
        rendererSettings={{
          preserveAspectRatio: "xMidYMid slice"
        }}
      />
      <span className="sr-only">{t("accessibility.codingAnimation")}</span>
    </div>
  );
};

export default DisplayLottie;
