import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios';

const geoBaseUrl = 'https://geocode.maps.co/search';

export default function App() {
  const [address, setAddress] = useState('');
  const [region, setRegion] = useState({
    latitude: 60.200692,
    longitude: 24.934302,
    latitudeDelta: 0.0221,
    longitudeDelta: 0.0221,
  });
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    //moveToCurrentLocation();
  }, []);

  const moveToAddress = async () => {
    const res = await axios.get(`${geoBaseUrl}?q=${address}&api_key=${process.env.EXPO_PUBLIC_API_KEY}`);
    if (res.status === 200) {
      setRegion({...region, latitude: res.data[0].lat, longitude: res.data[0].lon});
      setMarker({latitude: res.data[0].lat, longitude: res.data[0].lon});
    }
  };

  const moveToCurrentLocation = async () => {
    const permission = await getPermission();
    if (permission.granted) {
      const currentLoc = await Location.getCurrentPositionAsync();
      setRegion({...region, longitude: currentLoc.longitude, latitude: currentLoc.latitude});
    }
  };

  const getPermission = async () => {
    return await Location.requestForegroundPermissionsAsync();
  };

  return (
    <View style={styles.container}>
      <MapView
        style={{ width: '100%', height: '55%' }} 
        region={region} >
        {marker &&
          <Marker
            coordinate={marker}
          />
        }
      </MapView>

      <TextInput
        autoFocus={true}
        value={address}
        placeholder='Address'
        onChangeText={text => setAddress(text)}
        style={styles.adrInput} />

      <View style={{flexDirection: 'row'}}>
        <Pressable
          style={styles.btn}
          onPress={moveToAddress}>
          <Text style={styles.btnText}>
            Show
          </Text>
        </Pressable>
      </View>

      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'start'
  },
  btn: {
    width: 80,
    backgroundColor: '#0d6efd',
    marginTop: 15,
    marginEnd: 5,
    alignItems: 'center',
    padding: 5,
    borderRadius: 6
  },
  btnText: {
    color: 'white'
  },
  adrInput: {
    height: 40,
    width: 250,
    borderWidth: 1,
    padding: 10,
    borderRadius: 6,
    marginTop: 12
  },
  map: {
    width: '100%',
    height: '55%'
  }
});
