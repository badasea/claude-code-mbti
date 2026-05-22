import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import './globals.css';

const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-noto-sans-kr',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'MBTI 성향 테스트',
    template: '%s | MBTI 성향 테스트',
  },
  description: '12개의 직관적인 질문으로 나의 MBTI 성향을 알아보세요. 16가지 유형 중 당신은 어디에 속할까요?',
  keywords: ['MBTI', '성격 테스트', '성향 테스트', '심리 테스트', '16가지 유형'],
  icons: {
    icon: '/icon.svg',
    apple: '/apple-icon.svg',
  },
  openGraph: {
    title: 'MBTI 성향 테스트',
    description: '12개의 직관적인 질문으로 나의 MBTI 성향을 알아보세요.',
    type: 'website',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary',
    title: 'MBTI 성향 테스트',
    description: '12개의 직관적인 질문으로 나의 MBTI 성향을 알아보세요.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${notoSansKr.variable} h-full antialiased`}>
      <body className={`min-h-full font-sans ${notoSansKr.className}`}>{children}</body>
    </html>
  );
}
