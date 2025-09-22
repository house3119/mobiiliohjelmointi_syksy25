import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, FlatList } from 'react-native';
import * as SQLite from 'expo-sqlite';

export default function App() {
  const [item, setItem] = useState({product: '', amount: ''});
  const [list, setList] = useState([]);

  const db = SQLite.openDatabaseSync('shoppingdb');

  useEffect(() => {
    initialize();
  }, []);

  const initialize = async () => {
    try {
      await db.execAsync('CREATE TABLE IF NOT EXISTS product (id INTEGER PRIMARY KEY NOT NULL, product TEXT, amount TEXT);');
      updateList();
    } catch (error) {
      console.error('Could not open database', error);
    }
  }

  const saveItem = async () => {
    try {
      await db.runAsync('INSERT INTO product (product, amount) VALUES (?, ?)', item.product, item.amount);
      updateList();
      setItem({product: '', amount: ''});
    } catch (error) {
      console.error('Could not add item', error);
    }
  };

  const updateList = async () => {
    try {
      const products = await db.getAllAsync('SELECT * from product');
      setList(products.map(p => ({product: p.product, amount: p.amount, id: p.id})));
    } catch(e) {
      console.error(e);
    }
  }

  const removeProduct = async (id) => {
    try {
      await db.runAsync('DELETE FROM product WHERE id=?', id);
      updateList();
    } catch(e) {
      console.error(e);
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        autoFocus={true}
        value={item.product}
        onChangeText={text => {
          setItem({...item, product: text});
        }}
        placeholder='Product'
        style={styles.itemInput} />

      <TextInput
        value={item.amount}
        onChangeText={text => {
          setItem({...item, amount: text});
        }}
        placeholder='Amount'
        style={styles.itemInput} />

      <View style={{flexDirection: 'row'}}>
        <Pressable
          style={styles.btn}
          onPress={saveItem}>
          <Text style={styles.btnText}>
            Save
          </Text>
        </Pressable>

      </View>

      <FlatList
        contentContainerStyle={styles.listContainer}
        data={list}
        renderItem={({item}) =>
          <View
            style={{flexDirection: 'row'}}
            key={item.id}>
            <Text style={styles.listProduct}>
              {item.product}, {item.amount}
            </Text>
            <Text
              style={styles.listBoughtLink}
              onPress={() => removeProduct(item.id)}>
              bought
            </Text>
          </View>
          
        }
        ListHeaderComponent={
          <Text style={styles.listHeader}>
            Shopping List
          </Text>
        } />

      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'start',
    marginTop: 100
  },
  btn: {
    width: 60,
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
  itemInput: {
    height: 40,
    width: 250,
    borderWidth: 1,
    padding: 10,
    borderRadius: 6,
    marginBottom: 6
  },
  listContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 25
  },
  listHeader: {
    fontWeight: 700,
    fontSize: 16,
    color: 'blue',
    marginBottom: 8
  },
  listProduct: {
    marginBottom: 5,
    marginEnd: 16
  },
  listBoughtLink: {
    color: 'blue',
    fontWeight: 600
  }
});
