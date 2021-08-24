import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const Chosen = ({ navigation }) => {
  const user = navigation.getParam('user');

  return (
    <View>
      <Text>{`Fim para ${user}`}</Text>
    </View>
  );
}

export default Chosen;