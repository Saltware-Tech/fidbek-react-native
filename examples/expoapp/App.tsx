import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Fidbek from '@saltware/fidbek-react-native';

export default function App() {
  const isLinked = typeof Fidbek.configure === 'function';

  return (
    <View style={styles.container}>
      <Text>Fidbek linked: {isLinked ? 'yes' : 'no'}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
