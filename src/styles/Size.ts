export enum IMAGE_SIZE {
  SM = 300,
  MD = 400,
  LG = 550,
}

const WINDOW_SIZE = {
  MobileS: "320px",
  MobileM: "375px",
  MobileL: "425px",
  Tablet: "768px",
  Laptop: "1024px",
  LaptopL: "1440px",
  Desktop: "2560px",
};

export const device = {
  MobileS: `(min-width: ${WINDOW_SIZE.MobileS})`,
  MobileM: `(min-width: ${WINDOW_SIZE.MobileM})`,
  MobileL: `(min-width: ${WINDOW_SIZE.MobileL})`,
  Tablet: `(min-width: ${WINDOW_SIZE.Tablet})`,
  Laptop: `(min-width: ${WINDOW_SIZE.Laptop})`,
  LaptopL: `(min-width: ${WINDOW_SIZE.LaptopL})`,
  Desktop: `(min-width: ${WINDOW_SIZE.Desktop})`,
  DesktopL: `(min-width: ${WINDOW_SIZE.Desktop})`,
};
