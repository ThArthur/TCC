import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../pages/Home';
import HomeAluno from '../pages/HomeAluno';

const Stack = createNativeStackNavigator();

export default function Route() {
  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="HomeAluno" component={HomeAluno} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}