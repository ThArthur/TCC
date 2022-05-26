import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import Aluno from '../../components/Aluno';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function Home(){

  const navigation = useNavigation();

  const alunos = [
    {
      id:'1',
      nome: 'João'
    },
    {
      id:'2',
      nome: 'Arthur'
    },
    {
      id:'3',
      nome: 'Vitor'
    },{
      id:'4',
      nome: 'João'
    },
    {
      id:'5',
      nome: 'João'
    },
  ]

  return(
    <View style={styles.container}>
      <FlatList
        data={alunos}
        renderItem={ ({item}) => (<Aluno nome={item.nome}/>) }
        keyExtractor={item => item.id}
      />
      <TouchableOpacity style={styles.plusView} onPress={() => navigation.navigate('Criar aluno')}>
        <FontAwesome style={styles.svg} name='plus' size={50} color="#FFFF"/>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    display: 'flex',
    flex: 1,
  },
  plusView:{
    position: 'absolute',
    marginRight: 20,
    bottom: 0,
    right: 0,
    marginBottom: 20,
    width: 50,

  },
  svg:{
    backgroundColor: '#0000FF',
    textAlign: 'center',
    borderRadius: 100
  }
})