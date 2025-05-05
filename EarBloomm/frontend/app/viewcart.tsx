import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router'; 

interface CartItem {
  _id: string;
  product: {
    _id: string;
    images: string[];
    productname: string;
    price: number;
  };
  quantity: number;
}

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [message, setMessage] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await fetch('http://192.168.214.134:3000/cart', {
        credentials: 'include',
        method: 'GET',
      });
      const data = await response.json();
      setCartItems(data);
    } catch (err) {
      console.error('Error fetching cart items', err);
      setMessage('Error fetching cart items');
    }
  };

  const increaseQuantity = async (productId: string) => {
    try {
      const response = await fetch(`http://192.168.214.134:3000/cart/update/${productId}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity: 1 }),
      });
      const data = await response.json();
      if (data.message === 'Quantity updated') fetchCartItems();
      else setMessage(data.message);
    } catch (err) {
      console.error('Error increasing quantity', err);
      setMessage('Error increasing quantity');
    }
  };

  const decreaseQuantity = async (productId: string) => {
    try {
      const response = await fetch(`http://192.168.214.134:3000/cart/update/${productId}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity: -1 }),
      });
      const data = await response.json();
      if (data.message === 'Quantity updated') fetchCartItems();
      else setMessage(data.message);
    } catch (err) {
      console.error('Error decreasing quantity', err);
      setMessage('Error decreasing quantity');
    }
  };

  const removeProduct = async (productId: string) => {
    try {
      const response = await fetch(`http://192.168.214.134:3000/cart/remove/${productId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      const data = await response.json();
      if (data.message === 'Product removed from cart') fetchCartItems();
      else setMessage(data.message);
    } catch (err) {
      console.error('Error removing product', err);
      setMessage('Error removing product');
    }
  };

  const getTotalAmount = () => {
    return cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  const handleProceedToPay = () => {
    const total = getTotalAmount(); 
    Alert.alert('Proceeding to Payment', `Total Amount: ₹${total}`);
    
    router.push(`/payment?total=${total}`);
  };
  

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Your Cart</Text>
        {message && <Text style={styles.message}>{message}</Text>}
        {cartItems.length === 0 ? (
          <Text style={styles.emptyCart}>Your cart is empty.</Text>
        ) : (
          cartItems.map((item) => (
            <View key={item._id} style={styles.cartItem}>
              <TouchableOpacity onPress={() => router.push(`/userviewproduct`)}>
                <Image source={{ uri: item.product.images[0] }} style={styles.productImage} />
              </TouchableOpacity>

              <View style={styles.itemDetails}>
                <Text style={styles.productName}>{item.product.productname}</Text>
                <Text style={styles.productPrice}>₹{item.product.price}</Text>
                <View style={styles.quantityControls}>
                  <TouchableOpacity
                    onPress={() => decreaseQuantity(item.product._id)}
                    style={styles.quantityButton}
                  >
                    <Text style={styles.buttonText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{item.quantity}</Text>
                  <TouchableOpacity
                    onPress={() => increaseQuantity(item.product._id)}
                    style={styles.quantityButton}
                  >
                    <Text style={styles.buttonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity
                onPress={() => removeProduct(item.product._id)}
                style={styles.removeButton}
              >
                <Text style={styles.buttonText}>Remove</Text>
              </TouchableOpacity>
            </View>

          ))
        )}
      </ScrollView>

      {cartItems.length > 0 && (
        <View style={styles.footer}>
          <Text style={styles.totalText}>Total: ₹{getTotalAmount()}</Text>
          <TouchableOpacity style={styles.payButton} onPress={handleProceedToPay}>
            <Text style={styles.payButtonText}>Proceed to Pay</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  message: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 16,
  },
  emptyCart: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 20,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 16,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 16,
    marginTop: 4,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  quantityButton: {
    backgroundColor: '#8B4513',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  quantityText: {
    fontSize: 16,
  },
  removeButton: {
    backgroundColor: '#FF6347',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f9f9f9',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  payButton: {
    backgroundColor: '#228B22',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  payButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CartPage;


