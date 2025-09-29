import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import * as Speech from 'expo-speech';

export default function App() {
  const availableLangs = [{
    name: 'Finnish',
    code: 'fi'
  }, {
    name: 'English',
    code: 'en'
  }, {
    name: 'Swedish',
    code: 'sv'
  }];

  const [textToSay, setTextToSay] = useState('');
  const [selectedLangIndex, setSelectedLangIndex] = useState(0);

  const sayIt = () => {
    Speech.speak(textToSay, {language: availableLangs[selectedLangIndex].code});
  }

  return (
    <View style={styles.container}>
      <SegmentedControl
        style={{height: 40, width: 220, marginBottom: 15}}
        values={availableLangs.map(lang => lang.name)}
        selectedIndex={selectedLangIndex}
        onChange={event => setSelectedLangIndex(event.nativeEvent.selectedSegmentIndex)} />

      <TextInput
        autoFocus={true}
        value={textToSay}
        onChangeText={text => setTextToSay(text)}
        style={styles.itemInput} />

      <View>
        <Pressable
          style={styles.btn}
          onPress={sayIt}>
          <Text style={styles.btnText}>
            Say it
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
    flexDirection: 'column',
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
