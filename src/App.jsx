import React from 'react';
import NLForm from './components/NlForm/NlForm';
import AIRecommendations from './components/AiRecommendations/AiRecommendations';
import ResultsView from './components/Resultsview/ResultView';
import { SearchProvider, useSearch } from './context/SearchContext';

function AppContent() {
  const { searchState } = useSearch();

  return (
    <div className="min-vh-100">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-bottom mb-4">
        <div className="container py-4">
          <div className="text-center">
            <h1 className="display-4 fw-bold text-primary mb-2">
              <i className="bi bi-scales me-3"></i>
              BISS Case Law Explorer
            </h1>
            <p className="lead text-muted mb-0">
              Advanced Legal Research Platform
              <span className="badge bg-primary ms-2">v2.0</span>
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container pb-5">
        {/* 1. The Form Switcher Component */}
        <div className="row justify-content-center mb-4">
          <div className="col-lg-10">
            <NLForm />
          </div>
        </div>

        {searchState.loading && (
          <div className="text-center mt-5">
            <div className="spinner-border text-primary" role="status" style={{width: '3rem', height: '3rem'}}>
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3 text-muted fs-5">
              <i className="bi bi-search me-2"></i>
              Analyzing legal patterns...
            </p>
          </div>
        )}

        {searchState.hasSearched && !searchState.loading && (
          <div className="mt-5 fade-in">
            <div className="row g-4">
              <div className="col-lg-4">
                {/* 2. The AI Suggestion Component */}
                <AIRecommendations />
              </div>
              <div className="col-lg-8">
                {/* 3. The Result List Component */}
                <ResultsView />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <SearchProvider>
      <AppContent />
    </SearchProvider>
  );
}

export default App;