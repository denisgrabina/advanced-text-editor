import React from 'react';
import './Synonyms.css'

export default (props) => {
  const { options, onClick } = props;
  if (!options.length) return null;
  return (
    <div className="synonyms">
			<h4>Synonyms</h4>
			<i>Select to replace in the text:</i>
      <ul>
        {options.map((word) => (
          <li key={`${word}`} onClick={() => onClick(word)}>{word}</li>
        ))}
      </ul>
    </div>
  );
};
