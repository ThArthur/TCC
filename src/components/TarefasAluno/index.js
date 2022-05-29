import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';


export default function TarefasAluno(props){
    
  const navigation = useNavigation();

  return(
    <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('Relatório')} >
        <Text style={styles.textAluno}>{props.tarefa}</Text>
        <Text style={styles.textAlunoData}>{props.dataTarefa}</Text>
        <FontAwesome style={styles.svg} name='caret-right' size={35} color="#F92E6A"/>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    container:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: .5,
        height: 50,
        justifyContent: 'space-between'
    },
    textAluno:{
        fontSize: 20,
        paddingLeft: 20,
        fontWeight: 'bold',
        color: 'black'
    },
    svg:{
        paddingRight: 20,        
    },
})