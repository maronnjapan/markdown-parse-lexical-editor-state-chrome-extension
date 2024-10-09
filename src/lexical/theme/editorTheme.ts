import { EditorThemeClasses } from 'lexical';
import styles from '../styles/EditorTheme.module.css';

const tableTailwindClasses = 'border-2 w-max';
const tableHeaderTailwindClasses = 'border-2 bg-slate-100 w-30';
const tableBodyTailwindClasses = 'border-2';
const ulTailwindClasses = 'list-disc';
const olTailwindClasses = 'list-decimal';
export const theme: EditorThemeClasses = {
  heading: {
    h1: styles.h1,
    h2: styles.h2,
    h3: styles.h3,
    h4: styles.h4,
    h5: styles.h5,
    h6: styles.h6,
  },
  quote: styles.quote,
  list: {
    ul: `${styles.ul} ${ulTailwindClasses}`,
    ol: `${styles.ol} ${olTailwindClasses}`,
    listitem: styles.listitem,
    nested: {
      listitem: styles.nestedListItem,
    },
    listitemChecked: styles.listitemChecked,
    listitemUnchecked: styles.listitemUnchecked,
  },
  code: styles.code,
  codeHighlight: {
    atrule: styles.tokenAttr,
    attr: styles.tokenAttr,
    boolean: styles.tokenProperty,
    builtin: styles.tokenSelector,
    cdata: styles.tokenComment,
    char: styles.tokenSelector,
    class: styles.tokenFunction,
    'class-name': styles.tokenFunction,
    comment: styles.tokenComment,
    constant: styles.tokenProperty,
    deleted: styles.tokenProperty,
    doctype: styles.tokenComment,
    entity: styles.tokenOperator,
    function: styles.tokenFunction,
    important: styles.tokenVariable,
    inserted: styles.tokenSelector,
    keyword: styles.tokenAttr,
    namespace: styles.tokenVariable,
    number: styles.tokenProperty,
    operator: styles.tokenOperator,
    prolog: styles.tokenComment,
    property: styles.tokenProperty,
    punctuation: styles.tokenPunctuation,
    regex: styles.tokenVariable,
    selector: styles.tokenSelector,
    string: styles.tokenSelector,
    symbol: styles.tokenProperty,
    tag: styles.tokenProperty,
    url: styles.tokenOperator,
    variable: styles.tokenVariable,
  },
  text: {
    bold: styles.textBold,
    code: styles.textCode,
    italic: styles.textItalic,
    strikethrough: styles.textStrikethrough,
    subscript: styles.textSubscript,
    superscript: styles.textSuperscript,
    underline: styles.textUnderline,
    underlineStrikethrough: styles.textUnderlineStrikethrough,
  },
  link: styles.link,
  table: tableTailwindClasses,
  tableCellHeader: tableHeaderTailwindClasses,
  tableCell: tableBodyTailwindClasses,
};
