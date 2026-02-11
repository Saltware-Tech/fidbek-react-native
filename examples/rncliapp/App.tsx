import React, {useState} from 'react';
import {
  Alert,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';
import Fidbek from '@fidbek/react-native';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [token, setToken] = useState('YOUR_PUBLIC_TOKEN');
  const [status, setStatus] = useState('Hazir');

  const run = async (label: string, action: () => Promise<void>) => {
    try {
      setStatus(`${label} calisiyor...`);
      await action();
      setStatus(`${label} basarili`);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Bilinmeyen hata';
      setStatus(`${label} hatasi: ${message}`);
      Alert.alert('Fidbek Hata', message);
    }
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        {backgroundColor: isDarkMode ? '#111827' : '#f3f4f6'},
      ]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.card}>
        <Text style={styles.title}>Fidbek RN CLI Canli Test</Text>
        <Text style={styles.label}>Public Token</Text>
        <TextInput
          value={token}
          onChangeText={setToken}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="YOUR_PUBLIC_TOKEN"
          style={styles.input}
        />

        <Pressable
          style={styles.button}
          onPress={() =>
            run('Configure', () =>
              Fidbek.configure({token, shakeToOpenEnabled: true}),
            )
          }>
          <Text style={styles.buttonText}>Configure</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={() => run('Open', () => Fidbek.open())}>
          <Text style={styles.buttonText}>Open</Text>
        </Pressable>

        <Pressable
          style={[styles.button, styles.buttonMuted]}
          onPress={() => run('Shutdown', () => Fidbek.shutdown())}>
          <Text style={styles.buttonText}>Shutdown</Text>
        </Pressable>

        <Text style={styles.status}>{status}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#111827',
  },
  button: {
    backgroundColor: '#111827',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonMuted: {
    backgroundColor: '#4b5563',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },
  status: {
    fontSize: 13,
    color: '#111827',
  },
});

export default App;
