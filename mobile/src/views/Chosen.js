import React, { useCallback, useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { pt } from 'date-fns/locale';
import { formatRelative, parseISO } from 'date-fns';
import db from '../services/db';
import neo from '../services/neo';

const Chosen = ({ navigation }) => {
  const user = navigation.getParam('user');
  const id = navigation.getParam('asteroidId');
 
  const mountedRef = useRef(true);
  const [asteroid, setAsteroid] = useState();

  const load = useCallback(async () => {
    if (mountedRef.current) {
      const userData = await (await db.get(`/fetch-user/${user}`)).data;
      const chosen = await (await neo.get(`/neo/${
        id || userData.asteroid_id
      }`)).data;
      setAsteroid({
        name: chosen.name,
        date: formatRelative(parseISO(userData.passage_timestamp), new Date(), { locale: pt })
      });
    }
  }, [])

  useEffect(() => {
    if (mountedRef.current) {
      load();
    }
    return () => {
      mountedRef.current = false;
    }
  }, [load])

  return (
    !asteroid ? (
      <View style={style.spinner}>
        <ActivityIndicator size="large" />
      </View>
    ) : (
      <View style={style.chosen}>
        <Text>{`Seu meteoro é o ${asteroid.name} que passa ${asteroid.date}`}</Text>
      </View>
    )
  );
}

const style = StyleSheet.create({
  chosen: {
    position: 'absolute',
    top: '40%',
    left: 20,
    right: 20,
    zIndex: 5,
    flexDirection: 'row',
  },
  spinner: {
    flex: 1,
    justifyContent: 'center'
  }
});

export default Chosen;