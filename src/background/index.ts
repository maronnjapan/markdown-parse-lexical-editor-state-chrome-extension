import browser from 'webextension-polyfill';
import store, { initializeWrappedStore } from '../app/store';

import { translate } from '../app/translate';
import { convertHtml } from '../lexical/server';

// initializeWrappedStore();

// store.subscribe(() => {
//   // access store state
//   // const state = store.getState();
//   // console.log('state', state);
// });

// show welcome page on new install
// browser.runtime.onInstalled.addListener(async (details) => {
//   if (details.reason === 'install') {
//     //show the welcome page
//     const url = browser.runtime.getURL('welcome/welcome.html');
//     await browser.tabs.create({ url });
//   }
// });

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'translation',
    title: '選択したテキストを翻訳',
    contexts: ['selection'],
  });
});

chrome.runtime.onMessage.addListener((message, sender) => {
  console.log(message);
  if (message.type === 'CONVERT') {
    const html = convertHtml(message.data.content);
    chrome.tabs.sendMessage(sender.tab?.id as number, {
      type: 'CONVERTED',
      data: {
        html,
      },
    });
  }
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (tab === undefined) {
    return;
  }

  if (info.menuItemId === 'translation') {
    const selectedText = info.selectionText ? info.selectionText : '';
    chrome.storage.local.get(['targetLang'], async (value) => {
      if (value.targetLang) {
        const translatedText = await translate(selectedText, value.targetLang);
        console.log(translatedText);
      }
    });
  }
});

export {};
