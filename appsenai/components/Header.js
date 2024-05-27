import React, { useContext } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Dados from '../context/DadosContext';

export default function Header({ navigation }) {
  const { perfil } = useContext(Dados);

  return (
    <View style={styles.header}>
      <View style={styles.perfilLogo}>
        <Image style={{ width: 50, height: 50 }} source={require('../assets/logoCorujaAzul.png')} />
        <Text style={styles.textoPerfilLogo}>Calendário</Text>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate("TelaPerfil")}>
        {perfil?.image ? (
          <Image
            source={{ uri: perfil.image }}
            style={{ width: 50, height: 50, borderRadius: 25 }}
          />
        ) : (
          <FontAwesome name="user-circle-o" size={50} color="#8C52FF" />
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
    marginLeft: 12,
    marginRight: 20,
  },
  perfilLogo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 2
  },
  textoPerfilLogo: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#8C52FF',
    marginLeft: 1, // Espaço entre o texto e a logo
  },
});
