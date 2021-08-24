import React, { useCallback, useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { pt } from 'date-fns/locale';
import { formatRelative, isBefore } from 'date-fns';
import neo from '../services/neo';

const Asteroids = ({ navigation }) => {
  const user = navigation.getParam('user');

  const mountedRef = useRef(true);
  const [asteroids, setAsteroids] = useState([]);

  const load = useCallback(async () => {
    if (mountedRef.current) {
      const batch = await (await neo.get('/feed')).data.near_earth_objects;
      const now = new Date();
      const tempAsteroids = [];
      for (const day in batch) {
        tempAsteroids.push(
          ...batch[day].filter(asteroid => isBefore(
            now, new Date(
              asteroid.close_approach_data[0].epoch_date_close_approach
            )
          )).map(asteroid => ({
            id: asteroid.id,
            name: asteroid.name,
            passTimeFormatted: formatRelative(
              new Date(
                asteroid.close_approach_data[0].epoch_date_close_approach
              ), now, { locale: pt }
            ),
            passTime: asteroid.close_approach_data[0].epoch_date_close_approach,
            passDistance: `${Intl.NumberFormat('pt').format(
              asteroid.close_approach_data[0].miss_distance.kilometers
            )} km`,
            estDiameter: `${Intl.NumberFormat('pt').format((asteroid.estimated_diameter.kilometers.estimated_diameter_min +
              asteroid.estimated_diameter.kilometers.estimated_diameter_max) / 2)} km`,
            isDangerous: asteroid.is_potentially_hazardous_asteroid
          }))
        );
      }
      tempAsteroids.sort((a, b) => a.passTime - b.passTime);
      setAsteroids(tempAsteroids);
    }
  }, []);

  useEffect(() => {
    if (mountedRef.current) {
      load();
    }
    return () => {
      mountedRef.current = false;
    }
  }, [load]);

  const choose = (id) => {
    console.log(id);
  }

  return (
    <View>
      {asteroids.map((asteroid, i) => (
        <TouchableOpacity style={style.astCard} onPress={() => choose(asteroid.id)} key={i}>
          <Text>Meteoro {asteroid.name}</Text>
          <Text>Diâmetro estimado de {asteroid.estDiameter}</Text>
          <Text>Passagem {asteroid.passTimeFormatted} UTC</Text>
          <Text>A {asteroid.passDistance} da Terra</Text>
          <Text style={{color: asteroid.isDangerous ? 'red' : '#1f7', fontWeight: 800}}>{asteroid.isDangerous ? 'PERIGOSO' : 'SEM PERIGO'}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const style = StyleSheet.create({
  astCard: {
    flex: 1,
    backgroundColor: '#fff',
    color: '#333',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 24,
    margin: 10,
    padding: 5
  }
});

export default Asteroids;