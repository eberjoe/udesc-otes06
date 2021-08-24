import React, { useState } from 'react';
import { TextInput, StyleSheet, View, TouchableOpacity, Alert } from 'react-native';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import { MaterialIcons } from '@expo/vector-icons';
import db from '../services/db';

const Home = ({ navigation }) => {
  const [name, setName] = useState('');

  const identification = async () => {
    if (!name) {
      showMessage({
        message: 'Entre um nome!',
        type: 'danger'
      });
    } else {
      const user = await (await db.get(`/fetch-user/${name}`)).data;
      if (user) {
        showMessage({
          message: `Bem vindo, ${name}!`,
          type: 'info'
        });
        setTimeout(() => {
          navigation.navigate('Chosen', {
            user: name
          });
        }, 2000);
      } else {
        const newUser = await db.post('/create-user', {
          name: name
        });
        if (newUser) {
          showMessage({
            message: `Usuário ${name} criado com sucesso!`,
            type: 'success'
          });
          setTimeout(() => {
            navigation.navigate('Asteroids', {
              user: name
            });
          }, 2000);
        }
      }
    }
  }

  return (
    <View style={style.nameForm}>
      <TextInput
          style={style.nameInput}
          placeholder="Insira seu nome..."
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
          value={name}
          onChangeText={setName}
      />
      <TouchableOpacity onPress={identification} style={style.loadButton}>
        <MaterialIcons name="send" size={20} color="#FFF" />
      </TouchableOpacity>
      <FlashMessage position="top" />
    </View>
  );
}

const style = StyleSheet.create({
  nameForm: {
    position: 'absolute',
    top: '40%',
    left: 20,
    right: 20,
    zIndex: 5,
    flexDirection: 'row',
  },

  nameInput: {
    flex: 1,
    height: 50,
    backgroundColor: '#FFF',
    color: '#333',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
        width: 4,
        height: 4,
    },
    elevation: 2,
  },
  loadButton: {
    width: 50,
    height: 50,
    backgroundColor: 'green',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
  }
});

export default Home;