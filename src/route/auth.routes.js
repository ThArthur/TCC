import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../pages/Login';
import CadastroOrientador from '../pages/CadastroOrientador';

const AuthStack = createNativeStackNavigator();

export default function AuthRoute() {
  return (
      <AuthStack.Navigator initialRouteName="Login">

        <AuthStack.Screen 
        options={{headerShown: false}} 
        name="Login" 
        component={Login} 
        />
        
        <AuthStack.Screen 
        options={{headerShown: false}} 
        name="Cadastro Orientador" 
        component={CadastroOrientador} 
        />
      </AuthStack.Navigator>
  );
}