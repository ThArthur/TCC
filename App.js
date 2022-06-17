import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider } from './src/context/auth';
import { Route } from './src/route';
import { Provider } from 'react-redux';
import store from './src/store/index';
import { Quest } from './src/components/Quest';
import { StatusBar } from 'react-native';

export default function App(){
  return(
    <GestureHandlerRootView style={{flex: 1,}}>
      <NavigationContainer>
        <AuthProvider>
            <Provider store={store}>
              <Quest/>
              <StatusBar barStyle={'light-content'} translucent backgroundColor={'transparent'} />
              <Route/>
            </Provider>
        </AuthProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
