import { StatusBar } from '@capacitor/status-bar';
// import { NavigationBar } from '@hugotomazi/capacitor-navigation-bar';
import { isPlatform } from '@ionic/react';

export const isMobile = isPlatform('mobile');

export async function setStatusAndNavBarStyles() {
  await StatusBar.setOverlaysWebView({ overlay: true });
  // await NavigationBar.hide();
}
