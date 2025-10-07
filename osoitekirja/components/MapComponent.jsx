import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function MapComponent({ route }) {
  const { location } = route.params;

  const [coords, setCoords] = useState({})

  useEffect(() => {
    setCoords({
      latitude: location.lat,
      longitude: location.lon,
      latitudeDelta: 0.0322,
      longitudeDelta: 0.0221,
    })
  }, [])

  console.log(location)

  return (
    <View>
      <MapView
        style={{ width: '100%', height: '100%' }}
        region={coords}>
        <Marker
          coordinate={{
            latitude: location.lat,
            longitude: location.lon
          }}
          title={location.name}
        />
      </MapView>
    </View>
  )
}