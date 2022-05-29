import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, KeyboardAvoidingView, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firebase from '../../connection/firebaseConnection';

export default function CriarAtividade({route}){

  const navigation = useNavigation();

  const [nome, setNome] = useState("");

  async function criarAluno() {
    console.log('1')
    await firebase.firestore().collection('alunos').add({
      nomeAtividade: nome,
      tipoAtividade: idade,
    }).then(() => {
      setNome('');
      setIdade('');
      console.log('Entrou no Then')
      navigation.goBack();
    }).catch((error) => {
      console.log(error);
      
      console.log('Entrou no Error')
    })

    console.log('2')
  }

  useEffect( () => {

  }, []);

  return(
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <Text style={styles.textTittle}>Crie uma atividade: </Text>
      <TextInput style={styles.input} placeholder="Digite nome da atividade" type="text" onChangeText={(text) => setNome(text)} value={nome}></TextInput>
      {
        nome === ""
        ?
        <TouchableOpacity disabled={true} style={styles.buttonLogin}>
          <Text style={styles.textButton}>Próximo</Text>
        </TouchableOpacity>
        :
        <TouchableOpacity onPress={ criarAluno } style={styles.buttonLogin} onPress={() => navigation.navigate("Escolher atividade", nome)}>
          <Text style={styles.textButton}>Próximo</Text>
        </TouchableOpacity>
      }
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
      fontSize: 38,
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
  },
  inputNumeric:{
    width: 100,
    marginTop: 10,
    padding: 10,
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#F92E6A',
    marginLeft: 'auto',
    marginRight: 'auto',
    color: '#4D5156',
    textAlign: 'center',
  },
  textTittle:{
    fontSize: 25,
    paddingBottom: 10,
    color: '#F92E6A',
    fontWeight: 'bold'
  }
})