import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { AuthProvider } from './src/context/auth';
import { Route } from './src/route';

export default function App(){
  return(
    <NavigationContainer>
      <AuthProvider>
        <Route/>
      </AuthProvider>
    </NavigationContainer>
  );
}
