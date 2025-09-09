import { useEffect, useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styles from '../styles';

const exchangeApiUrl = 'https://api.apilayer.com/exchangerates_data/latest';
const startRate: any[] = ['Select currency', -1];

export default function MainComponent() {
  const [amount, setAmount] = useState('');
  const [rates, setRates] = useState([startRate]);
  const [selectedCurrency, setSelectedCurrency] = useState(startRate);
  const [result, setResult] = useState('');

  useEffect(() => {
    fetch(`${exchangeApiUrl}?base=EUR`, {
      headers: {
        apikey: process.env.EXPO_PUBLIC_APIKEY
      }
    })
    .then(res => res.json())
    .then(data => {
      const holder:any = Object.entries(data.rates);
      setRates([startRate, ...holder]);
    })
    .catch(err => {
      console.error(err);
    })
    
  }, [])
  
  const convert = () => {
    setResult((Number(amount) / selectedCurrency[1]).toFixed(2));
  }

  return (
    <View style={styles.container}>
      {result &&
        <Text style={styles.resultText}>
          {`${result} €`}
        </Text>
      }

      <TextInput
        autoFocus={true}
        value={amount}
        keyboardType='numeric'
        onChangeText={text => {setAmount(text)}}
        style={styles.itemInput}
        placeholder='Amount'/>

      <Picker
        style={{width: 250}}
        selectedValue={selectedCurrency[0]}
        onValueChange={(itemValue, itemIndex) => setSelectedCurrency(rates.find(rate => rate[0] === itemValue))}>
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
