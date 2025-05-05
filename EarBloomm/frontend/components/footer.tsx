import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react'
import { getUserProfile } from './profile'

export default function Footer() {
  const router = useRouter();
  const [role, setRole] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      const profile = await getUserProfile();
      if (profile) {
        setRole(profile.role);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch('http://192.168.214.134:3000/user/logout', {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        Alert.alert('Success', 'Logged out successfully');
        router.replace('/login');
      } else {
        Alert.alert('Error', 'Failed to logout');
      }
    } catch (error) {
      console.error('Logout failed:', error);
      Alert.alert('Error', 'Something went wrong');
    }
  };

  return (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.button2} onPress={() => router.push('/home')}>
        <Text style={styles.buttonText}>Home</Text>
      </TouchableOpacity>

      {role === 'admin' && (
        <TouchableOpacity style={styles.button2} onPress={() => router.push('/add')}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.button2} onPress={() => router.push('/viewall')}>
        <Text style={styles.buttonText}>View</Text>
      </TouchableOpacity>

      {role === 'user' && (
        <TouchableOpacity style={styles.button2} onPress={() => router.push('/viewcart')}>
          <Text style={styles.buttonText}>Cart</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.button2} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 40,
    backgroundColor: '#d2691e',
    width: '100%',
    bottom: 0,
  },
  button2: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});


