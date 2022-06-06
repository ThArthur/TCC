import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider } from './src/context/auth';
import { GameSequence } from './src/pages/GameSequence';
import { Route } from './src/route';

export default function App(){
  return(
    <NavigationContainer>
      <AuthProvider>
        <GestureHandlerRootView style={{flex: 1,}}>
          <GameSequence/>
        </GestureHandlerRootView>
      </AuthProvider>
    </NavigationContainer>
  );
}
