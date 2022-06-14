import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider } from './src/context/auth';
import { Route } from './src/route';
import { GameArrastarQuant } from './src/pages/GameArrastarQuant';
import { Provider } from 'react-redux';
import store from './src/store/index';
import { Quest } from './src/components/Quest';
import { GameSequence } from './src/pages/GameSequence';
import { JogoMao } from './src/pages/JogoMao';

export default function App(){
  return(
    <GestureHandlerRootView style={{flex: 1,}}>
      <NavigationContainer>
        <AuthProvider>
            <Provider store={store}>
              <Quest/>
              <JogoMao/>
            </Provider>
        </AuthProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
