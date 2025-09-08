import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker'

const exchangeApiUrl = 'https://api.apilayer.com/exchangerates_data/latest';
const startRate: any[] = ['Select currency', -1];

export default function MainComponent() {
  const [amount, setAmount] = useState('');
  const [rates, setRates] = useState([startRate]);
  const [selectedCurrency, setSelectedCurrency] = useState(startRate);
  const [result, setResult] = useState('');

  useEffect(() => {
    /*
    fetch(`${exchangeApiUrl}?base=EUR`, {
      headers: {
        apikey: process.env.EXPO_PUBLIC_APIKEY
      }
    })
    .then(res => res.json())
    .then(data => {
      const holder:any = Object.entries(data.rates);
      console.log(holder)
      setRates([startRate, ...holder]);
    })
    .catch(err => console.error(err))
    */
   setRates([startRate, ['GBP', 0.85], ['USD', 1.10]])
  }, [])
  
  const convert = () => {
    setResult((Number(amount) / selectedCurrency[1]).toFixed(2));
  }

  return (
    <View style={styles.container}>
      {result && <Text style={{marginBottom: 14, fontSize: 18}}>{`${result} €`}</Text>}
      <TextInput
        autoFocus={true}
        value={amount}
        keyboardType='numeric'
        onChangeText={text => {setAmount(text)}}
        style={styles.itemInput}
        placeholder='Amount '/>

      <Picker
        style={{width: 250}}
        selectedValue={selectedCurrency[0]}
        onValueChange={(itemValue, itemIndex) =>
          setSelectedCurrency(rates.find(rate => rate[0] === itemValue))
        }
        >
          {rates.map((rate, index) => <Picker.Item key={index} label={rate[0].toString()} value={rate[0]}></Picker.Item>)}
      </Picker>

      <View style={{flexDirection: 'row'}}>
        <Pressable
          style={styles.btn}
          onPress={convert}>
          <Text style={styles.btnText}>
            Convert
          </Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 100
  },
  btn: {
    width: 120,
    backgroundColor: '#0d6efd',
    marginTop: 15,
    marginEnd: 5,
    alignItems: 'center',
    padding: 5,
    borderRadius: 8
  },
  btnText: {
    color: 'white',
    fontSize: 18
  },
  itemInput: {
    height: 40,
    width: 180,
    borderWidth: 1,
    borderColor: 'lightgrey',
    padding: 10,
    borderRadius: 6,
    fontSize: 16
  }
});
