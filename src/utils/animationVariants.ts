export const fadeInAnimation = ({
  scale = 1,
  delay = 0,
  duration = 0.7,
  opacity = 0,
  y = 0,
  x = 0,
}) => ({
  hidden: { opacity: opacity, scale: scale, translateY: y, translateX: x },
  visible: {
    scale: 1,
    opacity: 1,
    translateY: 0,
    translateX: 0,
    transition: { duration, delay, ease: [0.25, 0.1, 0.25, 1] as const },
  },
  exit: {
    scale: scale,
    opacity: opacity,
    translateY: y,
    translateX: x,
    transition: { duration, ease: [0.42, 0, 1, 1] as const },
  },
});

export const burgerMenuVariants = {
  hidden: { x: "100%", opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const },
  },
  exit: {
    x: "100%",
    opacity: 0,
    transition: { duration: 0.3, ease: [0.42, 0, 1, 1] as const },
  },
};

export const burgerListVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3, delay: 0.4 } },
  exit: { opacity: 0, x: 10, transition: { duration: 0.2 } },
};
