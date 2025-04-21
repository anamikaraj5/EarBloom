import { Text, View, StyleSheet, ImageBackground, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router'
import Footer from '@/components/footer'

export default function App() {
  const router = useRouter()
  return (

    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.bgimage}>
          <Image
            source={require('../assets/images/bg1.png')}
            style={styles.images}
            resizeMode="cover"
          />
          <Text style={styles.Head}>EarBloom</Text>
        </View>

        <View style={styles.allimage}>
          <View style={styles.earringItem}>
            <Image source={require('../assets/images/mainjumka.jpg')} style={styles.earringimg} />
            <Text style={styles.text}>Jhumkas</Text>
          </View>

          <View style={styles.earringItem}>
            <Image source={require('../assets/images/mainhoop.jpeg')} style={styles.earringimg} />
            <Text style={styles.text}>Hoops</Text>
          </View>

          <View style={styles.earringItem}>
            <Image source={require('../assets/images/mainstud.jpeg')} style={styles.earringimg} />
            <Text style={styles.text}>Studs</Text>
          </View>
        </View>
      </ScrollView>
      <Footer/>
    </View>
    
  );
}


const styles = StyleSheet.create({
    scrollContent: {
        justifyContent: 'center',
      },
    container: {
        flex: 1,
        backgroundColor: '#f5deb3',
      },
    bgimage: {
        position: 'relative',
        width: '100%',
        height: 250,
        alignSelf: 'center',
      },
      
      images: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
      },
      
      Head: {
        position: 'absolute',
        top: '40%', 
        left: 170,
        color: '#fff',
        fontSize: 40,
        fontWeight: 'bold',
      },
      
      allimage: {
        justifyContent:'center',
        marginTop:40,
      },
      earringItem: {
        alignItems: 'center',
      },
      earringimg: {
        width: 270,
        height: 200,
        borderRadius: 10,
      },
      text: {
        marginTop: 8,
        fontSize: 22,
        fontWeight: 'bold',
        color: '#8b4513',
        marginBottom:50
      },
});