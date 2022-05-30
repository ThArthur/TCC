import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';

import { useNavigation } from '@react-navigation/native';

import TarefasAluno from '../../components/TarefasAluno';

import Feather from 'react-native-vector-icons/Feather';
import { useAuth } from '../../context/auth';

export default function HomeAluno({ route }){

  const navigation = useNavigation();

  const user = useAuth();
  const { data } = route.params;

  const [tarefas, setTarefas] = useState([]);

  useEffect(() => {
    const subscriber = firestore().collection('tarefas')
    .where('owner', '==', user?.uid)
    .where('key', '==', data?.id)
    .onSnapshot(q => {
      const listTask = [];
      q.forEach(r => {
        listTask.push({
          id: r.id,
          ...r.data()
        })
      })
      setTarefas(listTask);
    })

    return () => subscriber();
  }, [])

  return(
    <View style={styles.container}>
      <Text style={styles.alunoTitulo}>Perfil: {data?.name}</Text>

      <View style={styles.titleView}>
        <Text style={styles.tarefasTitulo}>Lista de tarefas</Text>
        <TouchableOpacity style={styles.plusButton} onPress={() => navigation.navigate("Criar atividade", { data })}>
          <Feather name='plus' size={25} color="#FFFFFF"/>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tarefas}
        renderItem={ ({item}) => <TarefasAluno data={item}/> }
        keyExtractor={item => item.id}
      />
      <TouchableOpacity style={styles.relatorioGeral} 
      onPress={() => navigation.navigate('Relatório Geral', { data: tarefas })}>
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
    fontWeight: 'bold',
    color: '#F92E6A',
  },
  titleView:{
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  plusButton:{
    height: 50,
    width: 50,
    backgroundColor: '#F92E6A',
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center'
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