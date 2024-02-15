import { View, Dimensions } from 'react-native'

const Board = () => {
    const screenWidth = Dimensions.get("screen").width
    const squareWidth = screenWidth / 5
    const SquareHeight = screenWidth / 5

    return(
        <View style = {{
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{backgroundColor: 'bisque', height: SquareHeight, width: squareWidth}}></View>
                <View style={{backgroundColor: 'burlywood', height: SquareHeight, width: squareWidth}}></View>
                <View style={{height: SquareHeight, width: squareWidth}}></View>
                <View style={{backgroundColor: 'burlywood', height: SquareHeight, width: squareWidth}}></View>
                <View style={{backgroundColor: 'bisque', height: SquareHeight, width: squareWidth}}></View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{backgroundColor: 'burlywood', height: SquareHeight, width: squareWidth}}></View>
                <View style={{backgroundColor: 'gold', height: SquareHeight, width: squareWidth}}></View>
                <View style={{backgroundColor: 'burlywood', height: SquareHeight, width: squareWidth}}></View>
                <View style={{backgroundColor: 'gold', height: SquareHeight, width: squareWidth}}></View>
                <View style={{backgroundColor: 'burlywood', height: SquareHeight, width: squareWidth}}></View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{backgroundColor: 'bisque', height: SquareHeight, width: squareWidth}}></View>
                <View style={{backgroundColor: 'burlywood', height: SquareHeight, width: squareWidth}}></View>
                <View style={{backgroundColor: 'bisque', height: SquareHeight, width: squareWidth}}></View>
                <View style={{backgroundColor: 'burlywood', height: SquareHeight, width: squareWidth}}></View>
                <View style={{backgroundColor: 'bisque', height: SquareHeight, width: squareWidth}}></View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{backgroundColor: 'bisque', height: SquareHeight, width: squareWidth}}></View>
                <View style={{backgroundColor: 'burlywood', height: SquareHeight, width: squareWidth}}></View>
                <View style={{backgroundColor: 'bisque', height: SquareHeight, width: squareWidth}}></View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{backgroundColor: 'burlywood', height: SquareHeight, width: squareWidth}}></View>
                <View style={{backgroundColor: 'bisque', height: SquareHeight, width: squareWidth}}></View>
                <View style={{backgroundColor: 'burlywood', height: SquareHeight, width: squareWidth}}></View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{backgroundColor: 'burlywood', height: SquareHeight, width: squareWidth}}></View>
            </View>
        </View>
    )
}

export default Board