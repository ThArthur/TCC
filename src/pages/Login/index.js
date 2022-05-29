import React, { useState, useEffect,  } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, KeyboardAvoidingView, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firebase from '../../connection/firebaseConnection';

export default function Login(){

  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginFirebase = () => {
    firebase.auth().signInWithEmailAndPassword(email, password).then((userCredential) => {
      
      let user = userCredential.user;
      navigation.navigate("Lista de alunos", { idUser: user.uid })
      
    }).catch((error) => {
      let errorCode = error.code;
      let errorMessage = error.message;
    });
  }

  useEffect( () => {

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("Lista de alunos", { idUser: user.uid });
      }
    });

  }, []);

  return(
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <Text style={styles.tittle}>My Math</Text>
      <TextInput style={styles.input} placeholder="Digite seu email" type="text" onChangeText={(text) => setEmail(text)} value={email}></TextInput>
      <TextInput secureTextEntry={true} style={styles.input} placeholder="Digite sua senha" type="password" onChangeText={(text) => setPassword(text)} value={password}></TextInput>
  
      {
        email === "" || password === "" 
        ?
        <TouchableOpacity disabled={true} style={styles.buttonLogin}>
          <Text style={styles.textButton}>Entrar</Text>
        </TouchableOpacity>
        :
        <TouchableOpacity onPress={ loginFirebase } style={styles.buttonLogin}>
          <Text style={styles.textButton}>Entrar</Text>
        </TouchableOpacity>
      }
      <TouchableOpacity onPress={() => navigation.navigate('Cadastro Orientador')} style={styles.buttonCriarConta}>
          <Text style={styles.textButtonCadastro}>Não tem uma conta? Cadastre-se</Text>
      </TouchableOpacity>
      <View style={{height: 100}}/>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container:{
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  },
  tittle:{
      fontSize: 48,
      fontWeight: 'bold',
      marginBottom: 10,
      color: '#F92E6A',
  },
  input:{
      width: 300,
      marginTop: 10,
      padding: 10,
      height: 50,
      borderBottomWidth: 1,
      borderBottomColor: '#F92E6A',
      marginLeft: 'auto',
      marginRight: 'auto',
      color: '#4D5156'
  },
  buttonLogin:{
    backgroundColor: '#F92E6A',
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    height: 50,
    marginTop: 30,
    borderRadius: 50
},
  buttonCriarConta:{

  },
  textButton:{
      fontSize: 20,
      color: '#FFFFFF'
  },
  textButtonCadastro:{
    marginTop: 20,
    fontSize: 16,
    color: '#000000'
  }
})