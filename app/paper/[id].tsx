import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking, Platform } from 'react-native';
import { Link, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { DUMMY_PAPERS } from '../data/papers';

export default function PaperViewScreen() {
  const { id } = useLocalSearchParams();
  const paper = DUMMY_PAPERS.find(p => p.id === id);

  if (!paper) {
    return (
      <View style={styles.container}>
        <StatusBar style="dark" />
        <View style={styles.header}>
          <Link href="/reading-list" asChild>
            <TouchableOpacity style={styles.backButton}>
              <Ionicons name="chevron-back" size={24} color="#007AFF" />
              <Text style={styles.backText}>Back</Text>
            </TouchableOpacity>
          </Link>
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Paper not found</Text>
        </View>
      </View>
    );
  }

  const handleDoiPress = async () => {
    if (paper.doi) {
      const url = `https://doi.org/${paper.doi}`;
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      }
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Link href="/reading-list" asChild>
          <TouchableOpacity style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color="#007AFF" />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
        </Link>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>{paper.title}</Text>
        <Text style={styles.authors}>{paper.authors}</Text>
        <Text style={styles.journal}>
          {paper.journal} • {paper.publishedDate}
        </Text>

        <View style={styles.tagsContainer}>
          {paper.tags.map((tag) => (
            <View key={tag} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Abstract</Text>
          <Text style={styles.abstract}>{paper.abstract}</Text>
        </View>

        {paper.doi && (
          <TouchableOpacity style={styles.doiButton} onPress={handleDoiPress}>
            <Ionicons name="open-outline" size={20} color="white" />
            <Text style={styles.doiButtonText}>Open on DOI: {paper.doi}</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    color: '#007AFF',
    fontSize: 16,
    marginLeft: 4,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  authors: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  journal: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    marginBottom: 16,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 24,
  },
  tag: {
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  tagText: {
    color: '#1976d2',
    fontSize: 12,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  abstract: {
    fontSize: 16,
    color: '#444',
    lineHeight: 24,
  },
  doiButton: {
    backgroundColor: '#007AFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    gap: 8,
  },
  doiButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontSize: 18,
    color: '#666',
  },
}); 