import gsap from "gsap";
import React, { useEffect, useReducer, useRef } from "react";

const AnimatedTitle = ({ title, containerClass, textColor }) => {
  const containerRef = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      const titleAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "100 bottom",
          end: "center bottom",
          toggleActions: "play none none reverse",
        },
      });

      titleAnimation.to(
        ".animated-word",
        {
          opacity: 1,
          transform: "translate3d(0, 0, 0) rotateY(0deg) rotateX(0deg)",
          ease: "power2.inOut",
          stagger: 0.1,
        },
        0
      );
    }, containerRef);

    return () => ctx.revert(); // Clean up on unmount
  }, []);
  return (
    <div className={`animated-title   ${containerClass}`} ref={containerRef}>
      {title.split("<br />").map((line, index) => (
        <div
          key={index}
          className={`flex-center max-w-full flex-wrap gap-2 px-10 md:gap-3 ${textColor}`}
        >
          {line.split(" ").map((word, idx) => (
            <span key={idx} className="animated-word" dangerouslySetInnerHTML={{ __html: word }} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default AnimatedTitle;
