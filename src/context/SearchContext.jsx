import React, { createContext, useContext, useState } from 'react';

const SearchContext = createContext();

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};

export const SearchProvider = ({ children }) => {
  const [searchState, setSearchState] = useState({
    results: [],
    aiTips: [],
    hasSearched: false,
    loading: false
  });

  const executeSearch = (payload, dbType) => {
    // Simulate a network request
    setSearchState(prev => ({ ...prev, loading: true }));

    setTimeout(() => {

      const data = { results: [], aiSuggestions: [] };
      
      setSearchState({
        results: data.results,
        aiTips: data.aiSuggestions,
        hasSearched: true,
        loading: false
      });

      console.log("Payload sent to 'Backend':", payload);
    }, 800); 
  };

  return (
    <SearchContext.Provider value={{ 
      searchState, 
      executeSearch,
      setSearchState
    }}>
      {children}
    </SearchContext.Provider>
  );
};