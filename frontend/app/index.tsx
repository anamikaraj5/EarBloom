import { Text, View, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router'

export default function App() {
  const router = useRouter()
  return (
    <ImageBackground 
      source={require('../assets/images/bg1.png')} 
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.text}>EarBloom</Text>

        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.button} onPress={() => router.push('/signup')}>
            <Text style={styles.buttonText}>Signup</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => router.push('/login')}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#8B4513',
    fontSize: 60,
    fontWeight: 'bold',
    marginBottom: 30, // space below title
  },
  buttonGroup: {
    flexDirection:"row", // vertical arrangement
    gap: 16, // spacing between buttons (RN 0.71+)
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#d2691e',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    minWidth: 160,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 30,
    fontWeight: '600',
  },
});



