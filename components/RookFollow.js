import {View, Image} from 'react-native'

const RookFollow = ({rookFollowLeft, rookFollowTop, characterWidth, characterHeight}) => {
    return(
        <View style = {{
            position: 'absolute',
            width: characterWidth,
            height: characterHeight,
            left: rookFollowLeft,
            top: rookFollowTop,
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Image style = {{height: characterHeight - 20, aspectRatio: 1, resizeMode: 'contain'}} source={require('../assets/rookWhite.png')} />
        </View>
    )
}

export default RookFollow