import Parser from 'web-tree-sitter';

export async function parseDiffToAST(codeSnippet: string) {
  await Parser.init();
  const parser = new Parser();
  // Parse syntax tree
  return parser.parse(codeSnippet);
}
