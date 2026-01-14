#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const args = process.argv.slice(2);
const projectName = args[0];

function showHelp() {
  console.log(`
⚡ Create Rex-Web 프론트엔드 개발환경 셋팅 도구

사용법:
  npx create-rex-web <project-name>

예시:
  npx create-rex-web my-dashboard

MUI에서 Mantine으로 마이그레이션된 최신 개발 환경을 제공합니다.
포함된 기술 스택:
  ⚛️ React 18 + TypeScript
  🎨 Mantine v7
  🎭 MSW (Mock Service Worker)
  🌍 React i18next (다국어)
  📊 ECharts (차트)
  🔄 TanStack Query (상태 관리)
  📝 React Hook Form (폼 관리)
  🐶 Husky (Git Hooks)
  `);
}

function copyDirRecursive(src, dest) {
  try {
    fs.mkdirSync(dest, { recursive: true });
    const entries = fs.readdirSync(src, { withFileTypes: true });

    for (const entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);

      const finalDestPath = entry.name === "gitignore" ? path.join(dest, ".gitignore") : destPath;

      if (entry.isDirectory()) {
        copyDirRecursive(srcPath, finalDestPath);
      } else {
        fs.copyFileSync(srcPath, finalDestPath);
      }
    }
  } catch (error) {
    console.error(`❌ 파일 복사 중 오류 발생: ${src} -> ${dest}`);
    throw error;
  }
}

