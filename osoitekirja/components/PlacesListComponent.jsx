import { StyleSheet, Text, View } from 'react-native';
import { Button, Input, Icon, makeStyles, ListItem } from '@rneui/themed';
import { useEffect, useState } from 'react';
import { MaterialIcons } from "@expo/vector-icons";
import axios from 'axios';

const geoBaseUrl = 'https://geocode.maps.co/search';

export default function PlacesListComponent({ navigation }) {
  const styles = useStyles();

  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [notFoundError, setNotFoundError] = useState(false)
  const [addressList, setAddressList] = useState([
    {
      name: 'Vattolantie 1 Karkkila',
      lat: '60.5402666',
      lon: '24.1744988'
    },
  ]);

  useEffect(() => {
    setNotFoundError(false)
  }, [query])

  const findPlace = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${geoBaseUrl}?q=${query}&api_key=${process.env.EXPO_PUBLIC_API_KEY}`, {timeout: 5000});
      if (res.status === 200) {
        setAddressList([...addressList, {
          name: query,
          lat: res.data[0].lat,
          lon: res.data[0].lon
        }])
        setQuery('')
      }
      console.log(res.data)
    } catch (err) {
      setNotFoundError(true)
    }
    setLoading(false)
  }

  const deleteAddress = (address) => {
    setAddressList(addressList.filter(a => a.name !== address.name))
  }

  return (
    <View style={styles.container}>
      <Input
        style={styles.placeInput}
        label='PLACEFINDER'
        placeholder='Type in address'
        keyboardType="default"
        errorMessage={notFoundError? 'Nothing found, sorry' : ''}
        value={query}
        onChangeText={val => setQuery(val)}
      />

      {!loading &&
        <Button
          style={styles.saveBtn}
          disabled={query.length === 0}
          onPress={findPlace}>
            <MaterialIcons name="save" size={20} color="white"/>
            Save
        </Button>    
      }

      {loading &&
        <Button
          style={styles.saveBtn}
          loading
        />  
      }

      {addressList.map((item) => {
        return (
          <ListItem key={item.name} containerStyle={styles.listItem} onPress={() => navigation.navigate('Map', {location: item})} onLongPress={() => deleteAddress(item)}>
            <ListItem.Content>
              <ListItem.Title style={{fontWeight: '600'}}>
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                  <Text>{item.name}</Text>
                  <Text style={{color: 'grey'}}>show on map</Text>
                </View>
              </ListItem.Title>
            </ListItem.Content>
          </ListItem>
        )
      })}

    </View>
  )
}

const useStyles = makeStyles(() => ({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: 'white',
    padding: 10
  },
  placeInput: {

  },
  saveBtn: {
    width: 390,
    marginBottom: 20
  },
  listItem: {
    width: 400,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1  
  }
}));