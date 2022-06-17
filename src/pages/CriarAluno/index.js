import React, { useState, useEffect,  } from 'react';

import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  TextInput,
  ActivityIndicator,
  Keyboard,
  Alert,
  StatusBar
} from 'react-native';

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import { Controller, useForm } from 'react-hook-form';
import firestore from '@react-native-firebase/firestore';

import { useAuth } from '../../context/auth';

const scheme = Yup.object().shape({
  nome: Yup.string().required('Este campo deve ser obrigatório!'),
  idade: Yup.number().required('Este campo deve ser obrigatório!'),
})

export default function CriarAluno(){

  const navigation = useNavigation();
  const user = useAuth();
  
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(scheme)
  });

  async function handleCreateStudents(form) {
    setLoading(true)
    Keyboard.dismiss();
    try {
      await firestore().collection('user').doc(user.uid)
      .collection('alunos').add({
        name: form.nome,
        idade: form.idade,
        created_at: firestore.FieldValue.serverTimestamp()
      })
      
      Alert.alert(
        form.nome,
        `Aluno ${form.nome} criado com sucesso!`
      )

      navigation.goBack();

    } catch (error) {
      console.log(error)
    }
    reset();
    setLoading(false);
  }

  return(
    <View style={styles.container}>
      <View style={styles.contentItens}>
      <StatusBar barStyle={'dark-content'} />
        <Text style={styles.textTittle}>Cadastre o aluno:</Text>

        <View style={styles.inputContent}>

          <Text style={[styles.tittle, {
            fontSize: 15,
            marginBottom: 0,
            fontWeight: '500'
          }]}>Nome do aluno:</Text>

          <Controller
          name="nome"
          control={control}
          render={({ field : { onChange, value } }) => 
            <TextInput 
            style={styles.input} 
            placeholder="Ex: Vinicius, Matheus, João" 
            type="text" 
            onChangeText={onChange} 
            value={value}/>
          }
          />

          {errors.nome && 
          <Text style={styles.textError}>{errors?.nome?.message}</Text>
          }
        </View>

        <View style={[styles.inputContent, { marginTop: 10 }]}>
          
          <Text style={[styles.tittle, {
            fontSize: 15,
            marginBottom: 0,
            fontWeight: '500'
          }]}>Idade do aluno:</Text>

          <Controller
          name="idade"
          control={control}
          render={({ field : { onChange, value } }) => 
            <TextInput 
            style={styles.input} 
            placeholder="Ex: 12, 15, 17" 
            keyboardType='numeric'
            onChangeText={onChange} 
            value={value}/>
          }
          />

          {errors.idade && 
          <Text style={styles.textError}>{errors?.idade?.message}</Text>
          }

        </View>

        <TouchableOpacity 
        onPress={handleSubmit(handleCreateStudents)} 
        style={styles.buttonLogin}
        >
          {loading ?
          <ActivityIndicator size={25} color="#FFF" />
          : <Text style={styles.textButton}>Criar aluno</Text>}
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF'
  },
  contentItens: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputContent:{
    width: '80%',
  },
  tittle:{
      fontSize: 38,
      fontWeight: 'bold',
      marginBottom: 10,
      color: '#F92E6A',
  },
  input:{
      padding: 10,
      height: 50,
      borderWidth: 1,
      borderColor: '#F92E6A',
      borderRadius: 5,
      color: '#4D5156'
  },
  buttonLogin:{
    backgroundColor: '#F92E6A',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    height: 50,
    marginTop: 30,
    borderRadius: 5
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
    marginTop: 10,
    padding: 10,
    height: 50,
    borderWidth: 1,
    borderColor: '#F92E6A',
    borderRadius: 5,
    color: '#4D5156',
  },
  textTittle:{
    fontSize: 25,
    paddingBottom: 10,
    color: '#F92E6A',
    fontWeight: 'bold'
  },
  textError:{
    fontSize: 15,
    color: 'red'
  }
})