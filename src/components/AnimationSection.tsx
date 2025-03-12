import React from 'react';
import DisplayLottie from './DisplayLottie';

const AnimationSection: React.FC = () => {
  return (
    <div className="flex items-center justify-center py-10">
      <div className="w-full max-w-md">
        <DisplayLottie />
      </div>
    </div>
  );
};

export default AnimationSection;
