import {View, Image} from 'react-native'

const King = ({kingLeft, kingTop, characterWidth, characterHeight}) => {
    return(
        <View style = {{
            position: 'absolute',
            width: characterWidth,
            height: characterHeight,
            left: kingLeft,
            top: kingTop,
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Image style = {{height: characterHeight - 20, aspectRatio: 1, resizeMode: 'contain'}} source={require('../assets/kingBlack.png')} />
        </View>
    )
}

export default King