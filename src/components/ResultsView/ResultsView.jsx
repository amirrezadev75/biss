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
      id: 2,
      ecli: "ECLI:NL:RBSGR:2012:BV1971",
      similarity: "83.35%",
      text: "De Engelstalige tekst van artikel 7 van het Statuut is op dit punt gelijkluidend aan die van artikel 3 van het Statuut voor het Rwanda Tribunaal. 'The Chamber considers that it is a prerequisite...'",
      keywords: ["Rwanda", "Article 7", "Statute"]
    },
        {
      id: 2,
      ecli: "ECLI:NL:RBSGR:2012:BV1971",
      similarity: "83.35%",
      text: "De Engelstalige tekst van artikel 7 van het Statuut is op dit punt gelijkluidend aan die van artikel 3 van het Statuut voor het Rwanda Tribunaal. 'The Chamber considers that it is a prerequisite...'",
      keywords: ["Rwanda", "Article 7", "Statute"]
    }
  ];

  const displayData = results && results.length > 0 ? results : dummyData;

  return (
    <div className="results-container mt-4">
      <Accordion defaultActiveKey="0" flush>
        {displayData.map((item, index) => (
          <Card key={item.id} className="result-item-card border-0 border-bottom mb-3">
            <div className="d-flex justify-content-between align-items-center p-3">
              <span className="ecli-label fw-bold">{item.ecli}</span>
              <Accordion.Toggle as={Button} variant="link" eventKey={String(index)} className="p-0">
                <i className="bi bi-chevron-down text-dark"></i>
              </Accordion.Toggle>
            </div>
            
            <Accordion.Collapse eventKey={String(index)}>
              <Card.Body className="pt-0">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <Button variant="dark" size="sm" className="read-more-btn px-3">
                    Read more
                  </Button>
                  <Badge bg="light" text="dark" className="similarity-badge border">
                    Similarity: <span className="text-primary">{item.similarity}</span>
                  </Badge>
                </div>
                
                <p className="result-text text-secondary">
                  {item.text}
                </p>
                
                <div className="mt-2">
                  {item.keywords?.map(kw => (
                    <Badge key={kw} pill bg="info" className="me-1 keyword-pill">
                      {kw}
                    </Badge>
                  ))}
                </div>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        ))}
      </Accordion>
    </div>
  );
};

export default ResultsView;