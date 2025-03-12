import React from "react";
// @ts-expect-error - Pas de fichier de déclaration pour react-lottie
import Lottie from "react-lottie";
import codingBlackAnimation from "../assets/lottie/coding-black.json";

const DisplayLottie: React.FC = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: codingBlackAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div
      className="lottie-container"
      role="img"
      aria-label="Animation de codage"
    >
      <Lottie options={defaultOptions} />
    </div>
  );
};

export default DisplayLottie;
