import {View, Image} from 'react-native'

const RookMirror = ({rookMirrorLeft, rookMirrorTop, characterWidth, characterHeight}) => {
    return(
        <View style = {{
            position: 'absolute',
            width: characterWidth,
            height: characterHeight,
            left: rookMirrorLeft,
            top: rookMirrorTop,
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Image style = {{height: characterHeight - 20, aspectRatio: 1, resizeMode: 'contain'}} source={require('../assets/rookWhite.png')} />
        </View>
    )
}

export default RookMirror