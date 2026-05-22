import Button from '@/components/common/Button';

interface IntroViewProps {
  onStart: () => void;
}

export default function IntroView({ onStart }: IntroViewProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12 bg-gradient-to-br from-violet-50 to-indigo-100">
      <div className="w-full max-w-md text-center">
        <div className="text-7xl mb-6">🧠</div>
        <h1 className="text-4xl font-extrabold text-gray-800 mb-3 tracking-tight">
          MBTI 성향 테스트
        </h1>
        <p className="text-gray-500 text-lg mb-2">
          나는 어떤 사람일까?
        </p>
        <p className="text-gray-400 text-sm mb-10">
          12개의 질문으로 당신의 성향을 분석합니다.
          <br />
          솔직하게 답변할수록 정확한 결과를 얻을 수 있어요.
        </p>

        <div className="bg-white rounded-2xl p-5 mb-10 shadow-sm border border-gray-100 text-left space-y-3">
          {[
            { icon: '⏱️', text: '약 3분 소요' },
            { icon: '📝', text: '총 12문항' },
            { icon: '🔒', text: '저장 없음 · 익명' },
          ].map(({ icon, text }) => (
            <div key={text} className="flex items-center gap-3 text-gray-600 text-sm">
              <span className="text-base">{icon}</span>
              <span>{text}</span>
            </div>
          ))}
        </div>

        <Button onClick={onStart}>
          테스트 시작하기 →
        </Button>
      </div>
    </div>
  );
}
