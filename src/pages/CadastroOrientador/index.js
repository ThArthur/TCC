import React, { useState, useContext  } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, KeyboardAvoidingView, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/auth';

export default function CadastroOrientador(){

  const { handleRegisterAccounts } = useContext(AuthContext);

  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  async function handleCreateAccount() {
    try {
      handleRegisterAccounts(email, password, name);
    } catch (error) {
      console.log(error)
    }
  }

  return(
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <Text style={styles.tittle}>Cadastrar conta</Text>
      
      <TextInput 
      style={styles.input} 
      placeholder="Digite seu nome" 
      type="text" 
      onChangeText={setName} 
      value={name}/>
      
      <TextInput 
      style={styles.input} 
      placeholder="Digite seu email" 
      type="text" 
      onChangeText={(text) => setEmail(text)} 
      value={email}/>
      
      <TextInput 
      secureTextEntry={true} 
      style={styles.input} 
      placeholder="Digite sua senha" 
      type="password" 
      onChangeText={(text) => setPassword(text)} 
      value={password}
      />
  
      {
        email === "" || password === "" 
        ?
        <TouchableOpacity disabled={true} style={styles.buttonLogin}>
          <Text style={styles.textButton}>Entrar</Text>
        </TouchableOpacity>
        :
        <TouchableOpacity onPress={handleCreateAccount} style={styles.buttonLogin}>
          <Text style={styles.textButton}>Entrar</Text>
        </TouchableOpacity>
      }
      <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.buttonCriarConta}>
          <Text style={styles.textButtonCadastro}>Já tem uma conta? Login...</Text>
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
  }
})