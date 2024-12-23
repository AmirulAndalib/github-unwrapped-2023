export const availableGradients = {
  orange: "radial-gradient(#DD8B5A, rgba(0, 0, 0, 0) 70%)",
  blue: "radial-gradient(#32588D, rgba(0, 0, 0, 0) 70%)",
  red: "radial-gradient(#CF3336, rgba(0, 0, 0, 0) 70%)",
  yellow: "radial-gradient(#E7D541, rgba(0, 0, 0, 0) 70%)",
  brown: "radial-gradient(#3E3429, rgba(0, 0, 0, 0) 70%)",
  white: "radial-gradient(#FFFFFF, rgba(0, 0, 0, 0) 70%)",
  blueRadial: "linear-gradient(180deg, #060842 0%, #474280 50%, #396A91 100%)",
  greenAlient: "linear-gradient(180deg, #051F0F 0%, #1A4F2E 50%, #39B77F 100%)",
  greenRadial:
    "radial-gradient(100% 100% at 47.08% 0%, rgba(176, 224, 186, 0.2) 0%, rgba(0, 0, 0, 0) 100%)",
  purpleRadial:
    "radial-gradient(100% 100% at 47.08% 100%, #381945 0%, rgba(0, 0, 0, 0) 100%)",
  silverRadial:
    "radial-gradient(170% 170% at 0% 0%, rgba(171, 169, 164, 0.2) 0%, rgba(0, 0, 0, 0) 100%)",
  iceRadial:
    "radial-gradient(170% 170% at 0% 0%, rgba(186, 204, 229, 0.15) 0%, rgba(0, 0, 0, 0) 100%)",
  leafyRadial:
    "radial-gradient(170% 170% at 0% 0%, rgba(177, 222, 192, 0.15) 0%, rgba(0, 0, 0, 0) 100%)",
  fireRadial:
    "radial-gradient(170% 170% at 0% 0%, rgba(230, 190, 186, 0.15) 0%, rgba(0, 0, 0, 0) 100%)",
  glow: "radial-gradient(circle at center, #e0ff5e 0, #3b6dd1 30%, #0086d4 50%, #021d57 65%, #01194a 100%)",
  whiteToTransparent: "linear-gradient(90deg, #ffffff00 0%, #ffffff20 100%)",
  pink: "radial-gradient(#484C7A, rgba(0, 0, 0, 0) 70%)",
  purple: "radial-gradient(#3E1441, rgba(0, 0, 0, 0) 70%)",
};

export type GradientType = keyof typeof availableGradients;
