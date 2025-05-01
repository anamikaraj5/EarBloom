import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';

const PaymentPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  
  const router = useRouter();

  useEffect(() => {
    // Ensure total is defined and parse it
    if (router.query.total) {
      setTotalAmount(parseFloat(router.query.total));
    } else {
      // Handle case where total is not passed correctly
      console.error('Total amount not passed to PaymentPage');
      setMessage('Total amount is missing.');
    }
  }, [router.query.total]);

  const handlePayment = async () => {
    if (!name || !email || !phone || !address) {
      setMessage('Please fill in all the fields.');
      return;
    }

    try {
      const paymentResponse = await fetch('http://192.168.214.134:3000/payment/pay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, address, amount: totalAmount }), // Include totalAmount in payment request
        credentials: 'include',
      });
      const paymentData = await paymentResponse.json();

      if (paymentData.message === 'Payment successful') {
        const removeCartResponse = await fetch('http://192.168.214.134:3000/cart/removeAll', {
          method: 'DELETE',
          credentials: 'include',
        });

        const removeCartData = await removeCartResponse.json();
        if (removeCartData.message === 'All items removed from cart and stock restored') {
          setMessage('Payment successful! All items have been removed from your cart.');
          router.push('/home');
        } else {
          setMessage('Error clearing cart after payment.');
        }
      } else {
        setMessage(paymentData.message || 'Payment failed. Please try again.');
      }
    } catch (err) {
      console.error('Error during payment', err);
      setMessage('Error during payment. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Payment</Text>
      {message && <Text style={styles.message}>{message}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />

      <Text style={styles.amountText}>Total Amount: ₹{totalAmount}</Text> {/* Display the total amount */}

      <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
        <Text style={styles.payButtonText}>Pay</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  payButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  payButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  message: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 16,
  },
  amountText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default PaymentPage;



