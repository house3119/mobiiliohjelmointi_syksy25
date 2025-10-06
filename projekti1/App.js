import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, FlatList, Image, TouchableHighlight, Button } from 'react-native';

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
    populateMines(0,0);
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
    setNumbers();
    setPopulated(true);
  }

  const setNumbers = () => {
    setBoard(current => {
      const holder = current.map(row => row.map(cell => ({...cell})));
      for (let i = 0; i < holder.length; i++) {
        for (let j = 0; j < holder[i].length; j++) {
          let counter = 0;

          //Top left
          try {
            if (holder[i-1][j-1].mine) {
              counter++;
            }
          } catch(err) {

          }

          // Top
          try {
            if (holder[i-1][j].mine) {
              counter++;
            }
          } catch(err) {

          }

          // Top right
          try {
            if (holder[i-1][j+1].mine) {
              counter++;
            }
          } catch(err) {

          }

          // Right
          try {
            if (holder[i][j+1].mine) {
              counter++;
            }
          } catch(err) {

          }

          // Bottom-right
          try {
            if (holder[i+1][j+1].mine) {
              counter++;
            }
          } catch(err) {

          }

          // Bottom
          try {
            if (holder[i+1][j].mine) {
              counter++;
            }
          } catch(err) {

          }

          // Bottom-left
          try {
            if (holder[i+1][j-1].mine) {
              counter++;
            }
          } catch(err) {

          }

          // Left
          try {
            if (holder[i][j-1].mine) {
              counter++;
            }
          } catch(err) {

          }

          if (holder[i][j].mine) {
            holder[i][j].around = -1;
          } else {
            holder[i][j].around = counter;
          }
          
          // console.log('i: ' + i + ', j: ' + j);
          // console.log('mines: ' + counter);
        }
      }
      return holder;
    })
  }

  const openCell = (x, y) => {

    setBoard(curr => {
      const holder = curr.map(row => row.map(cell => ({...cell})));
      
      const open = (x, y) => {
        holder[x][y].opened = true;
        if (holder[x][y].around === 0) {
          // Top left
          if (x === 0 && y === 0) {
            // console.log('top left')
            holder[x][y+1].opened? '' : open(x,y+1);
            holder[x+1][y].opened? '' : open(x+1,y);
            holder[x+1][y+1].opened? '' : open(x+1,y+1);
          }

          // Top right
          else if (x === 0 && y === 9) {
            // console.log('top right')
            holder[x][y-1].opened? '' : open(x,y-1);
            holder[x+1][y].opened? '' : open(x+1,y);
            holder[x+1][y-1].opened? '' : open(x+1,y-1);
          }

          // Bottom left
          else if (x === 9 && y === 0) {
            // console.log('bottom left')
            holder[x][y+1].opened? '' : open(x,y+1);
            holder[x-1][y].opened? '' : open(x-1,y);
            holder[x-1][y+1].opened? '' : open(x-1,y+1);
          }

          // Bottom right
          else if (x === 9 && y === 9) {
            // console.log('bottom right')
            holder[x][y-1].opened? '' : open(x,y-1);
            holder[x-1][y-1].opened? '' : open(x-1,y-1);
            holder[x-1][y].opened? '' : open(x-1,y);
          }

          // Left
          else if (x > 0 && x < 9 && y === 0) {
            // console.log('left')
            holder[x][y+1].opened? '' : open(x,y+1);
            holder[x-1][y].opened? '' : open(x-1,y);
            holder[x-1][y+1].opened? '' : open(x-1,y+1);
            holder[x+1][y].opened? '' : open(x+1,y);
            holder[x+1][y+1].opened? '' : open(x+1,y+1);

          }

          // Right
          else if (y === 9 && x !== 0) {
            // console.log('right')
            holder[x-1][y].opened? '' : open(x-1, y);
            holder[x+1][y].opened? '' : open(x+1, y);
            holder[x][y-1].opened? '' : open(x, y-1);
            holder[x-1][y-1].opened? '' : open(x-1, y-1);
            holder[x+1][y-1].opened? '' : open(x+1, y-1);
          }

          // Top
          else if (x === 0) {
            // console.log('top')
            holder[x][y+1].opened? '' : open(x, y+1);
            holder[x][y-1].opened? '' : open(x, y-1);
            holder[x+1][y].opened? '' : open(x+1, y);
            holder[x+1][y+1].opened? '' : open(x+1, y+1);
            holder[x+1][y-1].opened? '' : open(x+1, y-1);
          }

          // Bottom
          else if (x === 9) {
            // console.log('bottom')
            holder[x][y+1].opened? '' : open(x, y+1);
            holder[x][y-1].opened? '' : open(x, y-1);
            holder[x-1][y-1].opened? '' : open(x-1, y-1);
            holder[x-1][y].opened? '' : open(x-1, y);
            holder[x-1][y+1].opened? '' : open(x-1, y+1);
            // open(x,y-1)
          }

          // Middle
          else {
            // console.log('middle')
            holder[x][y+1].opened? '' : open(x, y+1);
            holder[x][y-1].opened? '' : open(x, y-1);
            holder[x-1][y-1].opened? '' : open(x-1, y-1);
            holder[x-1][y].opened? '' : open(x-1, y);
            holder[x-1][y+1].opened? '' : open(x-1, y+1);
            holder[x+1][y].opened? '' : open(x+1, y);
            holder[x+1][y+1].opened? '' : open(x+1, y+1);
            holder[x+1][y-1].opened? '' : open(x+1, y-1);
          }
        }
      }
      open(x,y);

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
        switch (board[x][y].around) {
          case 0:
            return <Image style={styles.cellImg} source={require('./assets/grey.png')}/>;
          case 1:
            return <Image style={styles.cellImg} source={require('./assets/number_1_icon-01.png')}/>;
          case 2:
            return <Image style={styles.cellImg} source={require('./assets/number_2_icon-01.png')}/>;
          case 3:
            return <Image style={styles.cellImg} source={require('./assets/number_3_icon-01.png')}/>;
          case 4:
            return <Image style={styles.cellImg} source={require('./assets/number_4_icon-01.png')}/>;
          case 5:
            return <Image style={styles.cellImg} source={require('./assets/number_5_icon-01.png')}/>;
          case 6:
            return <Image style={styles.cellImg} source={require('./assets/number_6_icon-01.png')}/>;
          case 7:
            return <Image style={styles.cellImg} source={require('./assets/number_7_icon-01.png')}/>;
          case 8:
            return <Image style={styles.cellImg} source={require('./assets/number_8_icon-01.png')}/>;
        }
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
      <Button title='Reset' onPress={createBoard}/>
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
