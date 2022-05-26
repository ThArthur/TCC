import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import TarefasAluno from '../../components/TarefasAluno';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function HomeAluno(){

  const navigation = useNavigation();

  const tarefas = [
    {
      id:'1',
      tarefa: 'Tarefa 01',
      dataTarefa: '20/03/2020'
    },
    {
      id:'2',
      tarefa: 'Tarefa 02',
      dataTarefa: '21/03/2020'
    },
    {
      id:'3',
      tarefa: 'Tarefa 03',
      dataTarefa: '22/03/2020'
    },{
      id:'4',
      tarefa: 'Tarefa 04',
      dataTarefa: '23/03/2020'
    },
    {
      id:'5',
      tarefa: 'Tarefa 05',
      dataTarefa: '24/03/2020'
    },
  ]

  return(
    <View style={styles.container}>
      <View>
        <Text style={styles.tarefasTitulo}>Lista de tarefas</Text>
        <TouchableOpacity style={styles.plusView} onPress={() => {}}>
          <FontAwesome style={styles.svg} name='plus' size={40} color="#FFFF"/>
        </TouchableOpacity>
      </View>
      <FlatList
        data={tarefas}
        renderItem={ ({item}) => (<TarefasAluno tarefa={item.tarefa} dataTarefa={item.dataTarefa}/>) }
        keyExtractor={item => item.id}
      />
      <TouchableOpacity style={styles.relatorioGeral} onPress={() => navigation.navigate('Relatório Geral')}>
        <Text style={styles.textGerarRelatorio}>Gerar Relatório Geral</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    display: 'flex',
    flex: 1,
  },
  tarefasTitulo:{
    fontSize: 30,
    paddingLeft: 20,
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 2,
    fontWeight: 'bold',
    color: '#0000FF',
  },
  plusView:{
    position: 'absolute',
    marginRight: 20,
    bottom: 0,
    right: 0,
    marginBottom: 20,
    width: 40,

  },
  svg:{
    backgroundColor: '#0000FF',
    textAlign: 'center',
    borderRadius: 100
  },
  relatorioGeral:{
    backgroundColor: '#3CB371',
    marginLeft: 40,
    marginRight: 40,
    display: 'flex',
    alignItems: 'center',
    marginBottom: 20,
    height: 50,
    justifyContent: 'center',
    borderRadius: 10
  },
  textGerarRelatorio:{
    fontSize: 20,
    color: '#000',
  }
})