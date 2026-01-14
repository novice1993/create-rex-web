# ⚡ Create Rex-Web

`npx create-rex-web <project-name>`

React, Mantine, TypeScript, MSW 기반의 최신 프론트엔드 개발 환경을 빠르게 구축해주는 CLI 도구입니다.

## ✨ 주요 기능

- **최신 기술 스택**: React 18, Mantine v7, TypeScript, Vite 등 검증된 최신 라이브러리로 구성
- **MSW 기본 통합**: API Mocking을 위한 MSW가 기본적으로 설정되어 있어, 백엔드 API 없이도 즉시 개발을 시작할 수 있습니다.
- **품질 도구 내장**: ESLint, Prettier, Husky가 기본 설정되어 있어 일관된 코드 스타일을 유지하고 커밋 전 자동으로 코드 품질을 검사합니다.
- **절대 경로 기본 설정**: `@/*` 형태의 절대 경로가 기본으로 설정되어 있어 유지보수가 용이합니다.
- **다국어 지원**: `react-i18next`를 사용한 다국어 설정이 포함되어 있습니다.

## 🚀 사용법

터미널에 다음 명령어를 입력하여 새로운 프로젝트를 생성하세요.

```bash
npx create-rex-web my-react-app
```

프로젝트 생성이 완료되면, 다음 명령어를 통해 개발 서버를 시작할 수 있습니다.

```bash
cd my-react-app
npm install
npm run dev
```

## 📁 생성되는 프로젝트 구조

```
my-react-app/
├── public/
├── src/
│   ├── components/
│   ├── constants/
│   ├── hooks/
│   ├── locale/
│   ├── mocks/
│   ├── providers/
│   ├── types/
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── .env.development
├── .env.production
├── .eslintrc.cjs
├── .gitignore
├── .prettierrc
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 📄 라이선스

MIT
