import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import axios from 'axios';

const geoBaseUrl = 'https://geocode.maps.co/search';
const googlePlacesBaseUrl = 'https://places.googleapis.com/v1/places:searchNearby';


export default function App() {
  const [address, setAddress] = useState('');
  const [region, setRegion] = useState({
    latitude: 60.200692,
    longitude: 24.934302,
    latitudeDelta: 0.021,
    longitudeDelta: 0.0221,
  });
  const [markers, setMarkers] = useState([]);

  useEffect(() => {

  }, []);

  const moveToAddress = async () => {
    let response = await axios.get(`${geoBaseUrl}?q=${address}&api_key=${process.env.EXPO_PUBLIC_API_KEY}`);
    const regionData = response.data[0];
    setRegion({...region, latitude: regionData.lat, longitude: regionData.lon});

    const restaurantData = await axios.post(googlePlacesBaseUrl, {
      "includedTypes": ["restaurant"],
      "maxResultCount": 10,
      "locationRestriction": {
        "circle": {
          "center": {
            "latitude": regionData.lat,
            "longitude": regionData.lon},
          "radius": 500.0
        }
      }
    },
    {
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": process.env.EXPO_PUBLIC_GOOGLE_API_KEY,
        "X-Goog-FieldMask": "places.displayName,places.location,places.formattedAddress"
      }
    });
    const markerData = restaurantData.data.places.map(place => ({name: place.displayName.text, latitude: place.location.latitude, longitude: place.location.longitude, adr: place.formattedAddress}));
    setMarkers(markerData);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={{ width: '100%', height: '55%' }} 
        region={region} >
        {markers.length !== 0 && markers.map((marker, index) => <Marker key={index} coordinate={{latitude: marker.latitude, longitude: marker.longitude}}>
          <Callout>
            <View style={{height: 'fit-content', width: 200}}>
              <Text style={{fontWeight: 600}}>{marker.name}</Text>
              <Text>{marker.adr}</Text>
            </View>
          </Callout>
        </Marker>)}
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
