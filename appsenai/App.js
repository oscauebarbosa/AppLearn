import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import TelaInicial from './telas/telaInicial';
import TelaEntrar from './telas/telaEntrar';
import TelaHome from './telas/telaHome';

export default function App() {

  const Stack = createStackNavigator()
  
  return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="TelaInicial">
          <Stack.Screen name="TelaInicial" component={TelaInicial} />
          <Stack.Screen name="TelaEntrar" component={TelaEntrar} />
          <Stack.Screen name="TelaHome" component={TelaHome} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}
