import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  Image,
  ScrollView,
  Alert,
  StatusBar
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { useAuth } from '../../context/auth';
import { getStatusBarHeight } from 'react-native-status-bar-height';

export default function EscolherAtividade({route}){

  const navigation = useNavigation();
  const user = useAuth();
  
  const {
    data,
    nome
  } = route.params;
  
  const [gameSelected, setGameSelected] = useState('mao');

  async function handleCreateTask() {
    if(gameSelected === 'mao'){
      navigation.navigate('Jogo Mao', {data, nome});
    }
    if(gameSelected === 'bau'){
      
      navigation.navigate('Jogo Bau', {data, nome});

    }
    if(gameSelected === 'sequencia'){
      navigation.navigate('Game Arrastar', {data, nome});
    }
    
  }

  return(
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' />
      <ScrollView
          contentContainerStyle={{paddingTop: getStatusBarHeight() + 15}}
          showsVerticalScrollIndicator={false}
      >
        <Text style={styles.textTittle}>Escolha a atividade:</Text>

        <View style={{
          width: '100%', 
          paddingBottom: 50, 
          marginTop: 10
          }}>
          <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{alignItems: 'center'}}
          >

            <TouchableOpacity 
            onPress={() => setGameSelected('mao')}
            style={[styles.gameContent, {
              borderWidth: gameSelected === 'mao' ? 2 : 0,
              borderColor: '#F92E6A'
            }]}>
                <Image 
                resizeMode='contain'
                style={styles.image} 
                source={require('../../assets/jogoMao.png')} 
                />

                <Text style={styles.title}>Jogo da Soma e Subtração</Text>

                <Text style={styles.description}>
                  Jogo da Soma e Subtração consiste em acertar a quantidade informado pela figura
                </Text>

            </TouchableOpacity>

            <TouchableOpacity 
            onPress={() => setGameSelected('bau')}
            style={[styles.gameContent, {
              borderWidth: gameSelected === 'bau' ? 2 : 0,
              borderColor: '#F92E6A'
            }]}>
                
                <Image 
                resizeMode='contain'
                style={styles.image} 
                source={require('../../assets/jogoBau.png')} 
                />

                <Text style={styles.title}>Jogo do Baú</Text>
                <Text style={styles.description}>
                  Jogo do Baú consiste em arrastar uma 
                  quantidade de figuras dentro do baú 
                  conforme a pergunta!
                </Text>

            </TouchableOpacity>

            <TouchableOpacity 
            onPress={() => setGameSelected('sequencia')}
            style={[styles.gameContent, {
              borderWidth: gameSelected === 'sequencia' ? 2 : 0,
              borderColor: '#F92E6A'
            }]}>
                <Image 
                resizeMode='contain'
                style={styles.image} 
                source={require('../../assets/jogoSequencia.png')} 
                />  

                <Text style={styles.title}>Jogo da Contagem</Text>
                <Text style={styles.description}>
                  Jogo da Sequência consiste em contar quantas figuras tem e clicar na resposta correspondente!
                </Text>

            </TouchableOpacity>

          </ScrollView>
        </View>
      </ScrollView>

      <TouchableOpacity onPress={handleCreateTask} style={styles.buttonLogin} >
        <Text style={styles.textButton}>Próximo</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#faf9f9',
    alignItems: 'center'
  },
  textTittle:{
    fontSize: 25,
    color: '#F92E6A',
    fontWeight: 'bold'
  },
  description:{
    fontSize: 15,
    textAlign: 'left',
    marginTop: 5,
  },
  title:{
    fontSize: 20,
    fontWeight: 'bold'
  },
  image:{
      height: 100,
      width: 100,
  },
  gameContent:{
    backgroundColor: '#FFF',
    marginBottom: 15,
    paddingTop: 25,
    shadowColor: '#000',
    elevation: 5,
    borderRadius: 5,
    paddingVertical: 25,
    paddingHorizontal: 15,
    width: '90%',
    alignItems: 'center'
  },
  ImageTittle:{
      display: 'flex',
      alignItems: 'center',
  },
  buttonLogin:{
    backgroundColor: '#F92E6A',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    height: 50,
    marginVertical: 15,
    borderRadius: 5
    },
  textButton:{
      fontSize: 20,
      color: '#FFFFFF',
  },
})