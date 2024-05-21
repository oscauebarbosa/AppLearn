import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Dados from "./context/DadosContext"

import TelaInicial from './telas/telaInicial';
import TelaEntrar from './telas/telaEntrar';
import TelaHome from './telas/telaHome';
import TelaPerfil from './telas/telaPerfil';

const Stack = createStackNavigator();

export default function App() {
  const [perfil, setPerfil] = useState({})

  return (
    <Dados.Provider value={{perfil, setPerfil}}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouter="TelaInicial">
          <Stack.Screen name="TelaInicial" component={TelaInicial} />
          <Stack.Screen name="TelaEntrar" component={TelaEntrar} />
          <Stack.Screen name="TelaHome" component={TelaHome} />
          <Stack.Screen name="TelaPerfil" component={TelaPerfil} />
        </Stack.Navigator>
      </NavigationContainer>
    </Dados.Provider>
  )
}
