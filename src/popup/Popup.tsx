import { useEffect, useState } from 'react';

const Popup = () => {
  document.body.className = 'w-[30rem] h-[15rem]';
  const [lang, setLang] = useState<string | undefined>(undefined);

  useEffect(() => {
    chrome.storage.local.get(['targetLang'], (value) => {
      if (value.targetLang) {
        setLang(value.targetLang);
      }
    });
  }, []);

  const saveLang = (lang: string | undefined) => {
    chrome.storage.local.set({ targetLang: lang });
    setLang(() => lang);
  };

  return (
    <>
      <div className="flex justify-center mt-2 text-base">DeepL 翻訳</div>
      <p>選択したテキストを次の言語に翻訳</p>
      <select
        name="target_lang"
        value={lang}
        onChange={(event) => {
          saveLang(event.target.value);
        }}
      >
        <option value="EN">英語</option>
        <option value="KO">韓国語</option>
        <option value="ZH">中国語</option>
        <option value="JA">日本語</option>
      </select>
    </>
  );
};

export default Popup;
