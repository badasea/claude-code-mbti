export type MbtiDimension = 'EI' | 'SN' | 'TF' | 'JP';

export type MbtiLetter = 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P';

export interface MbtiOption {
  text: string;
  type: MbtiLetter;
  value: number;
}

export interface MbtiQuestion {
  id: number;
  dimension: MbtiDimension;
  questionText: string;
  options: [MbtiOption, MbtiOption];
}

export interface DimensionScore {
  score: number;
  percentage: number;
}

export interface MbtiScores {
  EI: DimensionScore;
  SN: DimensionScore;
  TF: DimensionScore;
  JP: DimensionScore;
}

export interface MbtiResult {
  mbti: string;
  title: string;
  description: string[];
  traits: string[];
  goodMatch: string;
  badMatch: string;
}

export interface Answer {
  questionId: number;
  type: MbtiLetter;
  value: number;
}
