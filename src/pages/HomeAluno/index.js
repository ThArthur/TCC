import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import firebase from '../../connection/firebaseConnection';

import { useNavigation } from '@react-navigation/native';

import TarefasAluno from '../../components/TarefasAluno';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function HomeAluno({route}){

  const navigation = useNavigation();

  const [tarefas, setTarefas] = useState([
    {
      id: 1,
      nome: 'Tarefa 01',
      data: '21/03/2022',
    },{
      id: 2,
      nome: 'Tarefa 02',
      data: '21/03/2022',
    },{
      id: 3,
      nome: 'Tarefa 03',
      data: '21/03/2022',
    },{
      id: 4,
      nome: 'Tarefa 04',
      data: '21/03/2022',
    },{
      id: 5,
      nome: 'Tarefa 05',
      data: '21/03/2022',
    },{
      id: 6,
      nome: 'Tarefa 06',
      data: '21/03/2022',
    },{
      id: 7,
      nome: 'Tarefa 07',
      data: '21/03/2022',
    },
  ]);


  return(
    <View style={styles.container}>
      <Text style={styles.alunoTitulo}>Perfil: Amanda</Text>
      <View>
        <Text style={styles.tarefasTitulo}>Lista de tarefas</Text>
        <TouchableOpacity style={styles.plusView} onPress={() => navigation.navigate("Criar atividade")}>
          <FontAwesome style={styles.svg} name='plus' size={40} color="#FFFFFF"/>
        </TouchableOpacity>
      </View>
      <FlatList
        data={tarefas}
        renderItem={ ({item}) => (<TarefasAluno tarefa={item.nome} dataTarefa={item.data}/>) }
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
    borderBottomWidth: 1,
    fontWeight: 'bold',
    color: '#F92E6A',
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
    backgroundColor: '#F92E6A',
    textAlign: 'center',
    borderRadius: 100
  },
  relatorioGeral:{
    borderWidth: 2,
    borderColor: '#F92E6A',
    marginLeft: 40,
    marginRight: 40,
    display: 'flex',
    alignItems: 'center',
    marginBottom: 20,
    height: 50,
    justifyContent: 'center',
    borderRadius: 10,
  },
  textGerarRelatorio:{
    fontSize: 20,
    color: '#000000',
  },
  alunoTitulo:{
    fontSize: 20,
    marginLeft: 20,
    marginRight: 20,
    paddingTop: 20,
    color: '#000000',
  }
})