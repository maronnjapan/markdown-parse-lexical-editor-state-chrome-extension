import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $generateNodesFromDOM } from '@lexical/html';
import { $getRoot, $insertNodes } from 'lexical';

export const ImportPlugin = ({ content }: { content: string }) => {
  const [editor] = useLexicalComposerContext();

  editor.update(() => {
    // In the browser you can use the native DOMParser API to parse the HTML string.
    const parser = new DOMParser();
    const dom = parser.parseFromString(content, 'text/html');

    // Once you have the DOM instance it's easy to generate LexicalNodes.
    const nodes = $generateNodesFromDOM(editor, dom);

    $getRoot().clear();
    $getRoot().select();
    $insertNodes(nodes);
  });

  return null;
};

export default ImportPlugin;
