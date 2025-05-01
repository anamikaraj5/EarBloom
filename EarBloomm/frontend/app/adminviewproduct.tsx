import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router'
export default function ProductDetails() {

    const router = useRouter()
  const { productid } = useLocalSearchParams()
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`http://192.168.214.134:3000/product/viewproduct/${productid}`, {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Product not found');
        }

        const data = await response.json();
        setProduct(data);
      } 
      catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [productid]);

  if (!product) {
    return <Text style={styles.productnotfound}>Product not found</Text>;
  }

  return (
    <ScrollView style={styles.container}>
        <TouchableOpacity style={styles.back} onPress={() => router.push('/viewall')}>
            <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
      <Image source={{ uri: product.images[0] }} style={styles.image} />
      <Text style={styles.name}>{product.productname}</Text>
      <Text style={styles.text}>{product.type} {product.category}</Text>
      <Text style={styles.price}>₹{product.price}</Text>
      <Text style={styles.description}>{product.description}</Text>
      <Text style={styles.available}>Available: {product.quantity}</Text>

      <View style={styles.buttons}>
      <TouchableOpacity style={styles.button1} onPress={() => router.push({pathname: '/updateproduct',
      params: {
      productid: product.productid,
      productname: product.productname,
      price: product.price.toString(),
      description: product.description,
      category: product.category,
      type: product.type,
      quantity: product.quantity.toString(),
      image: product.images?.[0] || '',
    }
  })}
>
  <Text style={styles.buttonText}>Update</Text>
</TouchableOpacity>


          <TouchableOpacity style={styles.button1} onPress={() => router.push({ pathname: '/deleteproduct', params: { productid: product.productid } })} >
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  back:{
    backgroundColor: '#d2691e',
    marginTop:30,
    marginBottom:50,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
    width:100
  },
  image: {
    width: 360,
    height: 300, 
    borderRadius: 10,
    marginBottom: 20,
  },

  name: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  text: {
    fontSize: 18,
    color: '#555',
  },
  price: {
    fontSize: 25,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  description: {
    fontSize: 16,
    marginVertical: 10,
  },
  available: {
    fontSize: 16,
    color: 'green',
  },
  productnotfound:{
        marginTop: 50, 
        textAlign: 'center'
  },
 buttons:{
    flexDirection:'row',
    gap:30,
    alignSelf:'center',
    marginTop:70
 },
  button1:{
    backgroundColor: '#8B4513',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
