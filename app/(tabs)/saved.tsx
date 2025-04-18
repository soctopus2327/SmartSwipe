import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function SavedScreen() {
  const { saved } = useLocalSearchParams();
  const savedPapers = saved ? JSON.parse(saved as string) : [];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Saved Papers</Text>

      <FlatList
        data={savedPapers}
        keyExtractor={(item, idx) => idx.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.paperTitle}>{item.title}</Text>
            <Text style={styles.author}>{item.author}</Text>
            <Text style={styles.timestamp}>{item.timestamp}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 40 }}>No saved papers yet.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  card: { padding: 15, backgroundColor: '#f1f5fb', borderRadius: 10, marginBottom: 15 },
  paperTitle: { fontSize: 16, fontWeight: '600' },
  author: { marginTop: 5, fontStyle: 'italic' },
  timestamp: { color: '#888', fontSize: 12, marginTop: 5 },
});
