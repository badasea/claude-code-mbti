import { MbtiQuestion } from '@/types';

export const questions: MbtiQuestion[] = [
  {
    id: 1,
    dimension: 'EI',
    questionText: '주말에 에너지를 충전하는 방법은?',
    options: [
      { text: '친구들과 왁자지껄 모임을 즐긴다', type: 'E', value: 1 },
      { text: '혼자 조용히 집에서 쉰다', type: 'I', value: 1 },
    ],
  },
  {
    id: 2,
    dimension: 'EI',
    questionText: '처음 만난 사람과 대화할 때 나는?',
    options: [
      { text: '먼저 말을 걸고 대화를 이끈다', type: 'E', value: 1 },
      { text: '상대방이 먼저 말을 걸어오길 기다린다', type: 'I', value: 1 },
    ],
  },
  {
    id: 3,
    dimension: 'EI',
    questionText: '긴 하루를 보낸 후 나는?',
    options: [
      { text: '누군가와 대화하며 피로를 푼다', type: 'E', value: 1 },
      { text: '혼자만의 시간이 필요하다', type: 'I', value: 1 },
    ],
  },
  {
    id: 4,
    dimension: 'SN',
    questionText: '새로운 프로젝트를 시작할 때 나는?',
    options: [
      { text: '구체적인 계획과 단계별 절차를 먼저 세운다', type: 'S', value: 1 },
      { text: '큰 그림을 그리고 가능성을 먼저 탐색한다', type: 'N', value: 1 },
    ],
  },
  {
    id: 5,
    dimension: 'SN',
    questionText: '정보를 받아들일 때 나는?',
    options: [
      { text: '실제로 경험하고 확인된 사실을 선호한다', type: 'S', value: 1 },
      { text: '패턴을 찾고 미래의 가능성을 상상한다', type: 'N', value: 1 },
    ],
  },
  {
    id: 6,
    dimension: 'SN',
    questionText: '대화할 때 나는 주로?',
    options: [
      { text: '구체적인 사실과 세부 내용을 이야기한다', type: 'S', value: 1 },
      { text: '추상적인 개념이나 아이디어를 이야기한다', type: 'N', value: 1 },
    ],
  },
  {
    id: 7,
    dimension: 'TF',
    questionText: '친구가 고민을 털어놓을 때 나는?',
    options: [
      { text: '논리적으로 문제의 원인과 해결책을 찾아준다', type: 'T', value: 1 },
      { text: '먼저 공감하고 감정을 들어준다', type: 'F', value: 1 },
    ],
  },
  {
    id: 8,
    dimension: 'TF',
    questionText: '중요한 결정을 내릴 때 나는?',
    options: [
      { text: '객관적인 데이터와 논리를 기준으로 판단한다', type: 'T', value: 1 },
      { text: '내 감정과 주변 사람들에게 미치는 영향을 고려한다', type: 'F', value: 1 },
    ],
  },
  {
    id: 9,
    dimension: 'TF',
    questionText: '팀 프로젝트에서 갈등이 생겼을 때 나는?',
    options: [
      { text: '원칙과 공정성을 기준으로 해결하려 한다', type: 'T', value: 1 },
      { text: '모두의 감정과 관계를 우선적으로 고려한다', type: 'F', value: 1 },
    ],
  },
  {
    id: 10,
    dimension: 'JP',
    questionText: '여행 계획을 세울 때 나는?',
    options: [
      { text: '일정, 숙소, 동선을 꼼꼼히 미리 계획한다', type: 'J', value: 1 },
      { text: '큰 틀만 잡고 현지에서 즉흥적으로 즐긴다', type: 'P', value: 1 },
    ],
  },
  {
    id: 11,
    dimension: 'JP',
    questionText: '마감 기한이 있는 일을 할 때 나는?',
    options: [
      { text: '미리미리 진행해서 여유 있게 마무리한다', type: 'J', value: 1 },
      { text: '마감이 가까워질수록 집중력이 올라간다', type: 'P', value: 1 },
    ],
  },
  {
    id: 12,
    dimension: 'JP',
    questionText: '일상 속 나의 모습은?',
    options: [
      { text: '할 일 목록을 작성하고 체크해 나가는 편이다', type: 'J', value: 1 },
      { text: '그때그때 상황에 맞게 유연하게 행동한다', type: 'P', value: 1 },
    ],
  },
];
