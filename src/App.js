import React, { useState, useEffect } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import './App.css';
import ControlPanel from './components/control-panel/ControlPanel';
import FileZone from './components/file-zone/FileZone';
import Synonyms from './components/synonyms/Synonyms';
import getMockText from './text.service';
import getSynonyms from './synonym.service';

const App = () => {
  const [textContent, setTextContent] = useState('');
  const [activeWord, setActiveWord] = useState('');

  const [boldWords, setBoldWords] = useState([]);
  const [italicWords, setItalicWords] = useState([]);
  const [underlinedWords, setUnderlinedWords] = useState([]);

  const [isBoldActive, setBoldActive] = useState(false);
  const [isItalicActive, setItalicActive] = useState(false);
  const [isUnderlinedActive, setUnderlinedActive] = useState(false);

  const [options, setOptions] = useState([]);

  useEffect(() => {
    getText();
  }, []);

  const getText = async () => {
    const response = await getMockText();
    setTextContent(response);
  };

  const getSelectedText = () => {
    if (window.getSelection) {
      setActiveWord(window.getSelection().toString());
      console.log(setActiveWord(window.getSelection().toString()));
    }
  };

  const getNewWords = (words) => {
    return words.includes(activeWord)
      ? words.filter((word) => word !== activeWord)
      : [...words, activeWord];
  };

  const toggleBold = () => {
    setBoldWords((prev) => {
      const newWords = getNewWords(prev);
      setBoldActive(() => newWords.includes(activeWord));
      return newWords;
    });
  };

  const toggleItalic = () => {
    setItalicWords((prev) => {
      const newWords = getNewWords(prev);
      setItalicActive(() => newWords.includes(activeWord));
      return newWords;
    });
  };

  const toggleUnderlined = () => {
    setUnderlinedWords((prev) => {
      const newWords = getNewWords(prev);
      setUnderlinedActive(() => newWords.includes(activeWord));
      return newWords;
    });
  };

  const disableControlPanel = () => {
    setBoldActive(false);
    setItalicActive(false);
    setUnderlinedActive(false);
    setActiveWord('');
    return;
  };

  const getOptions = async (wordToFind) => {
    setOptions([]);
    const response = await getSynonyms(wordToFind);
    const arr = response.map((word) => word.word);
    setOptions(arr);
  };

  const getWordSynonyms = (word) => {
    getSynonyms(word).then((data) => {
      const synonyms = data.map((synonym) => synonym.word);
      console.log(synonyms);
    });
  };

  const replaceText = (word) => {
    setTextContent((prev) => {
      const newWord = prev.split(' ');
      newWord[activeWord] = word;
      setOptions([]);
      disableControlPanel();
      return newWord.join(' ');
    });
  };

  const updateText = () => {
    setTextContent((prev) => {
      const node = document.getElementById('file');
      const newWord = node.innerText;
      if (prev !== newWord) {
        node.removeChild(node.childNodes[node.children.length - 1]);
        return newWord;
      }
      return prev;
    });
  };

  return (
    <div className="App">
      <header>
        <div className="container">
          <h1 className="title">Advanced Text Editor</h1>
        </div>
      </header>

      <main>
        <ControlPanel
          toggleBold={toggleBold}
          toggleItalic={toggleItalic}
          toggleUnderlined={toggleUnderlined}
          isBoldActive={isBoldActive}
          isItalicActive={isItalicActive}
          isUnderlinedActive={isUnderlinedActive}
          onClick={disableControlPanel}
          isDisabled={!Boolean(activeWord)}
        />
        <div className="container editor">
          <FileZone 
						setSelected={getSelectedText} 
						onClick={disableControlPanel}
						onPaste={updateText}
						updateText={updateText}
					>
            {textContent.split(' ').map((word, index) => (
              <span
                key={`${word}${index}`}
                onDoubleClick={() => {
                  setActiveWord(index);
                  setBoldActive(() => boldWords.includes(index));
                  setItalicActive(() => italicWords.includes(index));
                  setUnderlinedActive(() => underlinedWords.includes(index));
                  getOptions(word);
                }}
                className={`${boldWords.includes(index) ? 'bold ' : ''}${
                  italicWords.includes(index) ? 'italic ' : ''
                }${underlinedWords.includes(index) ? 'underlined ' : ''}`}
              >
                {`${word}`} <span> </span>
              </span>
            ))}
          </FileZone>
          <Synonyms options={options} onClick={replaceText} />
        </div>
      </main>
    </div>
  );
};

export default App;
