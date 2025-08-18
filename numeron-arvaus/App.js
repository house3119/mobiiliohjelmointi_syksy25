import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, Alert } from 'react-native';

export default function App() {
  const [number, setNumber] = useState(Math.floor(Math.random() * 100) + 1);
  const [guessValue, setGuessValue] = useState('');
  const [message, setMessage] = useState('Guess number between 1 - 100');
  const [guesses, setGuesses] = useState(0);

  const guess = () => {
    setGuesses(guesses + 1);

    try {
      if (number === Number(guessValue)) {
        Alert.alert(`You guessed the number in ${guesses} guesses`);
        reset();
      } else {
        setMessage(getMessage());
      }
    } catch(e) {
      setMessage('Error. Check input.');
    }
  }

  const getMessage = () => {
    try {
      if (guessValue === '') {
        return 'Input number please'
      } else if (number < Number(guessValue)) {
        return `Your guess ${guessValue} is too high`;
      } else {
        return `Your guess ${guessValue} is too low`;
      }
    } catch(e) {
      return 'Error. Check input.';
    }
  }

  const reset = () => {
    setNumber(Math.floor(Math.random() * 100) + 1);
    setMessage('Guess number between 1 - 100');
    setGuessValue('');
    setGuesses(0);
  }

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <View style={{flex: 1, justifyContent: 'center'}}>

        {/* Result */}
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Text style={styles.result}>
            {message}
          </Text>
        </View>

        {/* Input */}
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <TextInput
            value={guessValue}
            style={styles.numberInput}
            onChangeText={guessValue => setGuessValue(guessValue)}
            keyboardType='numeric' />
        </View>

        {/* Button */}
        <Button
          onPress={guess}
          title='Make a guess' />

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
