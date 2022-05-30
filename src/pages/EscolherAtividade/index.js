import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  Image,
  ScrollView,
  Alert
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { useAuth } from '../../context/auth';

export default function EscolherAtividade({route}){

  const navigation = useNavigation();
  const user = useAuth();
  
  const {
    data,
    nome
  } = route.params;
  
  const [gameSelected, setGameSelected] = useState('mao');

  async function handleCreateTask() {
    try {
      await firestore().collection('tarefas')
      .add({
        student: data?.name,
        owner: user?.uid,
        key: data?.id,
        task:{
          nome,
          activity_type: gameSelected,
          tentativas: 0,
          acertos: 0,
          erros: 0
        },
        created_at: firestore.FieldValue.serverTimestamp()
      })

      Alert.alert(
        "Tarefa "+ nome,
        "Sua tarefa foi criada com sucesso!"
      )

      navigation.goBack();

    } catch (error) {
      console.log(error)
    }
  }

  return(
    <View style={styles.container}>
      <ScrollView
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

                <Text style={styles.title}>Jogo da Sequência</Text>
                <Text style={styles.description}>
                  Jogo da Sequência consiste em arrastar as 
                  figuras de acordo com a sequência
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