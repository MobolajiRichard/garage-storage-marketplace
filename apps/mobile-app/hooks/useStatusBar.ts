import * as StatusBar from 'expo-status-bar';
import { useCallback } from "react";
import { Platform } from 'react-native';

export function useStatusBar() {
  const handleLight = useCallback(() => {
    StatusBar.setStatusBarStyle('light');
    StatusBar.setStatusBarTranslucent(Platform.OS === 'android');
    StatusBar.setStatusBarBackgroundColor('transparent');
  }, []);

  const handleDark = useCallback(() => {
    StatusBar.setStatusBarStyle('dark');
    StatusBar.setStatusBarTranslucent(Platform.OS === 'android');
    StatusBar.setStatusBarBackgroundColor('transparent');
  }, []);

  return { handleLight, handleDark };
}