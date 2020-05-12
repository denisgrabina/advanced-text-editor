import React from 'react';
import './ControlPanel.css';

const ControlPanel = (props) => {
  const {
    toggleBold,
    toggleItalic,
    toggleUnderlined,
    isBoldActive,
    isItalicActive,
    isUnderlinedActive,
    onClick,
    isDisabled,
  } = props;

  const isActiveFormat = (format) => (format ? true : false);

  const boldHandle = (e) => {
    e.stopPropagation();
    toggleBold();
  };

  const italicHandle = (e) => {
    e.stopPropagation();
    toggleItalic();
  };

  const underlinedHandle = (e) => {
    e.stopPropagation();
    toggleUnderlined();
  };

  return (
    <div id="control-panel">
      <div className="container">
        <div id="format-actions" onClick={onClick}>
          <button
            className={`format-action ${
              isActiveFormat(isBoldActive) ? 'format-action--active' : ''
            }`}
            type="button"
            disabled={isDisabled}
            onClick={boldHandle}
          >
            <b>B</b>
          </button>
          <button
            className={`format-action ${
              isActiveFormat(isItalicActive) ? 'format-action--active' : ''
            }`}
            type="button"
            disabled={isDisabled}
            onClick={italicHandle}
          >
            <i>I</i>
          </button>
          <button
            className={`format-action ${
              isActiveFormat(isUnderlinedActive) ? 'format-action--active' : ''
            }`}
            type="button"
            disabled={isDisabled}
            onClick={underlinedHandle}
          >
            <u>U</u>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
