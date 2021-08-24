import React, { useCallback, useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
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
            estDiameter: (asteroid.estimated_diameter.kilometers.estimated_diameter_min + asteroid.estimated_diameter.kilometers.estimated_diameter_max) / 2,
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
      <Text>{`${user} Chegou!`}</Text>
      {asteroids.map((asteroid, i) => (
        <TouchableOpacity onPress={() => choose(asteroid.id)} key={i}>
          <Text>{asteroid.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

export default Asteroids;