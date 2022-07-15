import { StatusBar } from '@capacitor/status-bar';
import { NavigationBar } from '@hugotomazi/capacitor-navigation-bar';
import { isPlatform } from '@ionic/react';

export const isAndroid = isPlatform('android');
export const isIos = isPlatform('ios');
export const isMobile = isAndroid || isIos;

export async function setStatusAndNavBarStyles() {
  await StatusBar.setOverlaysWebView({ overlay: true });
  await NavigationBar.hide();
}
