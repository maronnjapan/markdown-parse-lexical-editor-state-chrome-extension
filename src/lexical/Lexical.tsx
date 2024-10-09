'use client';

import { ComponentProps, useState } from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { CheckListPlugin } from '@lexical/react/LexicalCheckListPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { nodes } from './node';
import AutoFocusPlugin from './plugins/AutoFoculPlugin';
import ToolBarPlugin from './plugins/ToolBarPlugin';
import styles from './styles/Editor.module.css';
import { theme } from './theme/editorTheme';
import { CodeHighlightPlugin } from './plugins/CodeHighlightPlugin';
import { MarkdownPlugin, TRANSFORMER_PATTERNS } from './plugins/MarkdownPlugin';
import ImportPlugin from './plugins/ImportPlugin';
import FloatingTextFormatToolbarPlugin from './plugins/FloatingTextFormatToolbarPlugin';
import FloatingLinkEditorPlugin from './plugins/FloatingLinkEditorPlugin';
import LexicalAutoLinkPlugin from './plugins/AutoLinkPlugin';
import LinkPreviewPlugin from './plugins/LinkPreviewPlugin';
import CollapsiblePlugin from './plugins/CollapsiblePlugin';
import MessagePlugin from './plugins/MessagePlugin';
import TablePlugin from './plugins/TablePlugin';
import EmbedExternalSystemPlugin from './plugins/EmbedExternalSystemPlugin';
import ClickableLinkPlugin from './plugins/ClickableLinkPlugin';
import { $convertFromMarkdownString } from '@lexical/markdown';
import GenerateMarkdonwPlugin from './plugins/GenerateMarkdownPlugin';
import GenerateHtmlFromMarkdownPlugin from './plugins/GenerateHtmlFromMarkdownPlugin';

const initialConfig = (
  markdown: string
): ComponentProps<typeof LexicalComposer>['initialConfig'] => ({
  namespace: 'MyEditor',
  onError: (error) => console.error(error),
  nodes: nodes,
  theme: theme,
  editorState: () => $convertFromMarkdownString(markdown, TRANSFORMER_PATTERNS),
});

export const Lexical = ({ content, isResize }: { content: string; isResize?: boolean }) => {
  const [isLinkEditMode, setIsLinkEditMode] = useState<boolean>(false);
  const [floatingAnchorElem, setFloatingAnchorElem] = useState<HTMLDivElement | null>(null);

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };

  return (
    <LexicalComposer initialConfig={initialConfig(content)}>
      <div className={`${styles.editorContainer}`}>
        <ToolBarPlugin></ToolBarPlugin>

        <RichTextPlugin
          contentEditable={
            <div ref={onRef} className={styles['contentEditable-wrapper']}>
              <ContentEditable
                className={`${styles.contentEditable} ${isResize ? 'resize overflow-auto' : ''}`}
              />
            </div>
          }
          placeholder={<div className={styles.placeholder}></div>}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <div>
          <GenerateMarkdonwPlugin></GenerateMarkdonwPlugin>
          <GenerateHtmlFromMarkdownPlugin></GenerateHtmlFromMarkdownPlugin>
        </div>
      </div>
      <AutoFocusPlugin></AutoFocusPlugin>
      <ClickableLinkPlugin></ClickableLinkPlugin>
      <HistoryPlugin />
      <ListPlugin></ListPlugin>
      <TablePlugin anchorElm={floatingAnchorElem}></TablePlugin>
      <CheckListPlugin />
      <MarkdownPlugin></MarkdownPlugin>
      <CodeHighlightPlugin></CodeHighlightPlugin>
      <LexicalAutoLinkPlugin></LexicalAutoLinkPlugin>
      {/* <ImportPlugin content={content}></ImportPlugin> */}
      <LinkPlugin />
      <LinkPreviewPlugin></LinkPreviewPlugin>
      <CollapsiblePlugin></CollapsiblePlugin>
      <MessagePlugin></MessagePlugin>
      <EmbedExternalSystemPlugin></EmbedExternalSystemPlugin>
      {!!floatingAnchorElem && (
        <>
          <FloatingLinkEditorPlugin
            anchorElem={floatingAnchorElem}
            isLinkEditMode={isLinkEditMode}
            setIsLinkEditMode={setIsLinkEditMode}
          ></FloatingLinkEditorPlugin>
          <FloatingTextFormatToolbarPlugin
            anchorElem={floatingAnchorElem}
          ></FloatingTextFormatToolbarPlugin>
        </>
      )}
    </LexicalComposer>
  );
};
