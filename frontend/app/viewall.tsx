import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import Footer from '@/components/footer';

interface Product {
  _id: string;
  productname: string;
  productid: string
  type: string;
  category: string;
  price: number;
  images: string;
}

export default function ViewProducts() {

  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://192.168.214.134:3000/product/viewallproducts', {
          method: 'GET',
          credentials: 'include',
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
  
        const data = await response.json();
        setProducts(data);
      } 
      catch (err) {
        console.error('Error:', err);
      }
    };
  
    fetchProducts();
  }, []);
  

  return (

    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push({pathname: '/viewproduct',params: {productid: item.productid }})}>
            <View style={styles.card}>
              <Image source={{ uri: item.images[0] }} style={styles.image} resizeMode='contain'/>
              <Text style={styles.name}>{item.productname}</Text>
              <Text style={styles.text}>{item.type} {item.category}</Text>
              <Text style={styles.text2}>₹{item.price}</Text>
            </View>
          </TouchableOpacity>

        )}
      />

      <Footer/>
    </View>
  );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 12,
      backgroundColor: '#f5deb3',
    },
    card: {
      marginBottom: 50,
      padding: 12,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      backgroundColor:'#fff',
      
    },
    image: {
      width: '100%',
      height: 200,
      borderRadius: 10,
      alignSelf: 'center', 
      marginBottom:16,
    },
    
    
    name: {
      fontSize: 25,
      fontWeight: 'bold',
      marginBottom:10,
    },
    text: {
      fontSize: 14,
      color: '#555',
    },
    text2:{
        fontSize:17,
        fontWeight:'bold'
    },
  });
  