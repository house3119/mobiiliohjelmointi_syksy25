import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  const [number1, setNumber1] = useState('');
  const [number2, setNumber2] = useState('');
  const [result, setResult] = useState('');

  const add = () => {
    try {
      setResult('Result: ' + (Number(number1) + Number(number2)));
    } catch(e) {
      setResult('Inputted values are not numbers');
    }
  }

  const subtract = () => {
    try {
      setResult('Result: ' + (Number(number1) - Number(number2)));
    } catch(e) {
      setResult('Inputted values are not numbers');
    }
  }

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <View style={{flex: 1, justifyContent: 'center'}}>

        {/* Result */}
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Text style={styles.result}>{result}</Text>
        </View>

        {/* Inputs */}
        <View style={{flexDirection: 'column', alignItems: 'flex-start'}}>
          <TextInput
            value={number1}
            onChangeText={numb => setNumber1(numb)}
            style={styles.numberInput}
            keyboardType='numeric'
            placeholder='Number 1' />
          <TextInput
            value={number2}
            onChangeText={numb => setNumber2(numb)}
            style={styles.numberInput}
            keyboardType='numeric'
            placeholder='Number 2' />
        </View>

        {/* Buttons */}
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <Button
            onPress={add}
            title='+' />
          <Button
            onPress={subtract}
            title='-' />
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  result: {
    fontWeight: 600,
    marginBottom: 5
  },
  numberInput: {
    height: 40,
    width: 150,
    borderWidth: 1,
    padding: 10
  }
})
