import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider } from './src/context/auth';
import { Route } from './src/route';
import { GameArrastarQuant } from './src/pages/GameArrastarQuant';
import { GameSequence } from './src/pages/GameSequence';

export default function App(){
  return(
    <NavigationContainer>
      <AuthProvider>
        <GestureHandlerRootView style={{flex: 1,}}>
          <GameArrastarQuant/>
        </GestureHandlerRootView>
      </AuthProvider>
    </NavigationContainer>
  );
}
