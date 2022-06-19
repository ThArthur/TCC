import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

export default function DadosTarefas({ route }){

  const navigate = useNavigation();

  const { data } = route.params;

  return(
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: getStatusBarHeight() + 15 }]}>

        <TouchableOpacity onPress={() => navigate.goBack()}>
          <Icon name="arrow-left" size={25} color='#FFF' />
        </TouchableOpacity>

        <Text style={styles.headerTittle}>Relatório da tarefa</Text>

        
      </View>
      {
      data.task.activity_type === 'Somar ou subtrair' ? 
        <View style={styles.containerInfos}>
          <Text style={styles.titulo}>{data?.task?.nome}</Text>
          <View style={styles.linhaDado}>
              <Text style={styles.opcao}>Tipo de atividade: </Text>
              <Text style={styles.opcaoResp}>Jogo da mão</Text>
          </View>
          <View style={styles.linhaDado}>
              <Text style={styles.opcao}>Operação feita: </Text>
              <Text style={styles.opcaoResp}>{data?.task?.operacaoFeita}</Text>
          </View>
          <View style={styles.linhaDado}>
              <Text style={styles.opcao}>Resultado da operação: </Text>
              <Text style={styles.opcaoResp}>{data?.task?.resultadoDaOperacao}</Text>
          </View>
          <View style={styles.linhaDado}>
              <Text style={styles.opcao}>Resultado colocado: </Text>
              <Text style={styles.opcaoResp}>{data?.task?.resultadoColocado}</Text>
          </View>
          <View style={styles.linhaDado}>
              <Text style={styles.opcao}>Status da atividade: </Text>
              <Text style={styles.opcaoResp}>{data?.task?.acertouQuestao}</Text>
          </View>
        </View>

        :

        data.task.activity_type === 'Conte as figuras' ?
        <View style={styles.containerInfos}>
          <Text style={styles.titulo}>{data?.task?.nome}</Text>
          <View style={styles.linhaDado}>
              <Text style={styles.opcao}>Tipo de atividade: </Text>
              <Text style={styles.opcaoResp}>Conte as figuras</Text>
          </View>
          <View style={styles.linhaDado}>
              <Text style={styles.opcao}>Quantidade total de figuras: </Text>
              <Text style={styles.opcaoResp}>{data?.task?.quantidadeCerta}</Text>
          </View>
          <View style={styles.linhaDado}>
              <Text style={styles.opcao}>Quantidade respondida: </Text>
              <Text style={styles.opcaoResp}>{data?.task?.quantidadeRespondida}</Text>
          </View><View style={styles.linhaDado}>
              <Text style={styles.opcao}>Status da atividade: </Text>
              <Text style={styles.opcaoResp}>{data?.task?.acertouQuestao}</Text>
          </View>
        </View>

        :

        <View style={styles.containerInfos}>
          <Text style={styles.titulo}>{data?.task?.nome}</Text>
          <View style={styles.linhaDado}>
              <Text style={styles.opcao}>Tipo de atividade: </Text>
              <Text style={styles.opcaoResp}>Jogo do Baú</Text>
          </View>
          <View style={styles.linhaDado}>
              <Text style={styles.opcao}>Quantidade pedida: </Text>
              <Text style={styles.opcaoResp}>{data?.task?.quantidadePedida}</Text>
          </View>
          <View style={styles.linhaDado}>
              <Text style={styles.opcao}>Quantidade colocada: </Text>
              <Text style={styles.opcaoResp}>{data?.task?.quantidadeColocada}</Text>
          </View>
          <View style={styles.linhaDado}>
              <Text style={styles.opcao}>Status da atividade: </Text>
              <Text style={styles.opcaoResp}>{data?.task?.acertouQuestao}</Text>
          </View>
        </View>
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
      fontSize: 35,
      paddingTop: 10,
      paddingBottom: 10,
      color: '#F92E6A',
      fontWeight: 'bold',
      paddingLeft: 35,
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
  opcaoResp:{
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold'
  },
  header:{
    flexDirection: 'row',
    paddingHorizontal: 25,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 25,
    backgroundColor: "#F92E6A",
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
  },
  headerTittle:{
    color: '#FFF',
    fontSize: 25,
    fontWeight: 'bold'
  },
})