import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';

import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import Aluno from '../../components/Aluno';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import { AuthContext, useAuth } from '../../context/auth';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Icon from 'react-native-vector-icons/Feather';

export default function Home(){

  const navigation = useNavigation();

  const { handleLogoutAccount } = useContext(AuthContext)
  const user  = useAuth();

  const [isEmpty, setIsEmpty] = useState(false);
  const [alunos, setAlunos] = useState([])

  async function handleLogoutAccounts() {
    try {
      await handleLogoutAccount()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const subscriber = firestore()
    .collection('user')
    .doc(user.uid).collection('alunos')
    .orderBy('created_at', 'asc')
    .onSnapshot(query => {
      const listStudents = []
      query.forEach(response => {
        listStudents.push({
          id: response.id,
          ...response.data()
        })
      })
      setAlunos(listStudents);
    })

    return () => subscriber();
  }, [])
  
  return(
    <View style={styles.container}>

      <View style={[styles.header, { paddingTop: getStatusBarHeight() + 15 }]}>
        <Text style={styles.headerTittle}>Lista de alunos</Text>

        <TouchableOpacity onPress={handleLogoutAccounts}>
          <Icon name="log-out" size={25} color='#FFF' />
        </TouchableOpacity>
      </View>

      {alunos.length > 0 ?
        <FlatList
        data={alunos}
        contentContainerStyle={{marginTop: 10}}
        renderItem={ ({item}) => <Aluno data={item}/> }
        /> :
        <View style={styles.studentAlready}>
          <Icon name='archive' size={100} color='#e5e5e5'/>

          <Text style={styles.studentCreateText}>
            Nenhum aluno ainda criado!{'\n'}
           
            <Text 
            onPress={() => navigation.navigate('Criar aluno')}
            style={{ 
              color: '#F92E6A',
              fontSize: 20,
              textDecorationLine: 'underline',
              fontWeight: '500'
            }}>Criar agora um aluno agora!</Text>

          </Text>

        </View>
      }

      <View style={styles.button}>
        <TouchableOpacity style={styles.svg} onPress={() => navigation.navigate('Criar aluno')}>
          <Icon name='plus' size={25} color="#FFFFFF"/>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    display: 'flex',
    flex: 1,
    backgroundColor: '#faf9f9'
  },
  button:{
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    marginRight: 20,
    bottom: 0,
    right: 0,
    marginBottom: 20,
  },
  svg:{
    backgroundColor: '#F92E6A',
    height: 65,
    width: 65,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 35
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
  }
})