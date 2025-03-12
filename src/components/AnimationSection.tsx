import React from 'react';
import DisplayLottie from './DisplayLottie';
import { themeColors } from '../theme/colors';

const AnimationSection: React.FC = () => {
  return (
    <div className="flex items-center justify-center py-10" style={{ backgroundColor: themeColors.background }}>
      <div className="w-full max-w-md" style={{ 
        backgroundColor: themeColors.background,
        borderRadius: '8px'
      }}>
        <DisplayLottie />
      </div>
    </div>
  );
};

export default AnimationSection;
