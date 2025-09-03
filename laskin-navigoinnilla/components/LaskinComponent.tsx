import { useRef, useState } from "react";
import { View, TextInput, Button, FlatList, Text, StyleSheet } from "react-native";

export default function LaskinComponent({ navigation }) {
  const [number1, setNumber1] = useState<string>('');
  const [number2, setNumber2] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [history, setHistory] = useState<string[]>([]);

  const numbInput1Ref = useRef(null);
  const numbInput2Ref = useRef(null);

  const calculate = (oper: string) => {
    if (!number1 || !number2) {
      return;
    }

    switch(oper) {
      case '+':
        setResult((Number(number1) + Number(number2)).toString());
        addToHistory('+');
        reset();
        break;
      case '-':
        setResult((Number(number1) - Number(number2)).toString());
        addToHistory('-');
        reset();
        break;
    }
  }

  const addToHistory = (oper: string) => {
    switch(oper) {
      case '+':
        setHistory([...history, `${number1} ${oper} ${number2} = ${Number(number1) + Number(number2)}` ])
        break;
      case '-':
        setHistory([...history, `${number1} ${oper} ${number2} = ${Number(number1) - Number(number2)}` ])
        break;
    }
  }

  const reset = () => {
    setNumber1('');
    setNumber2('');
    numbInput1Ref.current.focus()
  }

  return(
    <View style={{flex: 1, alignItems: 'center'}}>
      <View style={{flex: 1, justifyContent: 'flex-start', marginTop: 100}}>

        {/* Result */}
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Text style={styles.result}>{'Result: ' + result}</Text>
        </View>

        {/* Inputs */}
        <View style={{flexDirection: 'column', alignItems: 'flex-start'}}>
          <TextInput
            autoFocus={true}
            value={number1}
            ref={numbInput1Ref}
            onChangeText={numb => {
              setNumber1(numb);
              numbInput2Ref.current.focus();
            }}
            style={styles.numberInput}
            keyboardType='numeric'
            placeholder='Number 1' />
          <TextInput
            value={number2}
            ref={numbInput2Ref}
            onChangeText={numb => setNumber2(numb)}
            style={styles.numberInput}
            keyboardType='numeric'
            placeholder='Number 2' />
        </View>

        {/* Buttons */}
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <Button
            onPress={() => calculate('+')}
            title='+' />
            
          <Button
            onPress={() => calculate('-')}
            title='-' />

          <Button
            onPress={() => navigation.navigate('Historia', { history: history})}
            title='History'/>
        </View>
      </View>
    </View>
  )
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
  },
  listHeader: {
    fontWeight: 600
  }
})