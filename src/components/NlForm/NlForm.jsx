import React, { useState } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
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
    max_results: 5,
    articles: { 
      applied: [],
      violated: [],
      non_violated: [],
      logic: "OR"
    },
    keywords: [],
    application_numbers: [],
    advanced_settings: { 
      start_date: "",
      end_date: "",
      language: "",
      importance_level: "",
      respondent_state: "",
      degrees_sources: 0,
      degrees_targets: 0
    },
    document_types: []
  });

  const [db2Data, setDb2Data] = useState({
    query: "",
    max_results: 5,
    law_references: {
      articles: [],
      logic: "AND"
    },
    keywords: [],
    instances: [],
    domains: [],
    advanced_settings: {
      start_date: "",
      end_date: "",
      degrees_sources: 0,
      degrees_targets: 0,
      document_types: []
    }
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
      const isQueryEmpty = !db1Data.query || db1Data.query.trim().length === 0;
    
      const hasViolatedArticles = db1Data.articles?.violated?.length > 0;
      const hasAppliedArticles = db1Data.articles?.applied?.length > 0;
      const hasNonViolatedArticles = db1Data.articles?.non_violated?.length > 0;
      const areArticlesEmpty = !hasViolatedArticles && !hasAppliedArticles && !hasNonViolatedArticles;
      
      const isRespondentEmpty = !db1Data.advanced_settings?.respondent_state || db1Data.advanced_settings.respondent_state.trim().length === 0;
      const isStartDateEmpty = !db1Data.advanced_settings?.start_date;
      const isEndDateEmpty = !db1Data.advanced_settings?.end_date;
      const isLanguageEmpty = !db1Data.advanced_settings?.language;
      const isImportanceLevelEmpty = !db1Data.advanced_settings?.importance_level;
      
      const isMaxResultsEmpty = !db1Data.max_results || db1Data.max_results < 1;
      const areDocTypesEmpty = !db1Data.document_types || db1Data.document_types.length === 0;
      
      return isQueryEmpty || areArticlesEmpty || isRespondentEmpty || 
             isStartDateEmpty || isEndDateEmpty || isLanguageEmpty || 
             isImportanceLevelEmpty || isMaxResultsEmpty || areDocTypesEmpty;
    } else {  
      const areInstancesEmpty = !db2Data.instances || db2Data.instances.length === 0;
      const areDomainsEmpty = !db2Data.domains || db2Data.domains.length === 0;
      const areDocTypesEmpty = !db2Data.advanced_settings?.document_types || db2Data.advanced_settings.document_types.length === 0;
      const isMaxResultsEmpty = !db2Data.max_results || db2Data.max_results < 1;
      
      return areInstancesEmpty || areDomainsEmpty || areDocTypesEmpty || isMaxResultsEmpty;
    }
  };

  return (
    <div className="nl-container shadow-lg p-4 border rounded bg-white position-relative">
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
            ECHR Db
          </Button>
          <Button 
            variant={activeDb === 'DB2' ? 'primary' : 'outline-primary'} 
            onClick={() => setActiveDb('DB2')}
            className="fw-semibold"
          >
            <i className="bi bi-file-earmark-text me-1"></i>
            Rechtspraak DB
          </Button>
        </ButtonGroup>
      </div>

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
    </div>
  );
};

export default NLForm;