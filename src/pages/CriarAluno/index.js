import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';


export default function CriarAluno(){

  return(
    <View style={styles.container}>
        <View style={styles.viewInfos}>
            <Text style={styles.nomeOpcao}>Nome: </Text>
            <TextInput style={styles.input}></TextInput>
        </View>
        <View style={styles.viewInfosNum}>
            <Text style={styles.nomeOpcao}>Idade: </Text>
            <TextInput keyboardType='numeric' style={styles.inputNumber}></TextInput>
        </View>
        <View>
            <TouchableOpacity style={styles.buttonCriar}>
                <Text style={styles.textButton}>Criar</Text>
            </TouchableOpacity>
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
    paddingTop: 20
  },
  nomeOpcao:{
      fontSize: 20,
      color: '#000',
  },
  input:{
      borderBottomWidth: 2,
      paddingBottom: 5,
      fontSize: 18,
      paddingLeft: 10,
      paddingRight: 10
  },
  viewInfos:{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      marginBottom: 30,
  },
  viewInfosNum:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    justifyContent: 'space-between'
  },
  inputNumber:{
    borderBottomWidth: 2,
    paddingBottom: 0,
    width: 50,
    textAlign: 'center'
  },
  buttonCriar:{
      backgroundColor: '#3CB371',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
  }
})