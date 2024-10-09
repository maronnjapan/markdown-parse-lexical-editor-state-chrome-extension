import React, { ReactNode, useEffect, useState } from 'react';
import { Counter } from '../app/features/counter';
import { Lexical } from '../lexical/Lexical';
import '../global.css';
import ReactDOM from 'react-dom';
import { ReadOnlyLexical } from '../lexical/ReadOnlyLexical';
import { random } from 'lodash-es';

const MODAL_CONTAINER_ID = 'modal-container';

const keyMap = new Map([
  ['KeyS', false],
  ['Backspace', false],
]);
const Content = ({
  originalText,
  translatedText,
  targetLang,
}: {
  translatedText: string;
  originalText: string;
  targetLang: string;
}) => {
  const [text, setText] = useState('');

  const [isShow, setIsShow] = useState(false);
  const handleShowModal = (event: KeyboardEvent) => {
    if (keyMap.has(event.code)) {
      keyMap.set(event.code, true);
    }

    if (keyMap.values().every((val) => val === true)) {
      const elmText = document.querySelector('h1')?.innerText ?? '';
      setText(() => elmText);
      setIsShow(() => true);
    }
  };

  const reset = () => {
    keyMap.forEach((_, key, map) => {
      map.set(key, false);
    });
  };

  const setLexicalContent = () => {
    const targetElement = document.querySelector(
      'div[data-testId="tweetText"]:not([data-lexical])'
    ) as HTMLElement;

    if (targetElement) {
      targetElement.setAttribute('data-lexical', 'true');

      // Reactコンポーネントをレンダリングするための新しいdiv要素を作成
      const reactRoot = document.createElement('div');

      const a = targetElement;

      const id = Math.random();
      targetElement.childNodes.forEach((val) => {
        const span = document.createElement('span');
        if (val instanceof HTMLImageElement) {
          span.innerText = val.getAttribute('alt') ?? '';
          span.id = `${id}`;
          val.before(span);
          val.remove();
        }
      });

      const text = targetElement.textContent ?? '';

      targetElement.childNodes.forEach((value) => {
        value.remove();
      });

      document.getElementById(`${id}`)?.remove();

      targetElement.appendChild(reactRoot);

      // Reactコンポーネントをレンダリング
      ReactDOM.render(<ReadOnlyLexical content={text} />, reactRoot);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleShowModal);
    document.addEventListener('keyup', reset);
    document.addEventListener('scroll', setLexicalContent);

    return () => {
      document.removeEventListener('keydown', handleShowModal);
      document.removeEventListener('keyup', reset);
      document.removeEventListener('scroll', setLexicalContent);
    };
  }, []);

  return (
    <>
      {isShow && (
        <div
          id={MODAL_CONTAINER_ID}
          style={{
            position: 'fixed',
            width: '100%',
            left: '0px',
            top: '0px',
            height: '100vh',
            zIndex: 2147483550,
            background: 'rgba(0,0,0,0.8)',
          }}
          className="lexical-extension-style"
          onClick={(e) => {
            const targetElm = e.target as HTMLElement;
            console.log(targetElm, targetElm.id);
            if (targetElm.id === MODAL_CONTAINER_ID) {
              setIsShow(() => false);
            }
          }}
        >
          <Lexical content={text}></Lexical>
        </div>
      )}
    </>
  );
};

export default Content;
