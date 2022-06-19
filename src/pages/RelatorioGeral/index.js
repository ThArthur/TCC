import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import TarefasAluno from '../../components/TarefasAluno';
import { useNavigation } from '@react-navigation/native';


export default function RelatorioGeral({route}){

  const navigation = useNavigation();

  const {
    data,
    relatorioGeral
  } = route.params;

  const [listaTarefasE, setListaTarefasE] = useState([]);

  useEffect(() => {
    const listTask = [];
    for(var i = 0; i < data.length; i++){
      if(data[i].task.activity_type == relatorioGeral){
        listTask.push({
          id: i,
          ...data[i]
        })
      }
    }

    setListaTarefasE(listTask)

    for(var i = 0; i < listaTarefasE; i++){
      if(listaTarefasE[i].task.acertouQuestao == "Certo"){
        setCerto((currentCount) => currentCount + 1);
      }
    }

    setListaTarefasE(listTask);

  }, []);

  return(
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: getStatusBarHeight() + 15 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={25} color='#FFF' />
        </TouchableOpacity>

        <Text style={styles.headerTittle}>Relatório geral</Text>
      </View>
      {listaTarefasE.length > 0 &&
      <FlatList
        data={listaTarefasE}
        contentContainerStyle={{marginTop: 10}}
        renderItem={ ({item}) => <TarefasAluno data={item}/> }
        keyExtractor={item => item.id}
      />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    display: 'flex',
    flex: 1,
  },
  titulo:{
      fontSize: 30,
      paddingTop: 10,
      paddingBottom: 10,
      color: '#F92E6A',
      fontWeight: 'bold'
  },
  linhaDado:{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: 20,
      paddingLeft: 40,
      paddingRight: 40
  },
  opcao:{
      fontSize: 20,
      color: '#000',
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
})