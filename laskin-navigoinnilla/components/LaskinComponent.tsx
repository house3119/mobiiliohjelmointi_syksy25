import { useRef, useState } from "react";
import { View, TextInput, Text, StyleSheet, Pressable } from "react-native";

export default function LaskinComponent({ navigation }) {
  const [number1, setNumber1] = useState<string>('');
  const [number2, setNumber2] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [history, setHistory] = useState<string[]>([]);

  const numbInput1Ref = useRef(null);

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
          <Pressable
            style={styles.btnCalc}
            onPress={() => calculate('+')}>
            <Text style={styles.btnText}>
              +
            </Text>
          </Pressable>

          <Pressable
            style={styles.btnCalc}
            onPress={() => calculate('-')}>
            <Text style={styles.btnText}>
              -
            </Text>
          </Pressable>

          <Pressable
            style={styles.btnHistory}
            onPress={() => navigation.navigate('Historia', { history: history})}>
            <Text style={styles.btnText}>
              History
            </Text>
          </Pressable>
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
  },
  btnCalc: {
    width: 30,
    backgroundColor: '#0d6efd',
    marginTop: 15,
    marginEnd: 5,
    alignItems: 'center',
    padding: 5,
    borderRadius: 6
  },
  btnHistory: {
    width: 65,
    backgroundColor: '#0d6efd',
    marginTop: 15,
    alignItems: 'center',
    padding: 5,
    borderRadius: 6
  },
  btnText: {
    color: 'white'
  }
})