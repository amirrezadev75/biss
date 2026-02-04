import React from 'react';
import { Row, Col } from 'react-bootstrap';
import NLForm from './components/NlForm/NlForm';
import AIRecommendations from './components/AiRecommendations/AiRecommendations';
import ResultsView from './components/ResultsView/ResultsView';
import { SearchProvider, useSearch } from './context/SearchContext';

function AppContent() {
  const { searchState } = useSearch();

  return (
    <div className="min-vh-100">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-bottom mb-4">
        <div className="container-fluid py-4">
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
      <div className="container-fluid pb-5 px-4">
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

        {!searchState.loading && (
          <>
            <Row className="g-4 mb-4">
              <Col sm={8} style={{border: '2px solid red', backgroundColor: 'rgba(255,0,0,0.1)'}}>
                <NLForm />
              </Col>
              <Col sm={4} style={{border: '2px solid blue', backgroundColor: 'rgba(0,0,255,0.1)'}}>
                <AIRecommendations />
              </Col>
            </Row>


            {searchState.hasSearched && (
              <Row>
                <Col>
                  <ResultsView />
                </Col>
              </Row>
            )}
          </>
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