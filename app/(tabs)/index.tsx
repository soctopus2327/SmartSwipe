import { Text, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>
        Find Your Next Research Paper with <Text style={{ color: '#468ef5' }}>PaperMatch</Text>
      </Text>
      <Text style={{ textAlign: 'center', marginVertical: 20, color: '#555' }}>
        Discover academic papers tailored to your interests using our smart matching algorithm. Swipe right to save, swipe left to pass.
      </Text>

      <TouchableOpacity
        onPress={() => router.push('/explore')}
        style={{ backgroundColor: '#468ef5', padding: 15, borderRadius: 10, marginBottom: 10 }}
      >
        <Text style={{ color: 'white', fontWeight: '600', textAlign: 'center' }}>Get Started</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ borderWidth: 2, borderColor: '#468ef5', padding: 15, borderRadius: 10 }}
      >
        <Text style={{ color: '#468ef5', fontWeight: '600', textAlign: 'center' }}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
}
