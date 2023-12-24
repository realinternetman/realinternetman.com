import localFont from 'next/font/local';

export const fontPixel = localFont({
  variable: '--font-pixel',
  src: [
    {
      path: '../../public/assets/fonts/PixelMplus12-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/assets/fonts/PixelMplus12-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
});
