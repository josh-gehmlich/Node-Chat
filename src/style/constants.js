/* COLORS */
export const white = '#fff';
export const black = '#3c3c3c';
export const bgGrayLight = '#f3f3f3';
export const bgGray = '#eee';
export const outlineGray = '#dbdbdb';
export const blue = '#2980ff';
export const blueLight = '#6dc6ff';
export const disabled = '#9b9b9b';
export const blueGrayMixin = colored => `
  background-color: ${colored ? blue : bgGray};
  @media not all and (hover: none) {
    background-attachment: fixed;
    background-image: linear-gradient(to bottom,
      ${colored ? blueLight : bgGrayLight} 0%,
      ${colored ? blue: bgGray} 60%);
  }`;

/* FONTS */
export const systemFont = '-apple-system, BlinkMaclatoFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';
export const latoFont = '"Lato", sans-serif';
export const fontSize = '16px';

/* RADII */
export const radiusLg = '19px';
export const radiusMd = '14px';
export const radiusSm = '4px'