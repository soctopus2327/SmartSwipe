import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform, useWindowDimensions } from 'react-native';
import { Link, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { usePapers } from './context/PaperContext';

export default function ReadingListScreen() {
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const [expandedPaper, setExpandedPaper] = useState<string | null>(null);
  const { readingList, removeFromReadingList, sharePaper } = usePapers();

  const toggleExpand = (paperId: string) => {
    setExpandedPaper(expandedPaper === paperId ? null : paperId);
  };

  const navigateToPaper = (paperId: string) => {
    router.push({
      pathname: '/paper/[id]',
      params: { id: paperId }
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Link href="/" asChild>
          <TouchableOpacity style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color="#007AFF" />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
        </Link>
        <Text style={styles.title}>Reading List</Text>
      </View>

      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={[
          styles.contentContainer,
          { maxWidth: Math.min(800, SCREEN_WIDTH) }
        ]}
      >
        {readingList.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>
              Your reading list is empty.{'\n'}
              Swipe right on papers to add them here!
            </Text>
            <Link href="/swipe" asChild>
              <TouchableOpacity style={styles.browseButton}>
                <Text style={styles.browseButtonText}>Browse Papers</Text>
              </TouchableOpacity>
            </Link>
          </View>
        ) : (
          readingList.map((paper) => (
            <View key={paper.id} style={styles.paperCard}>
              <View style={styles.paperHeader}>
                <Text style={styles.paperTitle}>{paper.title}</Text>
                <TouchableOpacity onPress={() => toggleExpand(paper.id)}>
                  <Ionicons 
                    name={expandedPaper === paper.id ? "chevron-up" : "chevron-down"} 
                    size={24} 
                    color="#666" 
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.paperAuthors}>{paper.authors}</Text>
              <Text style={styles.paperJournal}>
                {paper.journal} • {paper.publishedDate}
              </Text>
              {expandedPaper === paper.id && (
                <Text style={styles.paperAbstract}>{paper.abstract}</Text>
              )}
              <View style={styles.tagsContainer}>
                {paper.tags.map((tag) => (
                  <View key={tag} style={styles.tag}>
                    <Text style={styles.tagText}>{tag}</Text>
                  </View>
                ))}
              </View>
              <View style={styles.paperFooter}>
                <Text style={styles.savedDate}>Saved {paper.savedDate}</Text>
                <View style={styles.buttonGroup}>
                  <TouchableOpacity 
                    style={styles.iconButton}
                    onPress={() => sharePaper(paper)}
                  >
                    <Ionicons name="share-outline" size={20} color="#666" />
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.iconButton}
                    onPress={() => removeFromReadingList(paper.id)}
                  >
                    <Ionicons name="trash-outline" size={20} color="#ff3b30" />
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.viewButton}
                    onPress={() => navigateToPaper(paper.id)}
                  >
                    <Text style={styles.viewButtonText}>View Paper</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
    alignItems: 'center',
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
    width: '100%',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  backText: {
    color: '#007AFF',
    fontSize: 16,
    marginLeft: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  contentContainer: {
    padding: 16,
    gap: 16,
    alignSelf: 'center',
    width: '100%',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },
  browseButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  browseButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  paperCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  paperHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  paperTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    flex: 1,
    marginRight: 8,
  },
  paperAuthors: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  paperJournal: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    fontStyle: 'italic',
  },
  paperAbstract: {
    fontSize: 14,
    color: '#444',
    marginBottom: 16,
    lineHeight: 20,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
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
  paperFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  savedDate: {
    fontSize: 12,
    color: '#666',
  },
  buttonGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconButton: {
    padding: 8,
  },
  viewButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  viewButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
}); 