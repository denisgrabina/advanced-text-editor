import React from 'react';
import './FileZone.css';
// import Word from '../word/Word';

const FileZone = (props) => {
  const { children } = props;
  return (
    <div id="file-zone">
      <div id="file">{children}</div>
    </div>
  );
};

export default FileZone;
