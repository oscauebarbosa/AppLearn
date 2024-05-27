import React, { useContext, useState, useEffect } from "react";
import { Text, View, StyleSheet, Image, ScrollView, TouchableOpacity, Pressable, Modal, TextInput, Alert, TouchableWithoutFeedback } from 'react-native';
import Dados from "../context/DadosContext";
import { FontAwesome6, FontAwesome, Fontisto, Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

export default function({ navigation }) {
  const { perfil, setPerfil } = useContext(Dados);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalSenhaVisible, setModalSenhaVisible] = useState(false);
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [imageUri, setImageUri] = useState(perfil.imageUri ? [perfil.imageUri] : []);
  const [image, setImage] = useState(perfil.image ? [perfil.image] : []);

  useEffect(() => {
    if (perfil.imageUri || perfil.image) {
      setModalVisible(false);
    }
  }, [perfil]);

  function cadastrar(img) {
    setPerfil({
      ...perfil,
      imageUri: img,
      image: img,
    });
  }

  function alterarSenha() {
    if (novaSenha !== confirmarSenha) {
      alert('As senhas não coincidem!');
      return;
    }
    // Lógica para alterar a senha no backend
    
    setModalSenhaVisible(false);
  }

  async function pickImage() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Desculpe, precisamos de permissões da biblioteca de fotos para fazer isso funcionar!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri([result.assets[0].uri]);
      cadastrar(result.assets[0].uri);
    }
  }

  async function takePhoto() {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Desculpe, precisamos de permissões de câmera para fazer isso funcionar!');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri([]);
      setImage([result.assets[0].uri]);
      cadastrar(result.assets[0].uri);
    }
  }

  function limparImagem() {
    setImageUri([]);
    setImage([]);
    setPerfil({
      ...perfil,
      imageUri: null,
      image: null,
    });
  }

  return (
    <ScrollView style={css.container}>
      <TouchableOpacity onPress={() => navigation.navigate("TelaHome")}>
        <View style={css.perfilLogo}>
          <Image style={{ width: 50, height: 50 }} source={require('../assets/logoCorujaBranca.png')} />
          <Text style={css.textoPerfilLogo}>Perfil</Text>
        </View>
      </TouchableOpacity>

      <View style={css.circulo}>
        <View style={css.circuloECamera}>
          {imageUri[0] || image[0] ? (
            <Image
              source={{ uri: imageUri[0] || image[0] }}
              style={{ width: 170, height: 170, borderRadius: 85 }}
            />
          ) : (
            perfil.imageUri || perfil.image ? (
              <Image
                source={{ uri: perfil.imageUri || perfil.image }}
                style={{ width: 170, height: 170, borderRadius: 85 }}
              />
            ) : (
              <FontAwesome name="user-circle-o" size={170} color="white" />
            )
          )}

          <TouchableOpacity style={css.cameraPerfil} onPress={() => setModalVisible(true)}>
            <FontAwesome6 name="camera-retro" size={30} color="white" />
          </TouchableOpacity>
        </View>

        <Text style={css.textoNome}>Cauê Barbosa</Text>
        <Text style={css.textoAP}>Aluno</Text>
      </View>

      <View style={css.cursosDiv}>
        <Text style={css.cursosTexto}>Cursos</Text>

        <View style={css.cursosRow}>
          <View style={css.cursoInfo}>
            <Text style={css.cursosTexto}>2</Text>
            <Text style={css.cursosTextoDois}>Finalizados</Text>
          </View>

          <View style={css.cursosTracoDiv}>
            <Text style={css.cursosTraco}>|</Text>
          </View>

          <View style={css.cursoInfo}>
            <Text style={css.cursosTexto}>1</Text>
            <Text style={css.cursosTextoDois}>Em andamento</Text>
          </View>
        </View>
      </View>

      <View style={css.informacoes}>
        <View style={css.divMenorInformacoes}>
          <View>
            <Text style={css.informacoesMaior}>E-mail</Text>
            <Text style={css.informacoesMenor}>caue.barbosa@aluno.senai</Text>
          </View>

          <View>
            <Text style={css.informacoesMaior}>Data de nascimento</Text>
            <Text style={css.informacoesMenor}>10/02/2007</Text>
          </View>

          <View>
            <Text style={css.informacoesMaior}>CPF</Text>
            <Text style={css.informacoesMenor}>12345678910</Text>
          </View>
        </View>

        <View style={css.botoes}>
          <Pressable style={css.botao} onPress={() => setModalSenhaVisible(true)}>
            <Text style={css.textoBotaoSalvar}>Alterar Senha</Text>
          </Pressable>
        </View>

        <View>
          <Image style={css.logoRoxa} source={require('../assets/logoCompAzul.png')} />
        </View>

        <Modal
          animationType="slide"
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
          transparent={true}
        >
          <TouchableOpacity style={css.modalOverlay} onPress={() => setModalVisible(false)}>
            <TouchableWithoutFeedback>
              <View style={[css.modalContainerfoto, {borderRadius: 20}]}>
                <Text style={css.modalTitulo}>Foto de Perfil</Text>
                
                <View style={css.adicionarFotoRow}>
                  <View style={[css.adicionarFoto, css.marginHorizontal]}>
                    <TouchableOpacity onPress={() => {
                      setModalVisible(false);
                      pickImage();
                    }}>
                      <Fontisto name="photograph" size={50} color="black" />
                    </TouchableOpacity>
                  </View>

                  <View style={[css.adicionarFoto, css.marginHorizontal]}>
                    <TouchableOpacity onPress={() => {
                      setModalVisible(false);
                      takePhoto();
                    }}>
                      <FontAwesome6 name="camera-retro" size={50} color="black" style={{ borderColor: "#fff" }} />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={css.botoes}>
                  <Pressable style={css.botao} onPress={() => {
                    setModalVisible(false);
                    limparImagem();
                  }}>
                    <Text style={css.textoBotaoSalvar}>Excluir foto</Text>
                  </Pressable>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </TouchableOpacity>
        </Modal>

        <Modal
          animationType="slide"
          visible={modalSenhaVisible}
          onRequestClose={() => setModalSenhaVisible(false)}
          transparent={true}
        >
          <TouchableOpacity style={css.modalOverlay} onPress={() => setModalSenhaVisible(false)}>
            <TouchableWithoutFeedback>
              <View style={[css.modalContainersenha, {borderRadius: 20}]}>
                <Text style={css.modalTitulo}>Alterar senha</Text>
                <View style={css.inputContainer}>
                  <TextInput
                    style={css.input}
                    placeholder="Nova senha"
                    placeholderTextColor="#ccc"
                    textAlign="center"
                    secureTextEntry={!passwordVisible}
                    onChangeText={text => setNovaSenha(text)}
                    value={novaSenha}
                  />
                  <TouchableOpacity
                    style={css.eyeIcon}
                    onPress={() => setPasswordVisible(!passwordVisible)}
                  >
                    <Ionicons
                      name={passwordVisible ? "eye" : "eye-off"}
                      size={24}
                      color="#ccc"
                    />
                  </TouchableOpacity>
                </View>
                <View style={css.inputContainer}>
                  <TextInput
                    style={css.input}
                    placeholder="Confirmar senha"
                    placeholderTextColor="#ccc"
                    textAlign="center"
                    secureTextEntry={!passwordVisible}
                    onChangeText={text => setConfirmarSenha(text)}
                    value={confirmarSenha}
                  />
                  <TouchableOpacity
                    style={css.eyeIcon}
                    onPress={() => setPasswordVisible(!passwordVisible)}
                  >
                    <Ionicons
                      name={passwordVisible ? "eye" : "eye-off"}
                      size={24}
                      color="#ccc"
                    />
                  </TouchableOpacity>
                </View>
                <Pressable style={[css.botao, {marginTop: 30}]}  onPress={() => alterarSenha()}>
                  <Text style={css.textoBotaoSalvar}>Salvar</Text>
                </Pressable>
              </View>
            </TouchableWithoutFeedback>
          </TouchableOpacity>
        </Modal>
      </View>
    </ScrollView>
  );
}

