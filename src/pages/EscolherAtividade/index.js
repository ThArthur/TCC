import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, KeyboardAvoidingView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firebase from '../../connection/firebaseConnection';
import jogoMao from '../../assets/jogoMao.png';
import jogoBau from '../../assets/jogoBau.png';
import jogoSequencia from '../../assets/jogoSequencia.png';

export default function EscolherAtividade({route}){

  const navigation = useNavigation();

  const [selecionadoUm, setSelecionadoUm] = useState(false);

  

  return(
    <View style={styles.container}>
        <Text style={styles.textTittle}>Escolha a atividade:</Text>
        <View style={styles.ImageTittle}>
            <TouchableOpacity style={styles.imageSelect }>
                <Image style={styles.image} source={jogoMao} />
            </TouchableOpacity>
            <TouchableOpacity>
                <Image style={styles.image} source={jogoBau} />
            </TouchableOpacity>
            <TouchableOpacity>
                <Image style={styles.image} source={jogoSequencia} />  
            </TouchableOpacity>
        </View>
        {
        selecionadoUm === ""
        ?
        <TouchableOpacity disabled={true} style={styles.buttonLogin}>
          <Text style={styles.textButton}>Próximo</Text>
        </TouchableOpacity>
        :
        <TouchableOpacity style={styles.buttonLogin} >
          <Text style={styles.textButton}>Próximo</Text>
        </TouchableOpacity>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    display: 'flex',
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    paddingLeft: 20,
    paddingTop: 20,
  },
  textTittle:{
    fontSize: 25,
    paddingBottom: 10,
    color: '#F92E6A',
    fontWeight: 'bold'
  },
  image:{
      height: 150,
      resizeMode: 'contain'
  },
  imageSelect:{
    borderWidth: 1,

  },
  ImageTittle:{
      display: 'flex',
      alignItems: 'center',
  },
  buttonLogin:{
    backgroundColor: '#F92E6A',
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    height: 50,
    marginTop: 30,
    borderRadius: 50
    },

    textButton:{
        fontSize: 20,
        color: '#FFFFFF',
    },
})