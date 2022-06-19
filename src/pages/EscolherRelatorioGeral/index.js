import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

export default function EscolherRelatorioGeral({route}){

    const navigation = useNavigation();

  const {
    data
  } = route.params;

  async function proximaPaginaJogoConteFigura(){
    var relatorioGeral = 'Conte as figuras';
    navigation.navigate('Relatório Geral', { data, relatorioGeral });
  }

  async function proximaPaginaJogoSS(){
    var relatorioGeral = 'Somar ou subtrair';
    navigation.navigate('Relatório Geral', { data, relatorioGeral });
  }

  async function proximaPaginaJogoBau(){
    var relatorioGeral = 'Colocar item no baú';
    navigation.navigate('Relatório Geral', { data, relatorioGeral });
  }

  return(
    <View style={styles.container}>
        <View style={[styles.header, { paddingTop: getStatusBarHeight() + 15 }]}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name="arrow-left" size={25} color='#FFF' />
            </TouchableOpacity>

            <Text style={styles.headerTittle}>Escolher atividade</Text>
            
        </View>

        <TouchableOpacity style={styles.button} onPress={() => proximaPaginaJogoSS()}>
            <Text style={styles.textButton}>Somar ou subtrair</Text>
            <Icon name="arrow-right" size={25} color='#000' />
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => proximaPaginaJogoBau()}>
            <Text style={styles.textButton}>Jogo do baú</Text>
            <Icon name="arrow-right" size={25} color='#000' />
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => proximaPaginaJogoConteFigura()}>
            <Text style={styles.textButton}>Conte as figuras</Text>
            <Icon name="arrow-right" size={25} color='#000' />
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    display: 'flex',
    flex: 1,
  },
  header:{
    flexDirection: 'row',
    paddingHorizontal: 25,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 25,
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
  studentAlready:{
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  studentCreateText:{
    fontSize: 25,
    color: '#3333',
    fontWeight: 'bold',
    textAlign: 'left',
    paddingHorizontal: 10,
  },
  button:{
    marginBottom: 20,
    padding: 20,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  textButton:{
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 15,
  }
})