const css = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8C52FF',
  },
  perfilLogo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
    marginTop: 40,
  },
  textoPerfilLogo: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold'
  },
  circulo: {
    alignItems: 'center',
    marginTop: 30
  },
  circuloECamera: {
    flexDirection: "row", 
    justifyContent: "center", 
    alignItems: "center", 
    position: "relative"
  },
  cameraPerfil: {
    backgroundColor: '#3B2664',
    padding: 10,
    borderRadius: 50,
    position: "absolute",
    bottom: 0,
    right: 0
  },
  textoNome: {
    fontSize: 35,
    marginTop: 15,
    color: '#fff',
    fontWeight: 'bold'
  },
  textoAP: {
    marginBottom: 20,
    fontSize: 20,
    color: '#fff'
  },
  cursosDiv: {
    backgroundColor: '#fff',
    borderRadius: 20,
    width: 300,
    height: 120,
    alignItems: 'center',
    marginLeft: '13%',
    marginRight: '10%',
    padding: 10
  },
  cursosTexto: {
    fontSize: 30, 
    color: "#8C52FF", 
    fontWeight: 'bold'
  },
  cursosTextoDois:{
    fontSize: 15, 
    color: "#6E6E6E",
    fontWeight: 'bold', 
  },  
  cursosRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cursoInfo: {
    alignItems: 'center',
    marginLeft: 20
  },
  cursosTracoDiv: {
    marginLeft: '10%',
  },
  cursosTraco: {
    fontSize: 40,
    color: '#8C52FF'
  },
  informacoes: {
    backgroundColor: "#fff",
    marginTop: 25,
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    height: 500,
  },
  divMenorInformacoes: {
    margin: '10%',
    gap: 20
  },
  informacoesMaior: {
    fontSize: 25,
    color: '#6E6E6E',
    fontWeight: 'bold'
  },
  informacoesMenor: {
    fontSize: 15,
    color: '#6E6E6E'
  },
  logoRoxa: {
    marginTop: -25,
    marginLeft: '31%',
    width: 150,
    height: 60
  },
  adicionarFotoRow: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 30
  },
  adicionarFoto: {
    backgroundColor: '#fff',
    alignItems: 'center',
    borderWidth: 0,
    padding: 20,
    borderRadius: 20,
    width: 120,
    elevation: 10,
    shadowColor: 'black',
    shadowRadius: 2,
    shadowOpacity: 0.2
  },
  marginHorizontal: {
    marginHorizontal: 15, 
  },
  botoes: {
    alignItems: 'center',
    justifyContent: "center",
    marginBottom: 70
  },
  botao: {
    backgroundColor: '#8C52FF',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    width: 180,
    elevation: 10,
    shadowColor: 'black',
    marginVertical: 10  
  },
  textoBotaoSalvar: { 
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff'
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainerfoto: {
    width: '80%',
    height: '35%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalContainersenha: {
    width: '80%',
    height: '33%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitulo: {
    fontSize: 35,
    color: '#8C52FF',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
    color: 'black',
  },
  eyeIcon: {
    marginLeft: -30,
  },
});