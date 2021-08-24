import React from 'react';
import { View, Text } from 'react-native';

const Asteroids = ({ navigation }) => {
  const user = navigation.getParam('user');

  return (
    <View>
      <Text>{`${user} Chegou!`}</Text>
    </View>
  );
}

export default Asteroids;