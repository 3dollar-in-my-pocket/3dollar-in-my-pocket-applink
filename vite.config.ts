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
        fileName: 'boong-vilage/index.html',
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
  publicDir: 'public',
  server: {
    port: 3000,
  },
}));
