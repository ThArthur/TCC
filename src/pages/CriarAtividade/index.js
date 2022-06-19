import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, KeyboardAvoidingView, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { getStatusBarHeight } from 'react-native-status-bar-height';

export default function CriarAtividade({route}){

  const navigation = useNavigation();

  const [nome, setNome] = useState('');
  const { data } = route.params;

  return(
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <View style={[styles.header, { paddingTop: getStatusBarHeight() + 15 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={25} color='#FFF' />
        </TouchableOpacity>

        <Text style={styles.headerTittle}>Relatório geral</Text>
      </View>
      <View style={styles.viewPrincipal}>
        <Text style={styles.textTittle}>Crie uma atividade: </Text>
        
        <TextInput 
          style={styles.input} 
          placeholder="Digite nome da atividade" 
          type="text" 
          onChangeText={setNome} 
          value={nome}
        />

        {nome.length <= 0 &&
          <Text 
          style={styles.textError}
          >Digite um nome para criar uma tarefa!</Text>
        }

        <TouchableOpacity style={[styles.buttonLogin, {
          backgroundColor: nome.length <= 0 ? 'rgba(249, 46, 106, 0.5)' : '#F92E6A'
        }]}
        disabled={nome.length <= 0}
        onPress={() => navigation.navigate("Escolher atividade", { data, nome })}>
          <Text style={styles.textButton}>Próximo</Text>
        </TouchableOpacity>
        
        <View style={{height: 100}}/>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container:{
    display: 'flex',
    flex: 1,
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
  },
  textError:{
    color: 'red',
    fontSize: 15,
    marginTop: 5
  },
  header:{
    flexDirection: 'row',
    paddingHorizontal: 25,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 15,
    backgroundColor: "#F92E6A",
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
    marginBottom: 20
  },
  headerTittle:{
    color: '#FFF',
    fontSize: 25,
    fontWeight: 'bold',
    paddingLeft: 20
  },
  viewPrincipal:{
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center'
  }
})