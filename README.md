# NESS_FRONT
NESS FE 레포지토리
## 🪧 About source code
## 👩‍💻 Prerequisites
NESS의 프론트 프레임워크는 `Next.js`로, `node version 18 이상(18.17.0 추천)`이 만족되어야 합니다. 코드를 실행하기 전, 터미널(Mac or Linux) 또는 명령 프롬프트(윈도우)에 아래의 명령어를 입력하여 올바른 node 버전이 설치되었는지 확인해주세요.
```bash
node --version
(18 이상의 버전이 설치되어 있다고 나와야 함)
```

## 🔧 How to build
이 레포지토리는 해당 명령어로 Clone 가능합니다.
```bash
git clone https://github.com/studio-recoding/NESS_FRONT.git
```
Clone이 완료된 후에는 프로젝트 경로(ness)로 이동한 후, 종속성을 설치해주어야 합니다. 특히, 이 프로젝트에서는 node 패키지 관리자로 pnpm을 사용하고 있으므로, pnpm을 추가 설치해주어야 합니다.
```bash
cd ness // 디렉토리 이동
npm install -g pnpm // pnpm node 패키지 관리자 설치
pnpm install // 종속성 설치
```

이후 ness 루트 디렉토리에 .env.local 파일을 추가하고, 아래 환경변수를 추가해주세요.
```bash
NEXT_PUBLIC_REACT_APP_API_BASE_URL = https://api.nessplanning.com
NEXT_PUBLIC_REACT_APP_WEB_BASE_URL = http://localhost:3000
NEXT_PUBLIC_REACT_APP_GOOGLE_LOGIN_URL = https://api.nessplanning.com/oauth2/authorization/google
```

##  🚀 How to run
이전 과정이 모두 관리되면, 루트 디렉토리에서 아래 명령어를 통해 local에서의 서비스 실행이 가능합니다.
```bash
pnpm run dev
```
