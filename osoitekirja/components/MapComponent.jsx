import { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Button } from '@rneui/themed';

export default function MapComponent({ route }) {
  const { location } = route.params;
  const [coords, setCoords] = useState({});

  const mapRef = useRef();

  useEffect(() => {
    setCoords({
      latitude: location.lat,
      longitude: location.lon,
      latitudeDelta: 0.0322,
      longitudeDelta: 0.0221,
    })
  }, [])

  const showLocation = () => {
    mapRef.current.animateToRegion({
      latitude: coords.latitude,
      longitude: coords.longitude,
      latitudeDelta: coords.latitudeDelta,
      longitudeDelta: coords.longitudeDelta
    })
  }

  return (
    <View>
      <MapView
        style={{ width: '100%', height: '92%' }}
        region={coords}
        ref={mapRef}>
        <Marker
          coordinate={{
            latitude: location.lat,
            longitude: location.lon
          }}
          title={location.name}
        />
      </MapView>
      <Button
        title="SHOW"
        onPress={showLocation}
      />
    </View>
  )
}