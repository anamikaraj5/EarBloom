import { Text, View, StyleSheet, ImageBackground, TouchableOpacity, ScrollView, TextInput, Alert, Image } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import Footer from '@/components/footer';

export default function UpdateProduct() {
  const router = useRouter();
  const { productid } = useLocalSearchParams();

  const [productname, setProductName] = useState('');
  const [price, setPrice] = useState<number>(0);
  const [category, setCategory] = useState('');
  const [type, setType] = useState('');
  const [quantity, setQuantity] = useState<number>(0);
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://192.168.214.134:3000/product/viewproduct/${productid}`, {
          method: 'GET',
          credentials: 'include',
        });
        const data = await response.json();
        setProductName(data.productname);
        setPrice(data.price);
        setCategory(data.category);
        setType(data.type);
        setQuantity(data.quantity);
        setDescription(data.description);
        setImages(data.images || []);
      } catch (error) {
        console.error('Failed to fetch product:', error);
        Alert.alert('Error', 'Failed to fetch product details');
      }
    };
    fetchProduct();
  }, [productid]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: false,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      setImages([asset.uri]); // Only one image allowed
    }
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    formData.append('productname', productname);
    formData.append('price', price.toString());
    formData.append('category', category);
    formData.append('type', type);
    formData.append('quantity', quantity.toString());
    formData.append('description', description);

    if (images.length > 0 && !images[0].startsWith('data:')) {
      const uri = images[0];
      const filename = uri.split('/').pop() || 'image.jpg';
      const match = /\.(\w+)$/.exec(filename);
      const ext = match?.[1]?.toLowerCase();
      const mimeType = ext ? `image/${ext}` : 'image/jpeg';
      const response = await fetch(uri);
      const blob = await response.blob();
      formData.append('image', blob, filename);
    }

    try {
      const response = await fetch('http://192.168.4.134:3000/product/updateproduct', {
        method: 'PUT',
        body: formData,
        credentials: 'include',
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || 'Update failed');

      Alert.alert('Success', 'Product updated successfully');
      router.push('/viewall');
    } catch (error: any) {
      console.error('Update error:', error);
      Alert.alert('Error', error.message);
    }
  };

  return (
    <ImageBackground source={require('../assets/images/bg1.png')} style={styles.background} resizeMode="cover">
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
          <Text style={styles.head}>Update Earring</Text>

          <View style={styles.inputs}>
            <Text style={styles.label}>Product Name</Text>
            <TextInput style={styles.input} value={productname} onChangeText={setProductName} />

            <Text style={styles.label}>Price</Text>
            <TextInput style={styles.input} value={price.toString()} onChangeText={(text) => setPrice(parseFloat(text) || 0)} />

            <Text style={styles.label}>Category</Text>
            <TextInput style={styles.input} value={category} onChangeText={setCategory} />

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
            <TextInput style={styles.input} value={quantity.toString()} onChangeText={(text) => setQuantity(parseInt(text) || 0)} />

            <Text style={styles.label}>Description</Text>
            <TextInput style={styles.input} value={description} onChangeText={setDescription} />
          </View>

          <TouchableOpacity onPress={pickImage} style={styles.button3}>
            <Text style={styles.buttonText}>Upload New Image</Text>
          </TouchableOpacity>

          <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 10 }}>
            {images.map((img, index) => (
              <Image key={index} source={{ uri: img }} style={styles.imagess} />
            ))}
          </View>

          <TouchableOpacity style={styles.button1} onPress={handleUpdate}>
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Footer />
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
  button1: {
    backgroundColor: '#d2691e',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 10,
  },
  button3: {
    backgroundColor: '#a0522d',
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
  imagess: {
    width: 60,
    height: 60,
    margin: 5,
    borderRadius: 6,
  },
});

