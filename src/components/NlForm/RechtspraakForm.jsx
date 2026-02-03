import React from 'react';
const RechtspraakForm = ({ data, onUpdate }) => {
  return (
    <div className="nl-sentence">
      I want to find cases about 
      <input 
        type="text" 
        className="nl-input" 
        placeholder="e.g. Pokémon" 
        value={data.query}
        onChange={(e) => onUpdate('query', e.target.value)} 
      /> 
      specifically involving the state of 
      <input 
        type="text" 
        className="nl-input-sm" 
        placeholder="NLD" 
        value={data.respondent_state}
        onChange={(e) => onUpdate('respondent_state', e.target.value)} 
      />. 
      <br />
      I am interested in documents from 
      <input 
        type="date" 
        className="nl-input" 
        value={data.advanced_settings.start_date}
        onChange={(e) => onUpdate('advanced_settings.start_date', e.target.value)} 
      /> 
      onwards.
    </div>
  );
};

export default RechtspraakForm;