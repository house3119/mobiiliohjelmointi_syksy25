import { StatusBar } from 'expo-status-bar';
import { useRef, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, FlatList } from 'react-native';

export default function App() {
  const [item, setItem] = useState({name: ''});
  const [list, setList] = useState([]);

  const itemInput = useRef(null);

  const addToList = () => {
    if (item.name === '') {
      return;
    }
    setList([...list, item.name]);
    setItem('');
  }

  const emptyList = () => {
    setList([]);
  }

  return (
    <View style={styles.container}>
      <TextInput
        autoFocus={true}
        value={item.name}
        onChangeText={text => {
          setItem({...item, name: text});
        }}
        style={styles.itemInput}
        ref={itemInput} />

      <View style={{flexDirection: 'row'}}>
        <Pressable
          style={styles.btn}
          onPress={addToList}>
          <Text style={styles.btnText}>
            Add
          </Text>
        </Pressable>

        <Pressable
          style={styles.btn}
          onPress={emptyList}>
          <Text style={styles.btnText}>
            Clear
          </Text>
        </Pressable>
      </View>

      <FlatList
        contentContainerStyle={styles.listContainer}
        data={list}
        renderItem={({item}) =>
          <Text style={{marginBottom: 2}}>
            {item}
          </Text>
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
    borderRadius: 6
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
    marginBottom: 4
  },
});
