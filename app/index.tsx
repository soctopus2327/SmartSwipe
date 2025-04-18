import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function LandingScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.content}>
        <Image 
          source={require('../assets/images/papers-stack.png')} 
          style={styles.logo}
        />
        <Text style={styles.title}>Find Your Next{'\n'}Research Paper with{'\n'}
          <Text style={styles.highlight}>Inkwell</Text>
        </Text>
        <Text style={styles.subtitle}>
          Discover academic papers tailored to your interests using our smart matching algorithm. 
          Swipe right to save, swipe left to pass.
        </Text>
        <View style={styles.buttonContainer}>
          <Link href="/swipe" asChild>
            <TouchableOpacity style={styles.getStartedButton}>
              <Text style={styles.getStartedText}>Get Started</Text>
            </TouchableOpacity>
          </Link>
          <Link href="/reading-list" asChild>
            <TouchableOpacity style={styles.signInButton}>
              <Text style={styles.signInText}>Reading List</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 16,
    color: '#1a1a1a',
  },
  highlight: {
    color: '#007AFF',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 48,
    lineHeight: 24,
  },
  buttonContainer: {
    width: '100%',
    gap: 12,
  },
  getStartedButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  getStartedText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  signInButton: {
    backgroundColor: '#f5f6fa',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  signInText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
}); 