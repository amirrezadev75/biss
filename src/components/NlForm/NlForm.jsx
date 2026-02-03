import React, { useState } from 'react';
import { Button, Container, ButtonGroup } from 'react-bootstrap';
import ECHRForm from './ECHRForm';
import RechtspraakForm from './RechtspraakForm';
import { useSearch } from '../../context/SearchContext';
import './NlForm.css';

const NLForm = () => {
  const { executeSearch } = useSearch();
  const [activeDb, setActiveDb] = useState('DB1');
  
  const setDeepValue = (obj, path, value) => {
    const keys = path.split('.');
    let current = obj;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!(keys[i] in current)) {
        current[keys[i]] = {};
      }
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
  };
  
  const [db1Data, setDb1Data] = useState({
    query: "",
    respondent_state: "",
    document_types: ["HEJUD"],
    advanced_settings: { start_date: "1900-01-01", end_date: "2026-02-03" }
  });

  const [db2Data, setDb2Data] = useState({
    query: "",
    articles: { applied: [] },
    advanced_settings: { language: "" }
  });

  const handleUpdate = (path, value) => {
    if (activeDb === 'DB1') {
      const newData = { ...db1Data };
      setDeepValue(newData, path, value);
      setDb1Data(newData);
    } else {
      const newData = { ...db2Data };
      setDeepValue(newData, path, value);
      setDb2Data(newData);
    }
  };

  const isFormIncomplete = () => {
    if (activeDb === 'DB1') {
      return !db1Data.query || !db1Data.respondent_state;
    } else {
      return !db2Data.query || db2Data.articles.applied.length === 0;
    }
  };

  return (
    <Container className="nl-container shadow-lg p-4 border rounded bg-white position-relative">
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex align-items-center">
          <i className="bi bi-pencil-square text-primary me-2"></i>
          <h5 className="text-secondary m-0 fw-bold">Research Narrative</h5>
        </div>
        <ButtonGroup size="sm">
          <Button 
            variant={activeDb === 'DB1' ? 'primary' : 'outline-primary'} 
            onClick={() => setActiveDb('DB1')}
            className="fw-semibold"
          >
            <i className="bi bi-search me-1"></i>
            General Search
          </Button>
          <Button 
            variant={activeDb === 'DB2' ? 'primary' : 'outline-primary'} 
            onClick={() => setActiveDb('DB2')}
            className="fw-semibold"
          >
            <i className="bi bi-file-earmark-text me-1"></i>
            Article Violation
          </Button>
        </ButtonGroup>
      </div>

      {/* Form Content */}
      <div className="sentence-box">
        {activeDb === 'DB1' ? (
          <ECHRForm data={db1Data} onUpdate={handleUpdate} />
        ) : (
          <RechtspraakForm data={db2Data} onUpdate={handleUpdate} />
        )}
      </div>
      <Button 
        variant="success" 
        className="mt-4 w-100 py-3 fw-bold position-relative overflow-hidden"
        disabled={isFormIncomplete()}
        onClick={() => executeSearch(activeDb === 'DB1' ? db1Data : db2Data, activeDb)}
      >
        {isFormIncomplete() ? (
          <>
            <i className="bi bi-exclamation-circle me-2"></i>
            Please complete the narrative...
          </>
        ) : (
          <>
            <i className="bi bi-search me-2"></i>
            Search Case Law
            <i className="bi bi-arrow-right ms-2"></i>
          </>
        )}
      </Button>
      {!isFormIncomplete() && (
        <div className="text-center mt-2">
          <small className="text-success">
            <i className="bi bi-check-circle me-1"></i>
            Ready to search
          </small>
        </div>
      )}
    </Container>
  );
};

export default NLForm;