import React, { createContext, useContext, useState, useCallback } from 'react';
import { Share } from 'react-native';
import { Paper } from '../data/papers';

interface PaperContextType {
  readingList: (Paper & { savedDate: string })[];
  addToReadingList: (paper: Paper) => void;
  removeFromReadingList: (paperId: string) => void;
  isInReadingList: (paperId: string) => boolean;
  sharePaper: (paper: Paper) => Promise<void>;
}

const PaperContext = createContext<PaperContextType | undefined>(undefined);

export function PaperProvider({ children }: { children: React.ReactNode }) {
  const [readingList, setReadingList] = useState<(Paper & { savedDate: string })[]>([]);

  const addToReadingList = useCallback((paper: Paper) => {
    setReadingList(current => {
      // Check if paper is already in the list
      if (current.some(p => p.id === paper.id)) {
        return current;
      }
      
      // Add paper with current date
      return [...current, {
        ...paper,
        savedDate: new Date().toLocaleString()
      }];
    });
  }, []);

  const removeFromReadingList = useCallback((paperId: string) => {
    setReadingList(current => current.filter(p => p.id !== paperId));
  }, []);

  const isInReadingList = useCallback((paperId: string) => {
    return readingList.some(p => p.id === paperId);
  }, [readingList]);

  const sharePaper = useCallback(async (paper: Paper) => {
    try {
      const shareUrl = paper.doi ? `https://doi.org/${paper.doi}` : '';
      const message = `${paper.title}\nby ${paper.authors}\n${paper.journal ? `Published in ${paper.journal}` : ''}\n${shareUrl}`;
      
      await Share.share({
        message,
        title: paper.title,
        url: shareUrl, // iOS only
      });
    } catch (error) {
      console.error('Error sharing paper:', error);
    }
  }, []);

  return (
    <PaperContext.Provider 
      value={{ 
        readingList, 
        addToReadingList, 
        removeFromReadingList, 
        isInReadingList,
        sharePaper
      }}
    >
      {children}
    </PaperContext.Provider>
  );
}

export function usePapers() {
  const context = useContext(PaperContext);
  if (context === undefined) {
    throw new Error('usePapers must be used within a PaperProvider');
  }
  return context;
} 