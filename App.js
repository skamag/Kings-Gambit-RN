import { StatusBar } from 'expo-status-bar';
import { useState, useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View, Button, Dimensions } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import Board from './components/Board';
import King from './components/King';
import RookMirror from './components/RookMirror';
import RookFollow from './components/RookFollow';

export default function App() {
  const screenWidth = Dimensions.get("screen").width
  const characterWidth = screenWidth / 5
  const characterHeight = screenWidth / 5

  const [kingLeft, setKingLeft] = useState((screenWidth / 5) * 2)
  const [kingTop, setKingTop] = useState((screenWidth / 5) * 3)
  const [rookMirrorLeft, setRookMirrorLeft] = useState((screenWidth / 5) * 2)
  const [rookMirrorTop, setRookMirrorTop] = useState((screenWidth / 5))
  const [rookFollowLeft, setRookFollowLeft] = useState((screenWidth / 5) * 2)
  const [rookFollowTop, setRookFollowTop] = useState((screenWidth / 5) * 5)

  // const positionsLeft = [(screenWidth / 5) * 2, (screenWidth / 5) * 2, (screenWidth / 5) * 2]
  // const positionsTop = [(screenWidth / 5) * 3, (screenWidth / 5), (screenWidth / 5) * 5]

  /*useEffect(() => {
    setTimeout(() => {
      LayoutAnimation.spring()
      setKingLeft(kingLeft - characterWidth)
    })
  })*/

  const fadeAnim = useRef(new Animated.Value(0)).current

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: true
    }).start()
  }

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 3000,
      useNativeDriver: true
    }).start()
  }
  
  const moveRookLeft = (characterLeft, characterTop, r) => {
    if(
      ((characterTop < ((characterHeight * 0.5))) && (((characterLeft > (characterWidth * 0.5)) && (characterLeft < (characterWidth * 1.5))) || ((characterLeft > (characterWidth * 3.5)) && (characterLeft < characterWidth * 4.5))))
      || (((characterTop > (characterHeight * 0.5)) && (characterTop < (characterHeight * 2.5))) && (characterLeft > characterWidth * 0.5))
      || (((characterTop> (characterHeight * 2.5)) && (characterTop < (characterHeight * 4.5))) && (characterLeft > (characterWidth * 1.5)))
    ) {
      if(r == 1) {
        setRookMirrorLeft(rookMirrorLeft => rookMirrorLeft -= characterWidth)
      } else if(r == 2) {
        setRookFollowLeft(rookFollowLeft => rookFollowLeft -= characterWidth)
      }
    }
  }

  const moveRookUp = (characterLeft, characterTop, r) => {
    if(
      (characterTop > (characterHeight * 0.5)) && ((characterLeft < (characterWidth * 1.5) || characterLeft > (characterWidth * 2.5)))
      || ((characterTop > (characterHeight * 1.5)) && ((characterLeft > (characterWidth * 1.5)) && (characterLeft < (characterWidth * 2.5))))
    ) {
      if(r == 1) {
        setRookMirrorTop(rookMirrorTop => rookMirrorTop -= characterHeight)
      } else if(r == 2) {
        setRookFollowTop(rookFollowTop => rookFollowTop -= characterHeight)
      }
    }
  }

  const moveRookRight = (characterLeft, characterTop, r) => {
    if(
      ((characterTop < ((characterHeight * 0.5))) && (((characterLeft > (characterWidth * -0.5)) && (characterLeft < (characterWidth * 0.5))) || ((characterLeft > (characterWidth * 2.5)) && (characterLeft < characterWidth * 3.5))))
      || (((characterTop > (characterHeight * 0.5)) && (characterTop < (characterHeight * 2.5))) && (characterLeft < characterWidth * 3.5))
      || (((characterTop > (characterHeight * 2.5)) && (characterTop < (characterHeight * 4.5))) && (characterLeft < (characterWidth * 2.5)))
    ) {
      if(r == 1) {
        setRookMirrorLeft(rookMirrorLeft => rookMirrorLeft += characterWidth)
      } else if(r == 2) {
        setRookFollowLeft(rookFollowLeft => rookFollowLeft += characterWidth)
      }
    }
  }

  const moveRookDown = (characterLeft, characterTop, r) => {
    if(
      ((characterTop < (characterHeight * 1.5)) && ((characterLeft < (characterWidth * 0.5)) || (characterLeft > (characterWidth * 3.5))))
      || ((characterTop < (characterHeight * 3.5)) && (((characterLeft > (characterWidth * 0.5)) && (characterLeft < (characterWidth * 1.5))) || ((characterLeft > (characterWidth * 2.5)) && (characterLeft < (characterWidth * 3.5)))))
      || ((characterTop < (characterHeight * 4.5)) && ((characterLeft > (characterWidth * 1.5)) && (characterLeft < (characterWidth * 2.5))))
    ) {
      if(r == 1) {
        setRookMirrorTop(rookMirrorTop => rookMirrorTop += characterHeight)
      } else if(r == 2) {
        setRookFollowTop(rookFollowTop => rookFollowTop += characterHeight)
      }
    }
  }

  const moveRooks = (e) => {
    if((e == 37) && (rookMirrorLeft )) {
      moveRookRight(rookMirrorLeft, rookMirrorTop, 1)
      moveRookLeft(rookFollowLeft, rookFollowTop, 2)
      // checkCollisions(37)      
    } else if(e == 38) {
      moveRookDown(rookMirrorLeft, rookMirrorTop, 1)
      moveRookUp(rookFollowLeft, rookFollowTop, 2)
      // checkCollisions(38)
    } else if(e == 39) {
      moveRookLeft(rookMirrorLeft, rookMirrorTop, 1)
      moveRookRight(rookFollowLeft, rookFollowTop, 2)
      // checkCollisions(39)
    } else if(e == 40) {
      moveRookUp(rookMirrorLeft, rookMirrorTop, 1)
      moveRookDown(rookFollowLeft, rookFollowTop, 2)
      // checkCollisions(40)
    }
  }

  const checkCollisions = (e) => {
    if(((rookMirrorLeft > (rookFollowLeft * 0.9)) && (rookMirrorLeft < (rookFollowLeft * 1.1))) && ((rookMirrorTop > (rookFollowTop * 0.9)) && (rookMirrorTop < (rookFollowTop * 1.1)))) {
      if(e == 37) {
        moveRookLeft(rookMirrorLeft, rookMirrorTop, 1)
        moveRookRight(rookFollowLeft, rookFollowTop, 2)
      } else if(e == 38) {
        moveRookUp(rookMirrorLeft, rookMirrorTop, 1)
        moveRookDown(rookFollowLeft, rookFollowTop, 2)
      } else if(e == 39) {
        moveRookRight(rookMirrorLeft, rookMirrorTop, 1)
        moveRookLeft(rookFollowLeft, rookFollowTop, 2)
      } else if(e == 40) {
        moveRookDown(rookMirrorLeft, rookMirrorTop, 1)
        moveRookUp(rookFollowLeft, rookFollowTop, 2)
      }
    }
  }

  const moveLeft = () => {
    if(
      ((kingTop < ((characterHeight * 0.5))) && (((kingLeft > (characterWidth * 0.5)) && (kingLeft < (characterWidth * 1.5))) || ((kingLeft > (characterWidth * 3.5)) && (kingLeft < characterWidth * 4.5))))
      || (((kingTop > (characterHeight * 0.5)) && (kingTop < (characterHeight * 2.5))) && (kingLeft > characterWidth * 0.5))
      || (((kingTop > (characterHeight * 2.5)) && (kingTop < (characterHeight * 4.5))) && (kingLeft > (characterWidth * 1.5)))
    ) {
      setKingLeft(kingLeft => kingLeft - characterWidth)
      moveRooks(37)
    }
  }

  const moveUp = () => {
    if(
      ((kingTop > (characterWidth * 0.5)) && ((kingLeft < (characterWidth * 1.5)) || (kingLeft > (characterWidth * 2.5))))
      || ((kingTop > (characterWidth * 1.5)) && ((kingLeft > (characterWidth * 1.5)) && (kingLeft < (characterWidth * 2.5))))
    ) {
      setKingTop(kingTop => kingTop - characterHeight)
      moveRooks(38)
    }
  }

  const moveRight = () => {
    if(
      ((kingTop < ((characterHeight * 0.5))) && (((kingLeft < (characterWidth * 0.5)) && (kingLeft > (characterWidth * -0.5))) || ((kingLeft > (characterWidth * 2.5)) && (kingLeft < characterWidth * 3.5))))
      || (((kingTop > (characterHeight * 0.5)) && (kingTop < (characterHeight * 2.5))) && (kingLeft < characterWidth * 3.5))
      || (((kingTop > (characterHeight * 2.5)) && (kingTop < (characterHeight * 4.5))) && (kingLeft < (characterWidth * 2.5)))
    ) {
      setKingLeft(kingLeft => kingLeft + characterWidth)
      moveRooks(39)
    }
  }

  const moveDown = () => {
    if(
      ((kingTop < (characterHeight * 1.5)) && ((kingLeft < (characterWidth * 0.5)) || (kingLeft > (characterWidth * 3.5))))
      || ((kingTop < (characterHeight * 3.5)) && (((kingLeft > (characterWidth * 0.5)) && (kingLeft < (characterWidth * 1.5))) || ((kingLeft > (characterWidth * 2.5)) && (kingLeft < (characterWidth * 3.5)))))
      || ((kingTop < (characterHeight * 4.5)) && ((kingLeft > (characterWidth * 1.5)) && (kingLeft < (characterWidth * 2.5))))
    ) {
      setKingTop(kingTop => kingTop + characterHeight)
      moveRooks(40)
    }
  }

  const returnToMenu = () => {
    alert('Menu is currently under construction and is therefore unavailable.')
  }

  const resetBoard = () => {
    setKingLeft(kingLeft => ((screenWidth / 5) * 2))
    setKingTop(kingLeft => ((screenWidth / 5) * 3))
    setRookMirrorLeft(rookMirrorLeft => ((screenWidth / 5) * 2))
    setRookMirrorTop(rookMirrorTop => ((screenWidth / 5)))
    setRookFollowLeft(rookFollowLeft => ((screenWidth / 5) * 2))
    setRookFollowTop(rookFollowTop => ((screenWidth / 5) * 5))
  }

  const checkEnding = () => {
    if(
      (((kingTop > (rookMirrorTop * 0.9)) && (kingTop < (rookMirrorTop * 1.1))) && ((kingLeft > (rookMirrorLeft * 0.9)) && (kingLeft < (rookMirrorLeft * 1.1))))
    ) {
      alert('Game over')
      //setTimeout(gameOver, 500)
    } else if (
      ((((rookMirrorTop > (characterWidth * 0.5)) && (rookMirrorTop < (characterWidth * 1.5))) && ((rookMirrorLeft > (characterWidth * 0.5)) && (rookMirrorLeft < (characterWidth * 1.5))))
      || (((rookMirrorTop > (characterWidth * 0.5)) && (rookMirrorTop < (characterWidth * 1.5))) && ((rookMirrorLeft > (characterWidth * 2.5)) && (rookMirrorLeft < (characterWidth * 3.5)))))
      &&
      ((((rookFollowTop > (characterWidth * 0.5)) && (rookFollowTop < (characterWidth * 1.5))) && ((rookFollowLeft > (characterWidth * 0.5)) && (rookFollowLeft < (characterWidth * 1.5))))
      || (((rookFollowTop > (characterWidth * 0.5)) && (rookFollowTop < (characterWidth * 1.5))) && ((rookFollowLeft > (characterWidth * 2.5)) && (rookFollowLeft < (characterWidth * 3.5)))))
    ) {
      alert('You Win!')
    }
  }

  return (
    <GestureHandlerRootView
      onTouchStart={e => {
        this.touchY = e.nativeEvent.pageY
        this.touchX = e.nativeEvent.pageX
      }}
      onTouchEnd={e => {
        if(this.touchX - e.nativeEvent.pageX > 100) {
          moveLeft()
        } else if(this.touchY - e.nativeEvent.pageY > 100) {
          moveUp()
        } else if(this.touchX - e.nativeEvent.pageX < - 100) {
          moveRight()
        } else if(this.touchY - e.nativeEvent.pageY < - 100) {
          moveDown()
        }
        checkEnding()
        fadeIn()
      }
    }
      style={styles.container}
    >
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Level 1</Text>
        <Text style={styles.headerPreamble}>The Heart</Text>
      </View>
      <View style={styles.gameContainer}>
        <Board></Board>
        <Animated.View style={{backgroundColor: 'blue'}}>
          <King
            kingLeft = {kingLeft}
            kingTop = {kingTop}
            characterWidth = {characterWidth}
            characterHeight = {characterHeight}
          ></King>
        </Animated.View>
        <RookMirror
          rookMirrorLeft = {rookMirrorLeft}
          rookMirrorTop = {rookMirrorTop}
          characterWidth = {characterWidth}
          characterHeight = {characterHeight}
          
          //style={styles.king}
        ></RookMirror>
        <RookFollow
          rookFollowLeft = {rookFollowLeft}
          rookFollowTop = {rookFollowTop}
          characterWidth = {characterWidth}
          characterHeight = {characterHeight}
          
          //style={styles.king}
        ></RookFollow>
        <StatusBar style="auto" />
      </View>
      <View style={styles.buttonsContainer}>
        <Button 
          title='Reset level' 
          color='red'
          onPress={resetBoard}
        />
        <Button 
          title='Main menu' 
          color='red'
          onPress={returnToMenu}
        />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: 'rgb(125, 125, 125)',
  },
  headerContainer : {
    height: ((Dimensions.get("screen").height - ((Dimensions.get("screen").width / 5) * 6)) / 3),
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle : {
    fontSize: 30,
    color: 'white'
  },
  headerPreamble : {
    fontSize: 20,
    color: 'white'
  },
  gameContainer: {
    backgroundColor: 'rgb(75, 75, 75)',
    height: (Dimensions.get("screen").width / 5) * 6,
  },
  buttonsContainer: {
    height: ((Dimensions.get("screen").height - ((Dimensions.get("screen").width / 5) * 6)) / 3),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 20
  },
});