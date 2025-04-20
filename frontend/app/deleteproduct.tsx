import { useRouter, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, Alert } from 'react-native';

export default function DeleteProductPage() {
  const { productid } = useLocalSearchParams();
  const router = useRouter();
  const [message, setMessage] = useState('Deleting product...');

  useEffect(() => {
    const deleteProduct = async () => {
      try {
        const response = await fetch(`http://192.168.214.134:3000/product/deleteproduct/${productid}`, {
          method: 'DELETE',
          credentials: 'include',
        })

        const data = await response.json();
        if (response.ok) {
          setMessage(data.message || 'Product deleted successfully');
          Alert.alert('Success', data.message || 'Product deleted successfully');
          router.push('/viewall');
        } 
        else {
          setMessage('Failed to delete product');
          Alert.alert('Error', data.message || 'Failed to delete product');
          router.back();
        }
      } 
      
      catch (error) {
        console.error('Error deleting product:', error);
        setMessage('Something went wrong');
        Alert.alert('Error', 'Something went wrong');
        router.back();
      }
    };

    if (productid) {
      deleteProduct();
    }
  }, [productid]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{message}</Text>
    </View>
  );
}

  