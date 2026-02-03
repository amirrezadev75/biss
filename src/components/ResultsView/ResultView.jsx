import React, { useState } from 'react';
import { Card, Button, Badge, Accordion } from 'react-bootstrap';
import { useSearch } from '../../context/SearchContext';
import './ResultsView.css';

const ResultsView = () => {
  const { searchState } = useSearch();
  const { results } = searchState;
  
  // Dummy data if no results are passed
  const dummyData = [
    {
      id: 1,
      ecli: "ECLI:NL:RVS:2018:2394",
      similarity: "84.42%",
      text: "Zoals omschreven in artikel 205 van het Armeense Wetboek van Strafvordering. The Armenian Times, 29 januari 2015. Zie bijvoorbeeld de uitspraak van de Afdeling bestuursrechtspraak van de Raad van State van 17 juli 2018.",
      keywords: ["Armenia", "Corruption", "Article 205"]
    },
    {
      id: 2,
      ecli: "ECLI:NL:RBSGR:2012:BV1971",
      similarity: "83.35%",
      text: "De Engelstalige tekst van artikel 7 van het Statuut is op dit punt gelijkluidend aan die van artikel 3 van het Statuut voor het Rwanda Tribunaal. 'The Chamber considers that it is a prerequisite...'",
      keywords: ["Rwanda", "Article 7", "Statute"]
    },
    {
      id: 3,
      ecli: "ECLI:NL:RBSGR:2015:CV2847",
      similarity: "81.20%",
      text: "Het Europees Hof voor de Rechten van de Mens heeft in verschillende uitspraken benadrukt dat artikel 6 van het EVRM een fundamenteel recht behelst.",
      keywords: ["ECHR", "Article 6", "Fundamental Rights"]
    }
  ];

  const displayData = results && results.length > 0 ? results : dummyData;

  return (
    <div className="results-container">
      {/* Results Header */}
      <div className="results-header">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h4 className="mb-2 fw-bold text-primary">
              <i className="bi bi-file-earmark-text me-2"></i>
              Search Results
            </h4>
            <p className="mb-0 text-muted">
              Found {displayData.length} relevant case{displayData.length !== 1 ? 's' : ''}
            </p>
          </div>
          <div className="text-end">
            <Button variant="outline-primary" size="sm" className="me-2">
              <i className="bi bi-funnel me-1"></i>
              Filter
            </Button>
            <Button variant="outline-secondary" size="sm">
              <i className="bi bi-download me-1"></i>
              Export
            </Button>
          </div>
        </div>
      </div>

      {displayData.length === 0 ? (
        <div className="no-results">
          <i className="bi bi-search"></i>
          <h5 className="text-muted mt-3">No results found</h5>
          <p className="text-muted">Try adjusting your search criteria or use different keywords.</p>
        </div>
      ) : (
        <Accordion defaultActiveKey="0" flush>
          {displayData.map((item, index) => (
            <Card key={item.id} className="result-item-card mb-4">
              <Card.Header className="bg-transparent border-0 p-4">
                <div className="d-flex justify-content-between align-items-start">
                  <div className="flex-grow-1">
                    <div className="d-flex align-items-center mb-2">
                      <span className="ecli-label me-3">{item.ecli}</span>
                      <Badge className="similarity-badge">
                        <i className="bi bi-graph-up-arrow me-1"></i>
                        {item.similarity}
                      </Badge>
                    </div>
                    <div className="result-stats">
                      <div className="row text-center">
                        <div className="col">
                          <small className="text-muted d-block">Relevance</small>
                          <strong className="text-primary">{item.similarity}</strong>
                        </div>
                        <div className="col">
                          <small className="text-muted d-block">Keywords</small>
                          <strong className="text-success">{item.keywords.length}</strong>
                        </div>
                        <div className="col">
                          <small className="text-muted d-block">Type</small>
                          <strong className="text-info">ECHR</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Accordion.Toggle as={Button} variant="link" eventKey={String(index)} className="accordion-button ms-3">
                    <i className="bi bi-chevron-down"></i>
                  </Accordion.Toggle>
                </div>
              </Card.Header>
              
              <Accordion.Collapse eventKey={String(index)}>
                <Card.Body className="pt-0 px-4 pb-4">
                  <div className="result-text">
                    <i className="bi bi-quote text-muted me-2"></i>
                    {item.text}
                  </div>
                  
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <Button variant="primary" size="sm" className="read-more-btn">
                      <i className="bi bi-arrow-right me-1"></i>
                      Read Full Case
                    </Button>
                    <div>
                      <Button variant="outline-secondary" size="sm" className="me-2">
                        <i className="bi bi-bookmark"></i>
                      </Button>
                      <Button variant="outline-secondary" size="sm" className="me-2">
                        <i className="bi bi-share"></i>
                      </Button>
                      <Button variant="outline-secondary" size="sm">
                        <i className="bi bi-printer"></i>
                      </Button>
                    </div>
                  </div>
                  
                  <div className="keywords-section">
                    <small className="text-muted d-block mb-2 fw-semibold">
                      <i className="bi bi-tags me-1"></i>
                      Related Keywords:
                    </small>
                    <div className="keywords-container">
                      {item.keywords.map((keyword, kidx) => (
                        <Badge key={kidx} className="keyword-badge">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          ))}
        </Accordion>
      )}

      {displayData.length > 0 && (
        <div className="text-center mt-4">
          <Button variant="outline-primary" size="lg" className="px-5">
            <i className="bi bi-arrow-down-circle me-2"></i>
            Load More Results
          </Button>
        </div>
      )}
    </div>
  );
};

export default ResultsView;