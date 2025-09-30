import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, FlatList, Image, TouchableHighlight } from 'react-native';

const DIFFICULTY = 'beginner';

export default function App() {
  const [board, setBoard] = useState(null);
  const [populated, setPopulated] = useState(false);

  useEffect(() => {
    createBoard(DIFFICULTY);
  }, [])

  const createBoard = (difficulty) => {
    const cell = {
      mine: false,
      opened: false,
      flag: false
    };

    const holder = [];
    for (let i = 0; i < 10; i++) {
      holder.push([]);
      for (let j = 0; j < 10; j++) {
        holder[i].push({...cell});
      }
    }
    setBoard(holder);
  }

  const populateMines = (x, y) => {
    setBoard(current => {
      const holder = current.map(row => row.map(cell => ({...cell})));
      let counter = 0;

      while (counter < 10) {
        const xCoord = Math.floor(Math.random() * 10);
        const yCoord = Math.floor(Math.random() * 10);

        if (xCoord === x && yCoord === y) {
          // Avoid putting mine to first opened cell
        } else if (!holder[xCoord][yCoord].mine) {
          holder[xCoord][yCoord].mine = true;
          counter++;
        }

      }
      return holder;
    })
    setPopulated(true);
  }

  const openCell = (x, y) => {
    if (!populated) {
      populateMines(x, y);
    }

    setBoard(current => {
      const holder = current.map(row => row.map(cell => ({...cell})));
      console.log('x: ' + x, 'y: ' + y);

      holder[x][y].opened = true;
      return holder;
    })



  }

  const getImage = (x, y) => {
    if (board[x][y].opened) {
      if (board[x][y].mine) {
        return (
          <Image style={styles.cellImg} source={require('./assets/mine_icon-01.png')}/>
        )
      } else {
        return (
          <Image style={styles.cellImg} source={require('./assets/grey.png')}/>
        )
      }
    } else {
      return (
        <Image style={styles.cellImg} source={require('./assets/light_grey-02-01.png')}/>
      )
    }
  }

  return (
    <View style={styles.container}>
      {board && board.map((row, index_x) =>
        <View key={index_x} style={{flexDirection: 'row'}}>
          {row.map((item, index_y) =>
            <TouchableHighlight key={index_x + '-' + index_y} onPress={() => openCell(index_x, index_y)}>
              {getImage(index_x, index_y)}
            </TouchableHighlight>
          )}
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  cellImg: {
    width: 34,
    height: 34
  }
});
