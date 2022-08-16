import { useEffect, useState } from 'react';

import { StatusBar } from '@capacitor/status-bar';
// import { NavigationBar } from '@hugotomazi/capacitor-navigation-bar';
import { isPlatform } from '@ionic/react';

export const isAndroid = isPlatform('android');
export const isIos = isPlatform('ios');
export const isMobile = isAndroid || isIos;

export async function setStatusAndNavBarStyles() {
  await StatusBar.setOverlaysWebView({ overlay: true });
  // await NavigationBar.hide();
}

type basicDevice = 'mobile' | 'desktop';

export function useGetDevice() {
  const [device, setDevice] = useState<basicDevice>(getDevice);

  useEffect(() => {
    function getDeviceCallback() {
      setDevice(getDevice());
    }

    window.addEventListener('resize', getDeviceCallback);

    return () => {
      window.removeEventListener('resize', getDeviceCallback);
    };
  }, []);

  function getDevice(): basicDevice {
    return window.innerWidth > 1024 ? 'desktop' : 'mobile';
  }

  return device;
}
