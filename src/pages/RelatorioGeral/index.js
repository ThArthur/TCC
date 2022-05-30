import React from 'react';
import { StyleSheet, View, Text } from 'react-native';


export default function RelatorioGeral({route}){

  const {
    data
  } = route.params;

  function totalAcertos() {
    let acertos = 0;
    let tentativas = 0;
    let erros = 0;
    for(let i = 0; i < data.length; i++) {
      acertos += data[i]?.task?.acertos;
      tentativas += data[i]?.task?.tentativas;
      erros += data[i]?.task?.erros;
    }

    return { acertos, tentativas, erros }
  }


  const tarefas = 
    {
      tentativas: totalAcertos().tentativas,
      acertos: totalAcertos().acertos,
      erros: totalAcertos().erros,
      acertoPorc: '65%',
      erroPorc: '35%',
    }

  return(
    <View style={styles.container}>
        <Text style={styles.titulo}>Relatório geral</Text>
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
  }
})