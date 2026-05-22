import { Answer, MbtiScores, MbtiDimension } from '@/types';

const QUESTIONS_PER_DIMENSION = 3;

export function calculateScores(answers: Answer[]): MbtiScores {
  const raw: Record<MbtiDimension, { first: number; second: number }> = {
    EI: { first: 0, second: 0 },
    SN: { first: 0, second: 0 },
    TF: { first: 0, second: 0 },
    JP: { first: 0, second: 0 },
  };

  for (const answer of answers) {
    const dim = getDimension(answer.type);
    const isFirst = isFirstLetter(answer.type, dim);
    if (isFirst) {
      raw[dim].first += answer.value;
    } else {
      raw[dim].second += answer.value;
    }
  }

  return {
    EI: toScore(raw.EI, 'E'),
    SN: toScore(raw.SN, 'S'),
    TF: toScore(raw.TF, 'T'),
    JP: toScore(raw.JP, 'J'),
  };
}

function toScore(
  raw: { first: number; second: number },
  _firstLetter: string,
): { score: number; percentage: number } {
  const total = QUESTIONS_PER_DIMENSION;
  const score = raw.first - raw.second;
  // percentage: 첫 번째 글자(E/S/T/J) 쪽으로 갈수록 100에 가까움
  const percentage = Math.round(((raw.first / total) * 100));
  return { score, percentage };
}

function getDimension(type: string): MbtiDimension {
  if (type === 'E' || type === 'I') return 'EI';
  if (type === 'S' || type === 'N') return 'SN';
  if (type === 'T' || type === 'F') return 'TF';
  return 'JP';
}

function isFirstLetter(type: string, dim: MbtiDimension): boolean {
  return type === dim[0];
}

export function determineMbti(scores: MbtiScores): string {
  const e = scores.EI.score >= 0 ? 'E' : 'I';
  const s = scores.SN.score >= 0 ? 'S' : 'N';
  const t = scores.TF.score >= 0 ? 'T' : 'F';
  const j = scores.JP.score >= 0 ? 'J' : 'P';
  return `${e}${s}${t}${j}`;
}
