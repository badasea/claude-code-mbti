import { MbtiScores } from '@/types';

interface ScoreChartProps {
  scores: MbtiScores;
}

const dimensions = [
  { key: 'EI' as const, left: 'E', right: 'I', leftLabel: '외향', rightLabel: '내향' },
  { key: 'SN' as const, left: 'S', right: 'N', leftLabel: '감각', rightLabel: '직관' },
  { key: 'TF' as const, left: 'T', right: 'F', leftLabel: '사고', rightLabel: '감정' },
  { key: 'JP' as const, left: 'J', right: 'P', leftLabel: '판단', rightLabel: '인식' },
];

export default function ScoreChart({ scores }: ScoreChartProps) {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 space-y-6">
      <h3 className="text-base font-bold text-gray-700">4대 지표 분석</h3>
      {dimensions.map(({ key, left, right, leftLabel, rightLabel }) => {
        const percentage = scores[key].percentage;
        return (
          <div key={key}>
            <div className="flex justify-between text-sm font-semibold mb-2">
              <span className="text-violet-600">
                {left} <span className="font-normal text-gray-500">({leftLabel})</span>
              </span>
              <span className="text-indigo-500">
                {right} <span className="font-normal text-gray-500">({rightLabel})</span>
              </span>
            </div>
            <div className="relative w-full bg-gray-100 rounded-full h-4 overflow-hidden">
              <div
                className="absolute left-0 top-0 h-4 bg-gradient-to-r from-violet-500 to-indigo-400 rounded-full transition-all duration-700 ease-out"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>{percentage}%</span>
              <span>{100 - percentage}%</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
