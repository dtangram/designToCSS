import { ColorMapping } from "./color";
import { SpacingMapping } from "./spacing";
import { TypographyMapping } from "./typography";

export interface AnalysisResponse {
  colors: ColorMapping[];
  spacing: SpacingMapping[];
  typography: TypographyMapping[];
  layoutStructure: string;
  htmlTailwind: string;
  reactTailwind: string;
  vueTailwind?: string;
  sassCode?: string;
  css3Code?: string;
}
