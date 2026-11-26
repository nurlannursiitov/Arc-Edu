import { useEffect, useState } from 'react';
import { Platform, useWindowDimensions } from 'react-native';

export function useResponsive() {
  const { width: rnWidth, height: rnHeight } = useWindowDimensions();
  const [webWidth, setWebWidth] = useState<number>(() => {
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      return window.innerWidth;
    }
    return rnWidth;
  });

  useEffect(() => {
    if (Platform.OS !== 'web' || typeof window === 'undefined') return;
    const onResize = () => setWebWidth(window.innerWidth);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const width = Platform.OS === 'web' ? webWidth : rnWidth;
  return {
    width,
    height: rnHeight,
    isDesktop: width >= 900,
  };
}
