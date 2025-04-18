import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, useWindowDimensions, Platform } from 'react-native';
import { Link, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView, Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { DUMMY_PAPERS, Paper } from './data/papers';
import { usePapers } from './context/PaperContext';

const SWIPE_THRESHOLD = 0.25; // 25% of screen width
const VERTICAL_THRESHOLD = 0.25; // 25% of screen height

export default function SwipeScreen() {
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();
  const [papers, setPapers] = useState<Paper[]>(DUMMY_PAPERS);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const { addToReadingList, sharePaper } = usePapers();

  const navigateToPaper = (paperId: string) => {
    router.push({
      pathname: '/paper/[id]',
      params: { id: paperId }
    });
  };

  const handleSwipeComplete = async (direction: 'left' | 'right' | 'up' | 'down') => {
    const currentPaper = papers[0];
    setPapers((prev) => prev.slice(1));
    translateX.value = 0;
    translateY.value = 0;

    // Handle different swipe actions
    switch (direction) {
      case 'right':
        addToReadingList(currentPaper);
        break;
      case 'up':
        navigateToPaper(currentPaper.id);
        break;
      case 'down':
        await sharePaper(currentPaper);
        break;
      default:
        console.log('Dismissed:', currentPaper.title);
    }
  };

  const gesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
    })
    .onEnd((event) => {
      if (Math.abs(event.translationX) > SCREEN_WIDTH * SWIPE_THRESHOLD) {
        translateX.value = withSpring(
          event.translationX > 0 ? SCREEN_WIDTH : -SCREEN_WIDTH,
          {},
          () => {
            runOnJS(handleSwipeComplete)(
              event.translationX > 0 ? 'right' : 'left'
            );
          }
        );
      } else if (Math.abs(event.translationY) > SCREEN_HEIGHT * VERTICAL_THRESHOLD) {
        translateY.value = withSpring(
          event.translationY > 0 ? SCREEN_HEIGHT : -SCREEN_HEIGHT,
          {},
          () => {
            runOnJS(handleSwipeComplete)(
              event.translationY > 0 ? 'down' : 'up'
            );
          }
        );
      } else {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    });

  const cardStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      {
        rotate: `${(translateX.value / SCREEN_WIDTH) * 20}deg`,
      },
    ],
  }));

  const renderCard = (paper: Paper) => (
    <View style={styles.cardContent}>
      <Text style={styles.cardTitle}>{paper.title}</Text>
      <Text style={styles.cardAuthors}>{paper.authors}</Text>
      <Text style={styles.cardJournal}>{paper.journal} • {paper.publishedDate}</Text>
      <Text numberOfLines={3} style={styles.cardAbstract}>{paper.abstract}</Text>
      <View style={styles.tagsContainer}>
        {paper.tags.map((tag) => (
          <View key={tag} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>
      <View style={styles.cardActions}>
        <TouchableOpacity
          style={styles.viewButton}
          onPress={() => navigateToPaper(paper.id)}
        >
          <Text style={styles.viewButtonText}>View Paper</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.shareButton}
          onPress={() => sharePaper(paper)}
        >
          <Ionicons name="share-outline" size={20} color="#007AFF" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Link href="/" asChild>
          <TouchableOpacity style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color="#007AFF" />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
        </Link>
      </View>

      <View style={styles.cardsContainer}>
        {papers.length > 0 ? (
          <>
            {papers.length > 1 && (
              <Animated.View style={[styles.card, { transform: [{ scale: 0.9 }] }]}>
                {renderCard(papers[1])}
              </Animated.View>
            )}
            <GestureDetector gesture={gesture}>
              <Animated.View style={[styles.card, cardStyle]}>
                {renderCard(papers[0])}
              </Animated.View>
            </GestureDetector>
          </>
        ) : (
          <View style={styles.noMoreCards}>
            <Text style={styles.noMoreCardsText}>No more papers to show!</Text>
            <TouchableOpacity
              style={styles.refreshButton}
              onPress={() => setPapers(DUMMY_PAPERS)}
            >
              <Text style={styles.refreshButtonText}>Start Over</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={styles.footer}>
        <Text style={styles.instructions}>
          Swipe right to save{'\n'}
          Swipe left to dismiss{'\n'}
        </Text>
      </View>
    </GestureHandlerRootView>
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
  cardsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    position: 'absolute',
    width: Math.min(400, Dimensions.get('window').width * 0.9),
    height: Math.min(600, Dimensions.get('window').height * 0.6),
    backgroundColor: 'white',
    borderRadius: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardContent: {
    padding: 20,
    flex: 1,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
    color: '#1a1a1a',
  },
  cardAuthors: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  cardJournal: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    fontStyle: 'italic',
  },
  cardAbstract: {
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
  cardActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 'auto',
  },
  viewButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 1,
    marginRight: 12,
    alignItems: 'center',
  },
  viewButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  shareButton: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 8,
  },
  noMoreCards: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  noMoreCardsText: {
    fontSize: 18,
    color: '#666',
  },
  refreshButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  refreshButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  instructions: {
    textAlign: 'center',
    color: '#666',
    lineHeight: 24,
  },
}); 