import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Aluno from '../../components/Aluno';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import firebase from '../../connection/firebaseConnection';

export default function Home({route}){

  const navigation = useNavigation();

  const [isEmpty, setIsEmpty] = useState(false);

  const {idUser} = route.params;

  const [alunos, setAlunos] = useState([])

  async function loadAlunos(){
    await firebase.firestore().collection('alunos').orderBy('nome').get().then((snapshot) => {
      updateState(snapshot);
    }).catch((error) => {
      console.log(error);
    })
  }

  function logout(){
    firebase.auth().signOut().then(() => {
      navigation.navigate("Login");
    }).catch((error) => {
      console.log(error);
    });
  }

  async function updateState(snapshot){

    let lista = [];
    snapshot.forEach((doc) => {
      lista.push({
        id: doc.id,
        nome: doc.data().nome,
        idade: doc.data().idade,
      })
    });

    setAlunos(alunos => [...alunos, ...lista]);
  }

  useEffect(() => {
    loadAlunos();
  }, []);

  return(
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTittle}>Lista de alunos</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={() => logout()}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={alunos}
        renderItem={ ({item}) => (<Aluno nome={item.nome} idAluno={item.id} />) }
        keyExtractor={item => item.id}
      />
      <TouchableOpacity style={styles.plusView} onPress={() => navigation.navigate('Criar aluno', idUser)}>
        <FontAwesome style={styles.svg} name='plus' size={50} color="#FFFFFF"/>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    display: 'flex',
    flex: 1,
  },
  plusView:{
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    marginRight: 20,
    bottom: 0,
    right: 0,
    marginBottom: 20,
    width: 50,

  },
  svg:{
    backgroundColor: '#F92E6A',
    textAlign: 'center',
    borderRadius: 100
  },
  header:{
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: "#DCDCDC"
  },
  headerTittle:{
    color: '#F92E6A',
    fontSize: 25,
  },
  logoutButton:{
    borderWidth: 1,
    padding: 10,
  },
  logoutText:{
    color: '#F92E6A',
  }
})