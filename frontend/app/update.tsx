import { Text, View, StyleSheet, ImageBackground, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { useRouter } from 'expo-router'
import { Picker } from '@react-native-picker/picker'

export default function Update() {
  const router = useRouter()
  
  return (
    <ImageBackground
      source={require('../assets/images/bg1.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
          <Text style={styles.head}>Update Earring</Text>

          <View style={styles.inputs}>
            <Text style={styles.label}>Product Name</Text>
            <TextInput style={styles.input} placeholder="Enter product name" placeholderTextColor="#aaa"  />

            <Text style={styles.label}>Product Id</Text>
            <TextInput style={styles.input} placeholder="Enter product id" placeholderTextColor="#aaa" />

            <Text style={styles.label}>Price</Text>
            <TextInput style={styles.input} placeholder="Enter price" placeholderTextColor="#aaa" />

            <Text style={styles.label}>Category</Text>
            <TextInput style={styles.input} placeholder="Enter category" placeholderTextColor="#aaa" />

            <Text style={styles.label}>Type</Text>
            <View style={styles.selectbox}>
            <Picker style={styles.select}>
                <Picker.Item label="Select Type" value="" />
                <Picker.Item label="Gold" value="gold" />
                <Picker.Item label="Silver" value="silver" />
                <Picker.Item label="Rosegold" value="rosegold" />
            </Picker>
            </View>



            <Text style={styles.label}>Quantity</Text>
            <TextInput style={styles.input} placeholder="Enter quantity" placeholderTextColor="#aaa" />

            <Text style={styles.label}>Description</Text>
            <TextInput style={styles.input} placeholder="Enter description" placeholderTextColor="#aaa" />
          </View>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',

  },
  scrollContent: {
    flexGrow: 1,
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
  inputs: {
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
  selectbox: {
    borderWidth: 1,
    borderColor: '#a0522d',
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  select: {
    height: 50,
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