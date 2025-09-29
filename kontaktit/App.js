import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Pressable, FlatList } from 'react-native';
import * as Contacts from 'expo-contacts';

export default function App() {
  const [list, setList] = useState(null);

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();

    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers]
      });

      setList(data.map(contact => ({
        firstName: contact.firstName,
        lastName: contact.lastName,
        phone1: contact.phoneNumbers[0].number
      })));
    }
  }

  return (
    <View style={styles.container}>
      {}

      {list? 
        <View style={{flex: 1, alignSelf: 'stretch'}}>
          <FlatList
            contentContainerStyle={styles.listContainer}
            data={list}
            renderItem={({item}) =>
              <Text style={{marginBottom: 2}}>
                {`${item.firstName} ${item.lastName} ${item.phone1}`}
              </Text>
            }/>
        </View>   
      :
        <View>
          <Text>Empty... press Get Contacts button</Text>
        </View>
      }

      <View>
        <Pressable
          style={styles.btn}
          onPress={getContacts}>
          <Text style={styles.btnText}>
            Get Contacts
          </Text>
        </Pressable>
      </View>

      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: '#fff',
    flexDirection: 'column',
    marginTop: 100,
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1
  },
  btn: {
    width: 160,
    backgroundColor: '#0d6efd',
    marginTop: 15,
    marginEnd: 5,
    marginBottom: 80,
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
    alignItems: 'start',
    marginTop: 25,
    marginStart: '25%'
  },
  listHeader: {
    fontWeight: 700,
    fontSize: 16,
    color: 'blue',
    marginBottom: 4
  },
});
