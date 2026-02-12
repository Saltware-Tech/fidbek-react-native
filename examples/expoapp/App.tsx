import { StatusBar } from 'expo-status-bar';
import { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  InteractionManager,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Fidbek from '@saltware/fidbek-react-native';

const PUBLIC_TOKEN = 'YOUR_PUBLIC_TOKEN';
const OPEN_DELAY_MS = 350;

export default function App() {
  const [configured, setConfigured] = useState(false);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState('Configuring...');

  const isLinked = useMemo(() => typeof Fidbek.configure === 'function', []);

  const run = async (label: string, action: () => Promise<void>) => {
    setBusy(true);
    try {
      setStatus(`${label} running...`);
      await action();
      setStatus(`${label} success`);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      setStatus(`${label} failed`);
      Alert.alert('Fidbek Error', message);
    } finally {
      setBusy(false);
    }
  };

  useEffect(() => {
    run('Configure', async () => {
      await Fidbek.configure({
        token: PUBLIC_TOKEN,
        shakeToOpenEnabled: true,
      });
      setConfigured(true);
    });
  }, []);

  const handleTrigger = async () => {
    await run('Open', async () => {
      if (!configured) {
        throw new Error('Configure is not ready yet.');
      }
      await new Promise<void>((resolve) => {
        InteractionManager.runAfterInteractions(() => resolve());
      });
      await new Promise<void>((resolve) => {
        setTimeout(() => resolve(), OPEN_DELAY_MS);
      });
      await Fidbek.open();
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Fidbek Platform Example App</Text>
        <Text style={styles.meta}>Expo (New Architecture)</Text>
        <Text style={styles.meta}>Module linked: {isLinked ? 'yes' : 'no'}</Text>
        <Text style={styles.meta}>Configured: {configured ? 'yes' : 'no'}</Text>
        <Text style={styles.meta}>Token: {PUBLIC_TOKEN}</Text>

        <Pressable
          style={[styles.button, styles.buttonSecondary, busy ? styles.buttonDisabled : null]}
          disabled={busy}
          onPress={handleTrigger}
        >
          <Text style={styles.buttonText}>Manual Trigger</Text>
        </Pressable>

        <Text style={styles.status}>{status}</Text>
      </View>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6fb',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 16,
    gap: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0b1220',
  },
  meta: {
    fontSize: 13,
    color: '#374151',
  },
  button: {
    backgroundColor: '#111827',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonSecondary: {
    backgroundColor: '#2563eb',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  status: {
    marginTop: 4,
    fontSize: 13,
    color: '#111827',
  },
});
