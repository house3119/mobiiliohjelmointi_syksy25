import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, FlatList, Alert } from 'react-native';
import { firebaseApp } from './firebaseConfig';
import { getDatabase, ref, push, onValue, remove } from "firebase/database";

export default function App() {
  const [item, setItem] = useState({product: '', amount: ''});
  const [list, setList] = useState([]);

  const db = getDatabase(firebaseApp);

  useEffect(() => {
    const itemsRef = ref(db, 'items/');
    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const items = Object.entries(data).map(([key, value]) => ({
          id: key,
          product: value.product,
          amount: value.amount
        }));
        setList(items);
      } else {
        setList([]);
      }
    })
  }, []);

  const saveItem = () => {
    if (item.product && item.amount) {
      push(ref(db, 'items/'), item);
      setItem({product: '', amount: ''});
    }
    else {
      Alert.alert('Error', 'Type product and amount first');
    }
  }

  const removeProduct = (item) => {
    const itemRef = ref(db, `items/${item.id}`);
    remove(itemRef);
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
              onPress={() => removeProduct(item)}>
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
