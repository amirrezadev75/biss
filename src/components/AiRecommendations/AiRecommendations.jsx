import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { useSearch } from '../../context/SearchContext';
import './AiRecommendations.css';

const AIRecommendations = () => {
  const { searchState } = useSearch();
  const { aiTips: suggestions, hasSearched } = searchState;

  return (
    <Card className="ai-recommendation-card border-0 shadow-lg mb-4 h-100">
      <Card.Header className="bg-transparent border-0 pt-4 pb-3 d-flex align-items-center">
        <span className="ai-icon-pulse me-3">🤖</span>
        <div>
          <h6 className="mb-1 fw-bold">AI Research Assistant</h6>
          <small className="text-muted">Powered by Legal Intelligence</small>
        </div>
      </Card.Header>
      <Card.Body className="pt-0">
        {!hasSearched ? (
          <div className="text-center py-5">
            <div className="mb-3">
              <i className="bi bi-hourglass-split text-muted" style={{fontSize: '2rem'}}></i>
            </div>
            <h6 className="text-muted mb-2">Waiting for your search</h6>
            <p className="small text-secondary mb-0">
              Enter your legal query above to get AI-powered recommendations
            </p>
          </div>
        ) : (
          <>
            {suggestions && suggestions.length > 0 ? (
              <>
                <p className="small text-muted mb-4">
                  <i className="bi bi-lightbulb me-2"></i>
                  Based on your narrative, you might find these perspectives useful:
                </p>
                <div className="suggestions-list">
                  {suggestions.map((item, idx) => (
                    <div key={idx} className="suggestion-item p-3 mb-3 position-relative">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <Button 
                          variant="link" 
                          className="suggestion-link p-0 text-start d-block fw-semibold h6 mb-0"
                        >
                          <i className="bi bi-search me-2"></i>
                          Try: "{item.query}"
                        </Button>
                        <Badge bg="primary" pill className="ai-badge">
                          Refine
                        </Badge>
                      </div>
                      <Card.Text className="small text-secondary mt-2 lh-sm mb-0">
                        <i className="bi bi-info-circle me-1"></i>
                        {item.reasoning}
                      </Card.Text>
                    </div>
                  ))}
                </div>
                
                {/* Action Footer */}
                <div className="text-center mt-4 pt-3 border-top">
                  <Button variant="outline-primary" size="sm" className="fw-semibold">
                    <i className="bi bi-arrow-clockwise me-2"></i>
                    Get More Suggestions
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center py-4">
                <div className="mb-3">
                  <i className="bi bi-robot text-muted" style={{fontSize: '2rem'}}></i>
                </div>
                <h6 className="text-muted mb-2">No recommendations available</h6>
                <p className="small text-secondary mb-0">
                  Try refining your search query for better AI suggestions
                </p>
              </div>
            )}
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default AIRecommendations;