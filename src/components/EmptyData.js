import {View, Text, StyleSheet} from 'react-native';

export default function EmptyData() {
  return (
    <View style={styles.container}>
      <Text style={styles.txt}>No data found</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {
    color: '#000000',
  },
});
