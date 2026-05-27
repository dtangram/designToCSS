export interface IterationMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  generatedCode?: {
    htmlTailwind: string;
    reactTailwind: string;
    vueTailwind?: string;
    sassCode?: string;
    css3Code?: string;
  };
}
