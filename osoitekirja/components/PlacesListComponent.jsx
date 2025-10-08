import { Text, View } from 'react-native';
import { Button, Input, makeStyles, ListItem } from '@rneui/themed';
import { useEffect, useState } from 'react';
import { MaterialIcons } from "@expo/vector-icons";
import axios from 'axios';
import * as SQLite from 'expo-sqlite';

const geoBaseUrl = 'https://geocode.maps.co/search';
const db = SQLite.openDatabaseSync('placesDb');

export default function PlacesListComponent({ navigation }) {
  const styles = useStyles();
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [notFoundError, setNotFoundError] = useState(false)
  const [addressList, setAddressList] = useState([]);

  useEffect(() => {
    initDb();
    getLocations();
  }, [])

  useEffect(() => {
    setNotFoundError(false);
  }, [query])

  const findPlace = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${geoBaseUrl}?q=${query}&api_key=${process.env.EXPO_PUBLIC_API_KEY}`, {timeout: 5000});
      if (res.status === 200) {
        saveLocation({
          name: query,
          lat: res.data[0].lat,
          lon: res.data[0].lon
        });
        setQuery('');
        getLocations();
      }
    } catch (err) {
      setNotFoundError(true);
    }
    setLoading(false);
  }

  const initDb = async () => {
    try {
      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS place (
          id INTEGER PRIMARY KEY NOT NULL,
          name TEXT,
          lat TEXT,
          lon TEXT
          );
      `);
    } catch (err) {
      console.error('Problem initialising db: ', err);
    }
  }

  const getLocations = async () => {
    try {
      setAddressList(await db.getAllAsync('SELECT * FROM place'));
    } catch (err) {
      console.error('Problem adding address: ', err);
    }
  }

  const saveLocation = async ({ name, lat, lon }) => {
    try {
      await db.runAsync('INSERT INTO place (name, lat, lon) VALUES (?, ?, ?)', name, lat, lon);
    } catch (err) {
      console.error('Problem adding address: ', err);
    }
  }

  const deleteLocation = async (id) => {
    try {
      await db.runAsync('DELETE FROM place WHERE id=?', id);
      getLocations();
    }
    catch (err) {
      console.error('Problem deleting address: ', err);
    }
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
          <View key={item.id}>
          <ListItem
            containerStyle={styles.listItem}
            onPress={() => navigation.navigate('Map', {location: item})}
            onLongPress={() => deleteLocation(item.id)}>
            <ListItem.Content>
              <ListItem.Title style={{fontWeight: '600'}}>
                <View style={styles.listItemTitleView}>
                  <Text>
                    {item.name}
                  </Text>
                  <Text style={{color: 'grey'}}>
                    show on map
                  </Text>
                </View>
              </ListItem.Title>
            </ListItem.Content>
          </ListItem>
          </View>
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
  saveBtn: {
    width: 390,
    marginBottom: 20,
    marginTop: 10
  },
  listItem: {
    width: 400,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1  
  },
  listItemTitleView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'space-between',
    width: '100%'
  }
}));
