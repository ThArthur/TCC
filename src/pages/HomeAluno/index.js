import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, StatusBar } from 'react-native';
import firestore from '@react-native-firebase/firestore';

import { useNavigation } from '@react-navigation/native';

import TarefasAluno from '../../components/TarefasAluno';

import Feather from 'react-native-vector-icons/Feather';
import { useAuth } from '../../context/auth';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { RectButton } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';

export default function HomeAluno({ route }){

  const navigation = useNavigation();

  const user = useAuth();
  const { data } = route.params;

  const [tarefas, setTarefas] = useState([]);

  const plural = tarefas.length > 1 ? 'atividades' : tarefas.length == 0 ? 'nenhuma' : 'atividade'

  function handleGoBack() {
    navigation.goBack()
  }

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
      <StatusBar barStyle={'light-content'} />

      <View style={[styles.header, { paddingTop: getStatusBarHeight() + 15 }]}>
        <RectButton onPress={handleGoBack}>
          <Icon name="arrow-left" size={25} color="#FFF" />
        </RectButton>
        <Text style={styles.textHeaderStudent}>{data?.name}</Text>
      </View>

      <View style={styles.headerFlatlist}>
          <Text style={styles.textHeaderFlatList}>Este aluno contém {tarefas.length} {plural}!</Text>
      </View>

      {tarefas.length > 0 &&
      <FlatList
        data={tarefas}
        contentContainerStyle={{marginTop: 10}}
        renderItem={ ({item}) => <TarefasAluno data={item}/> }
        keyExtractor={item => item.id}
      />
      }

      <View style={styles.buttons}>
        <TouchableOpacity 
        style={styles.relatorioGeral} 
        onPress={() => navigation.navigate('Relatório Geral', { data: tarefas })}
        >
          <Text style={styles.textGerarRelatorio}>Relatório Geral</Text>
        </TouchableOpacity>

        <TouchableOpacity 
        style={[styles.relatorioGeral, { marginLeft: 15, backgroundColor: '#06d6a0' }]} 
        onPress={() => navigation.navigate('Criar atividade', { data })}
        >
          <Text style={styles.textGerarRelatorio}>Criar atividade</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    display: 'flex',
    flex: 1,
  },
  tarefasTitulo:{
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F92E6A',
  },
  titleView:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
    paddingHorizontal: 15,
  },
  plusButton:{
    backgroundColor: '#F92E6A',
    padding: 5,
    borderRadius: 2,
  },
  textAtivity:{
    fontSize: 17,
    fontWeight: '500',
    color: "#FFF",
  },
  buttons:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  relatorioGeral:{
    backgroundColor: '#F92E6A',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: '45%',
  },
  textGerarRelatorio:{
    fontSize: 17,
    color: '#FFF',
    fontWeight: 'bold',
  },
  header:{
    backgroundColor: '#F92E6A',
    paddingBottom: 15,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center'
  },
  textHeaderStudent:{
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    marginLeft: 15,
  },
  headerFlatlist:{
    paddingHorizontal: 15,
    marginTop: 15,
  },
  textHeaderFlatList:{
    fontSize: 15,
    fontWeight: '500',
    color: '#3333'
  }
})