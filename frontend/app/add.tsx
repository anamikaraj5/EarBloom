import { Text, View, StyleSheet, ImageBackground, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import { useRouter } from 'expo-router'
import { Picker } from '@react-native-picker/picker'
import { useState } from 'react'
import { Image } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import Footer from '@/components/footer';


export default function Add() {
  const router = useRouter()

  const [productname,setProductName] = useState<string>('')
  const [productid,setProductId] = useState<string>('')
  const [price,setPrice] = useState<Number>(0)
  const [category,setCategory] = useState<string>('')
  const [type,setType] = useState<string>('')
  const [quantity,setQuantity] = useState<Number>(0)
  const [description,setDescription] = useState<string>('')
  const [images, setImages] = useState<string[]>([]);


  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: false,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
  
    if (!result.canceled) {
      const asset = result.assets[0];
      setImages((prev) => [...prev, asset.uri]);
    }
    
  };
  

  const handleAdd = async () => {
    const formData = new FormData();
  
    formData.append('productname', productname);
    formData.append('productid', productid);
    formData.append('price', price.toString());
    formData.append('category', category);
    formData.append('type', type);
    formData.append('quantity', quantity.toString());
    formData.append('description', description);
  
    // if (images.length > 0) {
    //   const uri = images[0];
    //   const filename = uri.split('/').pop() || 'image.jpg';
    //   const match = /\.(\w+)$/.exec(filename);
    //   const ext = match?.[1]?.toLowerCase();
    //   const mimeType = ext ? `image/${ext}` : 'image/jpeg';

    //   const response = await fetch(uri);
    //   const blob = await response.blob();
  
    //   formData.append('image', blob, filename);
    // }
  
    if (images.length > 0) {
      const uri = images[0];
      const filename = uri.split('/').pop() || 'image.jpg';
      const match = /\.(\w+)$/.exec(filename);
      const ext = match?.[1]?.toLowerCase();
      const mimeType = ext ? `image/${ext}` : 'image/jpeg';
    
      formData.append('image', {
        uri: uri,
        name: filename,
        type: mimeType,
      } as unknown as Blob);
      
    }
     
    try {
      const response = await fetch('http://192.168.214.134:3000/product/addproduct', {
        method: 'POST',
        body: formData,
        credentials: 'include', 
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Adding of an earring failed');
      }
  
      Alert.alert('Success', data.message);
  
      // reset fields
      setProductName('');
      setProductId('');
      setPrice(0);
      setCategory('');
      setType('');
      setQuantity(0);
      setDescription('');
      setImages([]);
  
    } catch (error: any) {
      console.error("Error during adding of earring:", error);
      Alert.alert('Something went wrong', error.message);
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
          <Text style={styles.head}>Add Earring</Text>

          <View style={styles.inputs}>
            <Text style={styles.label}>Product Name</Text>
            <TextInput style={styles.input} value={productname} onChangeText={setProductName} placeholder="Enter product name" placeholderTextColor="#aaa"  />

            <Text style={styles.label}>Product Id</Text>
            <TextInput style={styles.input} value={productid} onChangeText={setProductId} placeholder="Enter product id" placeholderTextColor="#aaa" />

            <Text style={styles.label}>Price</Text>
            <TextInput style={styles.input}  value={price.toString()} onChangeText={(text) => setPrice(parseFloat(text) || 0)} placeholder="Enter price" placeholderTextColor="#aaa" />

            <Text style={styles.label}>Category</Text>
            <TextInput style={styles.input} value={category} onChangeText={setCategory} placeholder="Enter category" placeholderTextColor="#aaa" />

            <Text style={styles.label}>Type</Text>
            <View style={styles.selectbox}>
            <Picker selectedValue={type} onValueChange={(value) => setType(value)} style={styles.select}>
                <Picker.Item label="Select Type" value="" />
                <Picker.Item label="Gold" value="Gold" />
                <Picker.Item label="Silver" value="Silver" />
                <Picker.Item label="Rosegold" value="Rosegold" />
            </Picker>
            </View>



            <Text style={styles.label}>Quantity</Text>
            <TextInput style={styles.input} value={quantity.toString()} onChangeText={(text) => setQuantity(parseInt(text) || 0)} placeholder="Enter quantity" placeholderTextColor="#aaa" />

            <Text style={styles.label}>Description</Text>
            <TextInput style={styles.input} value={description} onChangeText={setDescription} placeholder="Enter description" placeholderTextColor="#aaa" />
          </View>


          <TouchableOpacity onPress={pickImage} style={styles.button3}>
            <Text style={styles.buttonText}>Upload Image</Text>
          </TouchableOpacity>

          <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 10 }}>
            {images.map((img, index) => (
              <Image
                key={index}
                source={{ uri: img }}
                style={styles.imagess}
              />
            ))}
          </View>



          <TouchableOpacity style={styles.button1} onPress={handleAdd}>
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>

      <Footer/>
    </ImageBackground>
  )
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
  
  button1: {
    backgroundColor: '#d2691e',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  imagess:{
    width: 60, height: 60, margin: 5, borderRadius: 6
  },
  button3 :{
    backgroundColor: '#a0522d',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 10,
  }
})