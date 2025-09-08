import { StatusBar } from 'expo-status-bar';
import { useRef, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, FlatList, Image } from 'react-native';

const mealApiUrl = 'https://www.themealdb.com/api/json/v1/1/filter.php';

export default function App() {
  const [query, setQuery] = useState('');
  const [list, setList] = useState([]);
  const [searched, setSearched] = useState(false);

  const queryInput = useRef(null);

  const search = () => {
    fetch(`${mealApiUrl}?i=${query}`)
      .then(res => res.json())
      .then(data => {
        const holder = [];
        if (data.meals) {
          data.meals.forEach(meal => {
            holder.push(meal);
          })
        }
        setList(holder);
        setSearched(true);
    })
    .catch(err => console.error(err))
  }

  return (
    <View style={styles.container}>
      <TextInput
        autoFocus={true}
        value={query}
        onChangeText={text => {setQuery(text);}}
        style={styles.itemInput}
        ref={queryInput} />

      <View style={{flexDirection: 'row'}}>
        <Pressable
          style={styles.btn}
          onPress={search}>
          <Text style={styles.btnText}>
            Find
          </Text>
        </Pressable>
      </View>

      <View>
        {(list.length !== 0 && searched) ?
          <FlatList
            contentContainerStyle={styles.listContainer}
            data={list}
            renderItem={({item}) =>
              <View style={styles.listItem}>
                <Text style={styles.listText}>
                  {item.strMeal}
                </Text>
                <Image
                style={styles.listImage}
                  source={{
                    uri: item.strMealThumb
                  }} />
              </View>
            } />
        : (list.length === 0 && searched) ?
          <Text>
            Nothing found
          </Text>
        : null}
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
    justifyContent: 'start',
    marginTop: 100
  },
  btn: {
    width: 100,
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
    alignItems: 'flex-start',
    marginTop: 12,
    paddingTop: 4
  },
  listHeader: {
    fontWeight: 700,
    fontSize: 16,
    color: 'blue',
    marginBottom: 8
  },
  listItem: {
    marginBottom: 4,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    width: 300
  },
  listText: {
    marginBottom: 2,
    fontWeight: 500
  },
  listImage: {
    height: 100,
    width: 100
  }
});
