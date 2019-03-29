import { IMode } from "../models/codemirror";

export const MODES: IMode[] = ["c", "c++", "java", "c#", "javascript"];

export const CLIKE: { [key: string]: string } = {
  c: "x-csrc",
  "c++": "x-c++src",
  java: "x-java",
  "c#": "x-csharp"
};
