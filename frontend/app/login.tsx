import { Text, View, StyleSheet, ImageBackground, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import { useRouter } from 'expo-router'
import React,{useState} from 'react';

export default function Login() {
  const router = useRouter()

  const [email,setEmail] = useState<string>('')
  const [password,setPassword] = useState<string>('')


  const handlelogin = async () => {
    try{
      const response = await fetch('http://192.168.214.134:3000/user/login',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        credentials: 'include',
        body:JSON.stringify({email,password})
      })

      const data = await response.json()

      if(!response.ok){
        throw new Error(data.message || 'Login Failed')
      }

      Alert.alert('Success',data.message)
      router.push('/home')
    }

    catch(error){
      console.error('Error during login',error)
      Alert.alert('Something went wrong')
    }
  }

  return (
    <ImageBackground
      source={require('../assets/images/bg1.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
          <Text style={styles.head}>Login</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Enter your email" placeholderTextColor="#aaa"  />

            <Text style={styles.label}>Password</Text>
            <TextInput style={styles.input} secureTextEntry value={password} onChangeText={setPassword} placeholder="Enter your password" placeholderTextColor="#aaa" />
          </View>

          <TouchableOpacity style={styles.button} onPress={handlelogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account?</Text>
            <TouchableOpacity>
              <Text style={styles.signup} onPress={() => router.push('/signup')}>Signup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',

  },
  scrollContent: {
    marginTop:100,
    justifyContent: 'center',
    padding: 24,
  },
  container: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    padding: 24,
    borderRadius: 12,
  },
  head: {
    color: '#8B4513',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  inputGroup: {
    width: '100%',
    marginBottom: 24,
  },
  label: {
    color: '#a0522d',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#a0522d',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 16,
    backgroundColor: '#fff',
    color: '#000',
  },
  button: {
    backgroundColor: '#d2691e',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#000',
    marginRight: 8,
  },
  signup: {
    fontSize: 14,
    color: '#d2691e',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});