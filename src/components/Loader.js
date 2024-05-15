import {View, Text, StyleSheet, ActivityIndicator, Modal} from 'react-native';

export default function Loader({isVisible}) {
  return (
    <Modal transparent visible={isVisible}>
      <View style={styles.container}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
});
