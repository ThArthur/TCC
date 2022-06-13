import React, { createContext, useState, useContext, useEffect } from 'react';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-community/async-storage';

export const AuthContext = createContext({});

export function AuthProvider({ children }){ 
    const [user, setUser] = useState(null); 

    async function handleLogoutAccount() {
        await auth().signOut().then(async() => {
            setUser(null);
            await AsyncStorage.removeItem('@tcc:accounts');
        })
    }

    async function handleRegisterAccounts(email, password, name) {
        await auth().createUserWithEmailAndPassword(email, password)
        .then(async (userCredential) => {
            
            const uid = userCredential.user.uid;

            await firestore().collection('user')
            .doc(uid).set({
                name: name
            }).then(() => {
                let data = {
                    uid,
                    name: name,
                    email
                }

                setUser(data);
                storageData(data)
            })
            
        }).catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
        });
    }
    
    async function handleSignInAccount(email, password) {
        await auth().signInWithEmailAndPassword(email, password)
        .then(async (userCredential) => {
            const userProfile = await firestore().collection('user')
            .doc(userCredential.user.uid).get();

            let data = {
                uid: userCredential.user.uid,
                name: userProfile.data().name,
                email: userCredential.user.email.trim(),
            };
            storageData(data);
            setUser(data);
        })
    }

    async function storageData(data) {
        await AsyncStorage.setItem('@tcc:accounts', JSON.stringify(data))
    }

    useEffect(() => {
        async function loadData() {
            const storageUser = await AsyncStorage.getItem('@tcc:accounts');

            if(storageUser) {
                setUser(JSON.parse(storageUser));
            }
        }
        loadData();
    }, [])

  return (
    <AuthContext.Provider value={{
        signed: !!user,
        user,
        handleRegisterAccounts,
        handleSignInAccount,
        handleLogoutAccount
    }}>
        { children }
    </AuthContext.Provider>
  );
}

export function useAuth() {
    const { user } = useContext(AuthContext);

    return user;
}