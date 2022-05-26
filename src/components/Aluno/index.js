import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';


import { useNavigation } from '@react-navigation/native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';


export default function Aluno(props){
    
  const navigation = useNavigation();

  return(
    <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('Dados Aluno')} >
        <Text style={styles.textAluno}>{props.nome}</Text>
        <FontAwesome style={styles.svg} name='caret-right' size={35} color="#0000FF"/>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    container:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 2,
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
    }
})