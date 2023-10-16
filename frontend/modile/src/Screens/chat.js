import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const data = [
  { id: '1', name: 'Item 1' },
  { id: '2', name: 'Item 2' },
  { id: '3', name: 'Item 3' },
  // Add more data items as needed
];

const MyFlatList = () => {
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>{item.name}</Text>
    </View>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Take up the entire available space
    padding: 16,
  },
  item: {
    backgroundColor: 'lightgray',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
  },
  itemText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default MyFlatList;
