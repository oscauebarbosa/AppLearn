import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function App() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image source={require('../assets/fundo1.png')} style={styles.imagem} />
      <Image source={require('../assets/logoCompBranca.png')} style={styles.logo} />
      <Text style={styles.text}>Vamos começar?</Text>
      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("TelaEntrar")}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8C52FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagem: {
    top: 45,
    width: 320,
    height: 320,
    marginBottom: 20,
  },
  logo: {
    top: -20,
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  text: {
    top: -50,
    fontSize: 35,
    color: 'white',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  btn: {
    top: -60,
    backgroundColor: '#FED960',
    alignItems: 'center',
    width: 300,
    padding: 10,
    margin: 10,
    borderRadius: 18,
    borderColor: '#FED960',
    borderWidth: 3,
  },
  buttonText: {
    color: '#000000',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
