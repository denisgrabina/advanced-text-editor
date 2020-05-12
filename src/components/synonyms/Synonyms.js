import React from 'react';
import './Synonyms.css'

export default (props) => {
  const { options } = props;
  if (!options.length) return null;
  return (
    <div className="synonyms">
			<h4>Synonyms:</h4>
      <ul>
        {options.map((word) => (
          <li key={`${word}`}>{word}</li>
        ))}
      </ul>
    </div>
  );
};
