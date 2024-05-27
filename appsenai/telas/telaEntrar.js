import React, { useState, useEffect } from 'react';
import { View, Image, Text, TextInput, TouchableOpacity, Switch, Alert, StyleSheet } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function App() {
  const [isBiometricEnabled, setIsBiometricEnabled] = useState(false);
  const [authenticating, setAuthenticating] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    checkBiometricSupport();
  }, []);

  const toggleSwitch = () => {
    if (!isBiometricEnabled) {
      setAuthenticating(true);
      authenticateWithBiometrics();
    } else {
      setIsBiometricEnabled(previousState => !previousState);
    }
  };

  const checkBiometricSupport = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();

    if (!hasHardware || !isEnrolled) {
      setIsBiometricEnabled(true);
    } else {
      setIsBiometricEnabled(false);
    }
  };

  const authenticateWithBiometrics = async () => {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Autenticação biométrica',
      });

      if (result.success) {
        setIsBiometricEnabled(true);
        navigation.navigate('TelaHome');
      } else {
        setIsBiometricEnabled(false);
        Alert.alert('Falha na autenticação.');
      }
    } catch (error) {
      console.error('Erro ao autenticar:', error);
      setIsBiometricEnabled(false);
      Alert.alert('Erro ao autenticar:', error.message);
    } finally {
      setAuthenticating(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/fundo2.png')} style={styles.imagem} />
      <Image source={require('../assets/logoCompBranca.png')} style={styles.logo} />
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <TextInput 
            style={styles.input} 
            placeholder="Email" 
            placeholderTextColor="#ccc" 
            textAlign="center"
          />
          <View style={styles.inputUnderline} />
        </View>
        <View style={styles.inputContainer}>
          <TextInput 
            style={styles.input} 
            placeholder="Senha" 
            placeholderTextColor="#ccc" 
            secureTextEntry={!passwordVisible} 
            textAlign="center"
          />
          <TouchableOpacity 
            style={styles.eyeIcon} 
            onPress={() => setPasswordVisible(!passwordVisible)}
          >
            <Ionicons 
              name={passwordVisible ? "eye" : "eye-off"} 
              size={24} 
              color="#ccc" 
            />
          </TouchableOpacity>
          <View style={styles.inputUnderline} />
        </View>
        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("TelaHome")}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
        <View style={styles.biometricContainer}>
          <Text style={styles.biometricText}>Ativar Biometria</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#8C52FF" }}
            thumbColor={isBiometricEnabled ? "#f5dd4b" : "#f4f3f4"}
            onValueChange={toggleSwitch}
            value={isBiometricEnabled}
            disabled={authenticating}
          />
        </View>
        {authenticating && <Text style={styles.authenticatingText}>Aguardando autenticação biométrica...</Text>}
      </View>
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
    top: 210,
    width: 390,
    height: 270,
    marginBottom: 20,
  },
  logo: {
    top: 180,
    width: 155,
    height: 65,
    marginBottom: 20,
  },
  formContainer: {
    backgroundColor: '#FFF',
    borderRadius: 50,
    marginTop: 180,
    padding: 20,
    width: '100%',
    height: '50%',
    alignItems: 'center',
  },
  inputContainer: {
    width: '90%',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  inputUnderline: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 1,
    backgroundColor: '#ccc',
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: 15,
  },
  btn: {
    backgroundColor: '#8C52FF',
    alignItems: 'center',
    width: '90%',
    height: 50,
    padding: 15,
    marginTop: 20,
    borderRadius: 23,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  biometricContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  biometricText: {
    color: '#FFC300',
    fontSize: 25,
    fontWeight: 'bold',
    marginRight: 10,
  },
  authenticatingText: {
    marginTop: 10,
    color: '#8C52FF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
