import * as convert from "color-convert";

export const generatePalette = (hex) => {
  const colors = [];
  const [h, s] = convert.hex.hsl(hex);
  for (let index = 0; index <= 100; index += 10) {
    colors.push([h, s, index]);
  }
  return colors;
};

export const shadow = (entry) => {
  const hsl = convert.hex.hsl(entry);
  const shadowCSS = `${hsl[0]}deg ${hsl[1]}% ${hsl[2]}%`;
  return shadowCSS;
};
