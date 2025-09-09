import { StyleSheet } from 'react-native';

export default StyleSheet.create({
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
  },
  resultText: {
    marginBottom: 14,
    fontSize: 18
  }
});
