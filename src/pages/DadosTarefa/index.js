import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';

import TarefasAluno from '../../components/TarefasAluno';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function DadosTarefas(){

  const tarefas = 
    {
      tentativas: '10',
      acertos: '7',
      erros: '3',
      acertoPorc: '70%',
      erroPorc: '30%',
    }

  return(
    <View style={styles.container}>
        <Text style={styles.titulo}>Tarefa 01</Text>
        <View style={styles.linhaDado}>
            <Text style={styles.opcao}>Tentativas: </Text>
            <Text style={styles.opcao}>{tarefas.tentativas}</Text>
        </View>
        <View style={styles.linhaDado}>
            <Text style={styles.opcao}>Acertos: </Text>
            <Text style={styles.opcao}>{tarefas.acertos}</Text>
        </View>
        <View style={styles.linhaDado}>
            <Text style={styles.opcao}>Erros: </Text>
            <Text style={styles.opcao}>{tarefas.erros}</Text>
        </View>
        <View style={styles.linhaDado}>
            <Text style={styles.opcao}>Acertos(%): </Text>
            <Text style={styles.opcao}>{tarefas.acertoPorc}</Text>
        </View>
        <View style={styles.linhaDado}>
            <Text style={styles.opcao}>Erros(%): </Text>
            <Text style={styles.opcao}>{tarefas.erroPorc}</Text>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    display: 'flex',
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
  },
  titulo:{
      fontSize: 30,
      paddingTop: 10,
      paddingBottom: 10,
      color: '#0000FF',
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
  }
})