function createProject(projectName) {
  if (!projectName) {
    console.error("❌ 프로젝트 이름 또는 경로를 입력해주세요.");
    showHelp();
    process.exit(1);
  }

  // 현재 디렉토리 설치인지 확인
  const isCurrentDir = projectName === "." || projectName === "./";

  let finalProjectName;
  let projectPath;
  let shouldCreateDir = true;

  if (isCurrentDir) {
    // 현재 디렉토리에 직접 설치
    projectPath = process.cwd();
    finalProjectName = path.basename(projectPath);
    shouldCreateDir = false;

    // 현재 디렉토리가 비어있는지 확인
    const entries = fs.readdirSync(projectPath);
    if (entries.length > 0) {
      console.error("❌ 현재 디렉토리가 비어있지 않습니다. 빈 디렉토리에서 실행해주세요.");
      process.exit(1);
    }
  } else {
    // 경로인지 확인 (/, \ 포함)
    const isPath = projectName.includes("/") || projectName.includes("\\");

    if (isPath) {
      // 경로인 경우
      projectPath = path.resolve(process.cwd(), projectName);
      finalProjectName = path.basename(projectPath);
    } else {
      // 일반 프로젝트 이름인 경우
      if (!/^[a-zA-Z0-9-_]+$/.test(projectName)) {
        console.error("❌ 유효한 프로젝트 이름을 입력해주세요.");
        showHelp();
        process.exit(1);
      }
      finalProjectName = projectName;
      projectPath = path.resolve(process.cwd(), projectName);
    }
  }

  // 최종 프로젝트 이름 유효성 검사
  if (!finalProjectName || !/^[a-zA-Z0-9-_]+$/.test(finalProjectName)) {
    console.error("❌ 유효한 프로젝트 이름을 입력해주세요.");
    showHelp();
    process.exit(1);
  }

  if (shouldCreateDir && fs.existsSync(projectPath)) {
    console.error(`❌ '${finalProjectName}' 디렉토리가 이미 존재합니다.`);
    process.exit(1);
  }

  console.log(`\n⚡ 프로젝트 생성 시작: ${finalProjectName}\n`);

  try {
    if (shouldCreateDir) {
      fs.mkdirSync(projectPath);
    }
    process.chdir(projectPath);
    console.log(`📁 ${shouldCreateDir ? "디렉토리 생성 완료" : "현재 디렉토리 사용"}: ${projectPath}`);

    // package.json 생성
    console.log("📦 package.json 생성 중...");
    const packageJson = {
      name: finalProjectName,
      version: "0.1.0",
      private: true,
      type: "module",
      scripts: {
        dev: "vite --host",
        build: "tsc -b && vite build",
        lint: "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
        preview: "vite preview",
        "type-check": "tsc --noEmit",
        "mock:init": "npx msw init public --save",
        format: 'prettier --write "src/**/*.{ts,tsx,js,jsx}"',
        prepare: "husky install"
      },
      dependencies: {
        "@emotion/react": "^11.14.0",
        "@hookform/resolvers": "^3.9.0",
        "@mantine/core": "^7.15.2",
        "@mantine/dates": "^7.15.2",
        "@mantine/hooks": "^7.15.2",
        "@react-google-maps/api": "^2.20.6",
        "@tanstack/react-query": "^5.59.15",
        "@tanstack/react-table": "^8.20.5",
        axios: "^1.7.7",
        dayjs: "^1.11.13",
        echarts: "^5.5.1",
        "echarts-for-react": "3.0.2",
        jotai: "^2.9.3",
        msw: "^2.8.2",
        react: "^18.3.1",
        "react-csv": "^2.2.2",
        "react-dom": "^18.3.1",
        "react-error-boundary": "^5.0.0",
        "react-hook-form": "^7.53.1",
        "react-i18next": "^15.0.2",
        "react-icons": "^5.3.0",
        "react-router-dom": "^6.26.2",
        "rex-web-table": "^1.1.0",
        zod: "^3.23.8"
      },
      devDependencies: {
        "@types/node": "^20.11.30",
        "@types/react": "^18.3.3",
        "@types/react-csv": "^1.1.10",
        "@types/react-dom": "^18.3.0",
        "@typescript-eslint/eslint-plugin": "^8.21.0",
        "@typescript-eslint/parser": "^8.21.0",
        "@vitejs/plugin-react": "^4.3.1",
        eslint: "^9.18.0",
        "eslint-config-prettier": "^10.0.1",
        "eslint-plugin-react": "^7.37.4",
        "eslint-plugin-react-hooks": "^5.1.0",
        globals: "^15.14.0",
        husky: "^9.1.7",
        "lint-staged": "^15.4.1",
        prettier: "^3.4.2",
        typescript: "^5.5.3",
        vite: "^5.4.1",
        "vite-plugin-dts": "^4.0.0",
        "vite-plugin-svgr": "^4.3.0"
      }
    };
    fs.writeFileSync("package.json", JSON.stringify(packageJson, null, 2));

    // 템플릿 복사
    const cliEntryFile = require.main?.filename || "";
    const cliPath = path.dirname(cliEntryFile);
    const templatesPath = path.join(cliPath, "..", "templates");
    if (fs.existsSync(templatesPath)) {
      copyDirRecursive(templatesPath, projectPath);
      console.log("✅ 템플릿 복사 완료");
    } else {
      console.error("❌ 템플릿 경로를 찾을 수 없습니다.");
      process.exit(1);
    }

    fs.writeFileSync(".env.development", `VITE_ENABLE_MSW=true\nNODE_ENV=development`);
    fs.writeFileSync(".env.production", `VITE_ENABLE_MSW=false\nNODE_ENV=production`);
    fs.writeFileSync("README.md", `# ${finalProjectName}\n\nCreate Rex-Web으로 생성된 React + MUI 프로젝트입니다.`);

    const envProduction = `# Production Environment Variables
VITE_ENABLE_MSW=false
NODE_ENV=production`;
    fs.writeFileSync(".env.production", envProduction);
    console.log("  ✅ .env.development, .env.production 생성 완료");

    // 5. README.md 파일 생성
    console.log("📝 README.md 생성 중...");
    const readme = `# ${projectName}

Create Rex-Web으로 생성된 React + Mantine 프로젝트입니다.

## 🚀 시작하기

1. **의존성 설치**
   \`\`\`bash
   npm install
   \`\`\`
   *이 과정에서 Husky가 자동으로 Git hooks를 설정합니다.*

2. **개발 서버 실행**
   \`\`\`bash
   npm run dev
   \`\`\`

## 📖 주요 스크립트

- \`npm run dev\`: 개발 서버를 시작합니다. (MSW 활성화)
- \`npm run build\`: 프로덕션용으로 앱을 빌드합니다.
- \`npm run lint\`: ESLint로 코드 품질을 검사합니다.
- \`npm run format\`: Prettier로 코드를 포맷팅합니다.

## 📁 디렉토리 구조

- \`src/components/common\`: 공통 재사용 컴포넌트
- \`src/hooks\`: 커스텀 훅
- \`src/mocks\`: MSW Mock Server 관련 파일 (handlers, setup)
- \`src/providers\`: 전역 Context Provider
- \`.husky\`: Git hooks 설정 (pre-commit)
`;
    fs.writeFileSync("README.md", readme);

    // --- 최종 안내 ---
    console.log("\n\n✅ 프로젝트 생성 완료!");
    console.log("----------------------------------------");
    console.log(`
다음 단계를 진행해주세요:

  1. 프로젝트 디렉토리로 이동:
     cd ${projectName}

  2. 의존성 설치:
     npm install

  3. 개발 서버 시작:
     npm run dev
`);
    console.log("----------------------------------------\n");
  } catch (error) {
    console.error("\n❌ 프로젝트 생성 중 오류가 발생했습니다:", /** @type {Error} */ (error).message);
    // 생성 실패 시 생성된 디렉토리 정리
    process.chdir("..");
    fs.rmSync(projectPath, { recursive: true, force: true });
    process.exit(1);
  }
}

if (args.length === 0 || args.includes("help") || args.includes("--help") || args.includes("-h")) {
  showHelp();
} else {
  createProject(projectName);
}
