import React from 'react';
import { Form, Dropdown } from 'react-bootstrap';

const RechtspraakForm = ({ data, onUpdate }) => {
  const handleKeywordsChange = (value) => {
    const keywords = value.split(',').map(kw => kw.trim()).filter(kw => kw);
    onUpdate('keywords', keywords);
  };

  const handleInstanceToggle = (instance) => {
    const current = data.instances || [];
    const updated = current.includes(instance) 
      ? current.filter(item => item !== instance)
      : [...current, instance];
    onUpdate('instances', updated);
  };

  const handleDomainToggle = (domain) => {
    const current = data.domains || [];
    const updated = current.includes(domain) 
      ? current.filter(item => item !== domain)
      : [...current, domain];
    onUpdate('domains', updated);
  };

  const handleDocTypeToggle = (docType) => {
    const current = data.advanced_settings?.document_types || [];
    const updated = current.includes(docType) 
      ? current.filter(item => item !== docType)
      : [...current, docType];
    onUpdate('advanced_settings.document_types', updated);
  };

  return (
    <div>
      I am searching for legal cases from 
      <Dropdown className="d-inline-block">
        <Dropdown.Toggle variant="outline-secondary" size="sm">
          {data.instances?.length > 0 ? `${data.instances.length} courts` : 'Select courts'}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {['Supreme Court', 'Council of State', 'Central Appeals Court', 'Trade and Industry Appeals Tribunal', 'Courts of Appeal', 'Courts', 'Other bodies within the Kingdom'].map(instance => (
            <Dropdown.Item key={instance} as="div">
              <Form.Check 
                type="checkbox"
                label={instance}
                checked={data.instances?.includes(instance) || false}
                onChange={() => handleInstanceToggle(instance)}
              />
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown> 
      in the domain(s) of 
      <Dropdown className="d-inline-block">
        <Dropdown.Toggle variant="outline-secondary" size="sm">
          {data.domains?.length > 0 ? `${data.domains.length} domains` : 'Select domains'}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {['Administrative law', 'Civil law', 'Public international law', 'Criminal law'].map(domain => (
            <Dropdown.Item key={domain} as="div">
              <Form.Check 
                type="checkbox"
                label={domain}
                checked={data.domains?.includes(domain) || false}
                onChange={() => handleDomainToggle(domain)}
              />
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      logic.

      <br /><br />

      Show me up to 
      <input 
        type="number" 
        className="nl-input-xs" 
        placeholder="5" 
        min="1" 
        max="100"
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
      for 
      <Dropdown className="d-inline-block">
        <Dropdown.Toggle variant="outline-secondary" size="sm">
          {data.advanced_settings?.document_types?.length > 0 ? `${data.advanced_settings.document_types.length} types` : 'Select document types'}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {['Decision', 'Opinion', 'Judgment', 'Order'].map(docType => (
            <Dropdown.Item key={docType} as="div">
              <Form.Check 
                type="checkbox"
                label={docType}
                checked={data.advanced_settings?.document_types?.includes(docType) || false}
                onChange={() => handleDocTypeToggle(docType)}
              />
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown> 
      documents.

      <br /><br />

      <details className="mt-3">
        <summary className="text-muted small">Advanced Options</summary>
        <div className="mt-2 p-2 border rounded bg-light">
          <div className="mb-2">
            <label className="form-label small">Keywords (comma-separated):</label>
            <input 
              type="text" 
              className="form-control form-control-sm" 
              placeholder="contract, breach, damages"
              value={data.keywords?.join(', ') || ""}
              onChange={(e) => handleKeywordsChange(e.target.value)} 
            />
          </div>
          <div className="row">
            <div className="col-6">
              <label className="form-label small">Degrees Sources:</label>
              <input 
                type="number" 
                className="form-control form-control-sm" 
                min="0"
                value={data.advanced_settings?.degrees_sources || 0}
                onChange={(e) => onUpdate('advanced_settings.degrees_sources', parseInt(e.target.value) || 0)} 
              />
            </div>
            <div className="col-6">
              <label className="form-label small">Degrees Targets:</label>
              <input 
                type="number" 
                className="form-control form-control-sm" 
                min="0"
                value={data.advanced_settings?.degrees_targets || 0}
                onChange={(e) => onUpdate('advanced_settings.degrees_targets', parseInt(e.target.value) || 0)} 
              />
            </div>
          </div>
        </div>
      </details>
    </div>
  );
};

export default RechtspraakForm;