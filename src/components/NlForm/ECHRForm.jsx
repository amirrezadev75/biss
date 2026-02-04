import React from 'react';
import { Form, Dropdown } from 'react-bootstrap';

const ECHRForm = ({ data, onUpdate }) => {
  const handleArticleChange = (value, status) => {
    const articles = value.split(',').map(art => art.trim()).filter(art => art);
    onUpdate(`articles.${status}`, articles);
  };

  const handleDocTypeToggle = (docType) => {
    const current = data.document_types || [];
    const updated = current.includes(docType) 
      ? current.filter(item => item !== docType)
      : [...current, docType];
    onUpdate('document_types', updated);
  };

  return (
    <div className="nl-sentence">
      I am researching cases about 
      <input 
        type="text" 
        className="nl-input" 
        placeholder="e.g. freedom of expression in Armenia" 
        value={data.query || ""}
        onChange={(e) => onUpdate('query', e.target.value)} 
      /> 
      involving Article(s) 
      <input 
        type="text" 
        className="nl-input-sm" 
        placeholder="6,10,8" 
        value={data.articles?.violated?.join(',') || data.articles?.applied?.join(',') || data.articles?.non_violated?.join(',') || ""}
        onChange={(e) => {
          const currentStatus = data.articles?.violated?.length > 0 ? 'violated' : 
                              data.articles?.applied?.length > 0 ? 'applied' : 'non_violated';
          handleArticleChange(e.target.value, currentStatus);
        }} 
      /> 
      that were 
      <select 
        className="nl-select"
        value={data.articles?.violated?.length > 0 ? 'violated' : 
              data.articles?.applied?.length > 0 ? 'applied' : 'non_violated'}
        onChange={(e) => {
          const currentArticles = data.articles?.violated?.join(',') || 
                                 data.articles?.applied?.join(',') || 
                                 data.articles?.non_violated?.join(',') || "";
          // Clear all arrays first
          onUpdate('articles.violated', []);
          onUpdate('articles.applied', []);
          onUpdate('articles.non_violated', []);
          // Set the new status
          if (currentArticles) {
            handleArticleChange(currentArticles, e.target.value);
          }
        }}
      >
        <option value="violated">violated</option>
        <option value="applied">applied</option>
        <option value="non_violated">not violated</option>
      </select>
      in 
      <select 
        className="nl-select"
        value={data.advanced_settings?.respondent_state || ""}
        onChange={(e) => onUpdate('advanced_settings.respondent_state', e.target.value)}
      >
        <option value="">any country</option>
        <option value="FRA">France</option>
        <option value="DEU">Germany</option>
        <option value="ARM">Armenia</option>
        <option value="GBR">United Kingdom</option>
        <option value="ITA">Italy</option>
        <option value="ESP">Spain</option>
      </select>.
      
      <br /><br />

      Show me up to 
      <input 
        type="number" 
        className="nl-input-xs" 
        placeholder="5" 
        min="1" 
        max="50"
        value={data.max_results || ""}
        onChange={(e) => onUpdate('max_results', parseInt(e.target.value) || 5)} 
      /> 
      results from 
      <input 
        type="date" 
        className="nl-input-sm" 
        value={data.advanced_settings?.start_date || ""}
        onChange={(e) => onUpdate('advanced_settings.start_date', e.target.value)} 
      /> 
      to 
      <input 
        type="date" 
        className="nl-input-sm" 
        value={data.advanced_settings?.end_date || ""}
        onChange={(e) => onUpdate('advanced_settings.end_date', e.target.value)} 
      /> 
      in 
      <select 
        className="nl-select"
        value={data.advanced_settings?.language || ""}
        onChange={(e) => onUpdate('advanced_settings.language', e.target.value)}
      >
        <option value="">any language</option>
        <option value="ENG">English</option>
        <option value="FRE">French</option>
        <option value="GER">German</option>
      </select> 
      language.

      <br /><br />

      Focus on 
      <Dropdown className="d-inline-block">
        <Dropdown.Toggle variant="outline-secondary" size="sm">
          {data.document_types?.length > 0 ? `${data.document_types.length} document types` : 'Select document types'}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {['HEJUD', 'HEDEC', 'HEADM', 'HECOM'].map(docType => (
            <Dropdown.Item key={docType} as="div">
              <Form.Check 
                type="checkbox"
                label={docType === 'HEJUD' ? 'Judgments' : docType === 'HEDEC' ? 'Decisions' : docType === 'HEADM' ? 'Admissibility' : 'Committee'}
                checked={data.document_types?.includes(docType) || false}
                onChange={() => handleDocTypeToggle(docType)}
              />
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown> 
      documents with importance level 
      <select 
        className="nl-select"
        value={data.advanced_settings?.importance_level || ""}
        onChange={(e) => onUpdate('advanced_settings.importance_level', parseInt(e.target.value))}
      >
        <option value="">any level</option>
        <option value="1">Level 1 (Key cases)</option>
        <option value="2">Level 2 (Important cases)</option>
        <option value="3">Level 3 (All cases)</option>
      </select>.
    </div>
  );
};

export default ECHRForm;