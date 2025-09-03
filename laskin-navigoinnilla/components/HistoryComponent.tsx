import { View, Text, FlatList, StyleSheet } from "react-native";

export default function HistoryComponent({ route }) {
  const { history } = route.params;

  return(
    <View style={{flex: 1, alignItems: 'center', marginTop: 60}}>
      <FlatList
        contentContainerStyle={{flexDirection: 'column', alignItems: 'center'}}
        data={history}
        renderItem={({item}) => <Text>{item}</Text>}
        ListHeaderComponent={history.length !== 0 ? <Text style={styles.listHeader}>History</Text> : <></>}
      />
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