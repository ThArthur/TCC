import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import moment from 'moment';


export default function Aluno({ data }){
    
  const navigation = useNavigation();
  
  function handleNavigation() {
    navigation.navigate('Dados Aluno', { data })
  }

  return(
   <RectButton onPress={handleNavigation} style={styles.container}>

        <Text style={[styles.textName, { fontSize: 20 }]}>{data?.name}</Text>

        <View style={styles.procfile}>

            <Text style={[styles.textName, { fontWeight: 'normal', color: '#3333' }]}>
                <Text style={{color: '#3333', fontWeight: 'normal'}}>Idade: </Text>
                {data?.idade}
                <Text style={{color: '#3333', fontWeight: 'normal'}}> anos</Text>
            </Text>

            <Text style={[styles.textName, { fontWeight: 'normal', color: '#3333' }]}>
                <Text style={{color: '#3333', fontWeight: 'normal'}}>Criado em: </Text>
                {moment(data?.created_at?.seconds * 1000).format('DD/MM/YYYY')}
            </Text>


        </View>
   </RectButton>
  )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#FFF',
        paddingVertical: 15,
        paddingHorizontal: 15,
        marginHorizontal: 15,
        marginBottom: 10,
    },
    procfile:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    procfileItem:{
        backgroundColor: '#023047',
        height: 50,
        width: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textName:{
        fontSize: 15,
        fontWeight: 'bold',
        color: '#023047'
    }
})