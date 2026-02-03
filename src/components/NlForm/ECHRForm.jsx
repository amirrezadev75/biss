import React from 'react';

const ECHRForm = ({ data, onUpdate }) => {
  const handleStatusChange = (status) => {
    const articleNum = data.articles?.applied[0] || data.articles?.violated[0] || data.articles?.non_violated[0] || "";
    
    // Clear all and set the specific one
    onUpdate('articles.applied', status === 'applied' ? [articleNum] : []);
    onUpdate('articles.violated', status === 'violated' ? [articleNum] : []);
    onUpdate('articles.non_violated', status === 'non_violated' ? [articleNum] : []);
  };

  const handleArticleNumber = (val) => {
    if (data.articles?.violated?.length > 0) onUpdate('articles.violated', [val]);
    else if (data.articles?.non_violated?.length > 0) onUpdate('articles.non_violated', [val]);
    else onUpdate('articles.applied', [val]);
  };

  return (
    <div className="nl-sentence">
      I am investigating the theme of 
      <input 
        type="text" 
        className="nl-input" 
        placeholder="e.g. freedom of expression" 
        value={data.query}
        onChange={(e) => onUpdate('query', e.target.value)} 
      /> 
      
      specifically where <strong>Article</strong> 
      <input 
        type="text" 
        className="nl-input-sm" 
        placeholder="10" 
        value={data.articles?.applied[0] || data.articles?.violated[0] || data.articles?.non_violated[0] || ""}
        onChange={(e) => handleArticleNumber(e.target.value)} 
      /> 
      
      was 
      <select 
        className="nl-select"
        value={data.articles?.violated?.length > 0 ? 'violated' : data.articles?.non_violated?.length > 0 ? 'non_violated' : 'applied'}
        onChange={(e) => handleStatusChange(e.target.value)}
      >
        <option value="applied">applied</option>
        <option value="violated">violated</option>
        <option value="non_violated">not violated</option>
      </select>.
      
      <br />
      
      The research should prioritize 
      <select 
        className="nl-select"
        value={data.advanced_settings?.language}
        onChange={(e) => onUpdate('advanced_settings.language', e.target.value)}
      >
        <option value="">any language</option>
        <option value="ENG">English</option>
        <option value="FRE">French</option>
      </select> 
      documents.
    </div>
  );
};

export default ECHRForm;