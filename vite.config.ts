import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => ({
  plugins: [react(), {
    name: 'boong-village-open-graph',
    enforce: 'post',
    generateBundle(_, bundle) {
      const index = bundle['index.html'];
      if (!index || index.type !== 'asset' || typeof index.source !== 'string') {
        this.error('Expected built index.html to generate the Boong Village share page');
      }

      this.emitFile({
        type: 'asset',
        fileName: 'event/2026-good-promotion.html',
        source: index.source
          .replace('<title>가슴속3천원</title>', '<title>붕어빵 활동하고 붕어빵 굿즈 받자! | 가슴속 3천원</title>')
          .replace('가슴속3천원 - 나와 가까운 푸드트럭과 길거리 음식', '앱에서 활동을 할 때마다 포인트가 쌓여요. 모은 포인트로 붕어빵 굿즈에 응모해 보세요.')
          .replace('<meta property="og:title" content="가슴속3천원"/>', '<meta property="og:title" content="붕어빵 활동하고 붕어빵 굿즈 받자!"/>')
          .replace('<meta property="og:description" content="나와 가까운 푸드트럭과 길거리 음식"/>', '<meta property="og:description" content="앱에서 활동을 할 때마다 포인트가 쌓여요. 모은 포인트로 붕어빵 굿즈에 응모해 보세요."/>')
          .replace('<meta property="og:url" content="https://app.threedollars.co.kr/"/>', '<meta property="og:url" content="https://app.threedollars.co.kr/event/2026-good-promotion"/>')
          .replace('<meta property="og:image" content="/og_image.png"/>', '<meta property="og:image" content="https://app.threedollars.co.kr/events/2026-good-promotion/hero.png"/>\n    <meta property="og:image:alt" content="붕어빵 키링이 달린 하트 마스코트"/>')
          .replace('app-argument=dollars://home', `app-argument=${mode === 'production' ? 'dollars' : 'dollars-dev'}://home`),
      });

      this.emitFile({
        type: 'asset',
        fileName: 'silblings_romance_2.html',
        source: index.source
          .replace('<title>가슴속3천원</title>', '<title>연애남매2 × 가슴속 3천원</title>')
          .replace('가슴속3천원 - 나와 가까운 푸드트럭과 길거리 음식', '연애남매2 투표에 참여해보세요!')
          .replace('<meta property="og:title" content="가슴속3천원"/>', '<meta property="og:title" content="연애남매2 × 가슴속 3천원"/>')
          .replace('<meta property="og:description" content="나와 가까운 푸드트럭과 길거리 음식"/>', '<meta property="og:description" content="연애남매2 투표에 참여해보세요!"/>')
          .replace('<meta property="og:url" content="https://app.threedollars.co.kr/"/>', '<meta property="og:url" content="https://app.threedollars.co.kr/silblings_romance_2"/>')
          .replace('<meta property="og:image" content="/og_image.png"/>', '<meta property="og:image" content="https://storage.threedollars.co.kr/popup/v1-bb945a25-bef0-409f-b3d7-d806c8e90d7a.png"/>')
          .replace('app-argument=dollars://home', `app-argument=${mode === 'production' ? 'dollars://pollDetail?pollId=13482757' : 'dollars-dev://pollDetail?pollId=13482753'}`),
      });

      this.emitFile({
        type: 'asset',
        fileName: 'boong-vilage.html',
        source: index.source
          .replace('<title>가슴속3천원</title>', '<title>붕어빌리지</title>')
          .replace(
            '<meta name="description" content="가슴속3천원 - 나와 가까운 푸드트럭과 길거리 음식"/>',
            '<meta name="description" content="이세계에선 내가 붕어빵 사장님?"/>',
          )
          .replace(
            '<meta property="og:title" content="가슴속3천원"/>',
            '<meta property="og:title" content="붕어빌리지"/>',
          )
          .replace(
            '<meta property="og:description" content="나와 가까운 푸드트럭과 길거리 음식"/>',
            '<meta property="og:description" content="이세계에선 내가 붕어빵 사장님?"/>',
          )
          .replace(
            '<meta property="og:url" content="https://app.threedollars.co.kr/"/>',
            '<meta property="og:url" content="https://app.threedollars.co.kr/boong-vilage"/>',
          )
          .replace(
            '<meta property="og:image" content="/og_image.png"/>',
            '<meta property="og:image" content="https://app.threedollars.co.kr/og-boong-village.png"/>\n    <meta property="og:image:width" content="1200"/>\n    <meta property="og:image:height" content="630"/>\n    <meta property="og:image:alt" content="붕어빌리지 게임 화면"/>',
          ),
      });
    },
  }],
  build: {
    // Vite 8의 기본 타깃(Safari 16.4+ 등)보다 낮은 구형 모바일 브라우저 지원을 유지하기 위해 Vite 5 기본값을 명시
    target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14'],
  },
  publicDir: 'public',
  server: {
    port: 3000,
  },
}));
