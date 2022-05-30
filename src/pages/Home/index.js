import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';

import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import Aluno from '../../components/Aluno';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import { AuthContext, useAuth } from '../../context/auth';

export default function Home(){

  const navigation = useNavigation();

  const {handleLogoutAccount} = useContext(AuthContext)
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
      <View style={styles.header}>
        <Text style={styles.headerTittle}>Lista de alunos</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogoutAccounts}>
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={alunos}
        renderItem={ ({item}) => <Aluno data={item}/> }
      />
      <View style={styles.button}>
        <TouchableOpacity style={styles.svg} onPress={() => navigation.navigate('Criar aluno')}>
          <FontAwesome name='plus' size={25} color="#FFFFFF"/>
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
    paddingVertical: 10,
    backgroundColor: "#F92E6A"
  },
  headerTittle:{
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold'
  },
  logoutButton:{
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  logoutText:{
    color: '#FFF',
  }
})