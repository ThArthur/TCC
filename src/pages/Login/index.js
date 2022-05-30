import React, { useState, useEffect, useContext } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  TextInput,
  ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/auth';

export default function Login(){

  const { handleSignInAccount } = useContext(AuthContext)
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignInAccounts() {
    setLoading(true)
    try {
      await handleSignInAccount(email, password)
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  }

  return(
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <Text style={styles.tittle}>My Math</Text>
      <TextInput style={styles.input} placeholder="Digite seu email" type="text" onChangeText={(text) => setEmail(text)} value={email}></TextInput>
      <TextInput secureTextEntry={true} style={styles.input} placeholder="Digite sua senha" type="password" onChangeText={(text) => setPassword(text)} value={password}></TextInput>

      <TouchableOpacity 
      onPress={handleSignInAccounts}
      disabled={email.length <= 0 || password.length <= 0} 
      style={[styles.buttonLogin, {
        backgroundColor: email.length <= 0 || password.length <= 0 ? 'rgba(249, 46, 106, 0.5)' : '#F92E6A' 
      }]}
      >
        {loading ?
         <ActivityIndicator size={25} color='#FFF' />
        : <Text style={styles.textButton}>Entrar</Text>}
      </TouchableOpacity>

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