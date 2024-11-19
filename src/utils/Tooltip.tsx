import React, { useState } from "react";

interface TooltipProps {
  text: string;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="relative hover:*:"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      <div
        className={`absolute top-full mt-2 left-1/2 -translate-x-1/2 w-max p-2 bg-gray-800 text-white text-sm rounded shadow-lg transform transition-opacity duration-700 ${
          isVisible ? "opacity-100" : "opacity-0 delay-1000"
        }`}
        style={{
          visibility: isVisible ? "visible" : "hidden",
        }}
      >
        {text}
      </div>
    </div>
  );
};

export default Tooltip;
