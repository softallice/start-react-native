import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';

import * as LocalAuthentication from 'expo-local-authentication';

export default function BioAuthScreen() {
  const [supported, setSupported] = useState(null)
  const [nome, setNome] = useState('não logado')

  useEffect(() => {
    LocalAuthentication.hasHardwareAsync()
    .then(sucesso => {
      setSupported(true)
      console.log('Touch ID habilitado')
    })
    .catch((error) => {
      console.log("Erro TOUCH: " + error)
      alert('Touch ID nao suportado/habilitado')
    })
  }, [])

  function handleLogin(){
    LocalAuthentication.authenticateAsync("Login App")
    .then( sucess => {
      console.log('Seja bem vindo')
      setNome('logado')
    })
    .catch(error => {
      console.log('Falha na autenticacao: ' + error)
    })
  }

  return (
    <View style={styles.container}>
      <TouchableHighlight style={styles.btn} onPress={ handleLogin }>
        <Text style={{color: '#FFF', fontWeight: 'bold' }}>Entrar</Text>
      </TouchableHighlight>

      <Text style={{fontSize: 30, fontWeight: 'bold'}}>{nome}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    borderRadius: 3,
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#0391D7'
  }
});