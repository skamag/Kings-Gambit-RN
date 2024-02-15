import React from 'react';
import { View, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const BoardAI = () => {
  // Function to generate alternating colors
  const getAlternateColor = (index) => (index % 2 === 0 ? 'blue' : 'red');

  // Create the grid
  const renderGrid = () => {
    const rows = 5;
    const cols = 6;

    const grid = [];

    for (let i = 0; i < rows; i++) {
      const row = [];

      for (let j = 0; j < cols; j++) {
        const color = getAlternateColor(i * cols + j);

        row.push(
          <LinearGradient
            key={j}
            colors={[color, color]}
            style={styles.gridItem}
          />
        );
      }

      grid.push(
        <View key={i} style={styles.gridRow}>
          {row}
        </View>
      );
    }

    return grid;
  };

  return <View style={styles.container}>{renderGrid()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridRow: {
    flexDirection: 'row',
  },
  gridItem: {
    flex: 1,
    aspectRatio: 1, // Maintain square aspect ratio
  },
});

export default BoardAI;
