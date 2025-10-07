import { useState, createRef, useEffect } from "react";
import { View } from "react-native";
import { makeStyles, Input, Header, Button, Icon, ListItem } from "@rneui/themed";
import { Item } from "../types/Item";

export default function OstoslistaComponent() {
  const styles = useStyles();
  const [item, setItem] = useState({product: '', amount: ''});
  const [itemArray, setItemArray] = useState<Item[]>([]);
  const [productInputError, setProductInputError] = useState(false);

  const productInputRef = createRef<Input>();

  useEffect(() => {
    setProductInputError(false);
  }, [item])

  const saveItem = () => {
    if (!itemArray.find(i => i.product.toLowerCase() === item.product.toLowerCase())) {
      setItemArray([...itemArray, {product: item.product, amount: item.amount}]);
      clearFields();
    } else {
      setProductInputError(true);
      productInputRef.current?.shake?.();
    }
  }

  const deleteItem = (item: any) => {
    setItemArray(itemArray.filter(i => i.product !== item.product));
  }

  const clearFields = () => {
    setItem({product: '', amount: ''})
  }

  return (
    <View style={styles.container}>
      <Header
        containerStyle={styles.headerContainer}
        centerComponent={{text: 'Shopping List', style: {color: 'white'}}}
      />

      <View style={styles.inputView}>
        <Input
          containerStyle={{width: 360}}
          label='PRODUCT'
          placeholder='Product'
          value={item.product}
          keyboardType="default"
          ref={productInputRef}
          errorMessage={productInputError? 'Product with this name already in list.' : ''}
          onChangeText={val => setItem({...item, product: val})}
        />
        <Input
          containerStyle={{width: 360}}
          label='AMOUNT'
          placeholder='Amount'
          value={item.amount}
          keyboardType="numeric"
          onChangeText={val => setItem({...item, amount: val})}
        />
        <Button
          disabled={item.product.length === 0? true : false}
          style={{width: 180}}
          onPress={saveItem}>
            <Icon name="save" color="white" style={{marginEnd: 4}}/>
            Save
        </Button>
      </View>

      <View style={styles.listView}>
        {itemArray.map((item, index) => {
          return (
            <ListItem
              key={index}
              style={styles.listItem}>
              <ListItem.Content>
                <ListItem.Title style={{fontWeight: '600'}}>
                  {item.product}
                </ListItem.Title>
                <ListItem.Subtitle style={styles.listItemSubtitle}>
                  {item.amount}
                </ListItem.Subtitle>
              </ListItem.Content>
              <Icon name="trash-can" type="material-community" color="red" onPress={() => deleteItem(item)}/>
            </ListItem>
          )
        })}
      </View>
    </View>
  )
}

const useStyles = makeStyles(() => ({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headerContainer: {
    paddingTop: 60,
    height: 100,
    marginBottom: 20
  },
  inputView: {
    flex: 1,
    alignItems: 'center'
  },
  listView: {
    flex: 2
  },
  listItem: {
    width: 400,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1  
  },
  listItemSubtitle: {
    olor: 'grey',
    marginTop: 2
  }
}));