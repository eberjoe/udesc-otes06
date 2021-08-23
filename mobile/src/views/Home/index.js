import React, { useState } from 'react';
import { TextInput, StyleSheet, View, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

const Home = ({ navigation }) => {
  const [name, setName] = useState('');

  const identification = async () => {
    const user = await prisma.user.findUnique({
      where: { name: name }
    });
    if (user) {
      console.log(`Usuário ${name} já existe`);
    } else {
      prisma.user.create({
        data: { name: name }
      });
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

    </View>
  );
}

const style = StyleSheet.create({
  nameForm: {
    position: 'absolute',
    top: 20,
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