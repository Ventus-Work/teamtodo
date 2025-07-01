# TeamTodo - 협업용 TO-DO 리스트 🚀

소규모 팀(최대 10명)을 위한 협업용 TO-DO 리스트 웹 애플리케이션입니다.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Platform](https://img.shields.io/badge/platform-Web-orange.svg)

## 🎯 데모

- **라이브 데모**: [TeamTodo 체험하기](https://teamtodo.vercel.app)
- **테스트 계정**: 구글 로그인 또는 데모 모드로 즉시 체험 가능

## 🚀 주요 기능

### ✅ 할 일 관리
- **할 일 추가/완료/삭제**: 직관적인 할 일 관리
- **우선순위 설정**: 높음/보통/낮음 단계별 관리
- **마감일 설정**: 날짜별 일정 관리
- **상태 추적**: 대기중/진행중/완료 상태 관리

### 👥 워크스페이스
- **프로젝트별 관리**: 독립적인 워크스페이스 생성
- **팀 협업**: 워크스페이스 공유 및 협업
- **권한 관리**: 생성자/멤버 역할 구분

### 📊 대시보드
- **실시간 통계**: 완료율, 진행 상황 시각화
- **우선순위별 분류**: 컬러 코딩으로 직관적 확인
- **마감일 알림**: 임박한 작업 하이라이트

### 🔐 인증 시스템
- **Google OAuth**: 간편한 구글 계정 로그인
- **이메일 인증**: 전통적인 이메일/패스워드 방식
- **테스트 계정**: 즉시 체험 가능한 데모 모드

## 🛠️ 기술 스택

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Supabase (PostgreSQL + Authentication + Realtime)
- **Deployment**: Vercel
- **Database**: PostgreSQL (via Supabase)
- **Authentication**: Supabase Auth (Google OAuth, Email/Password)

## 🚀 시작하기

### 📦 빠른 시작

```bash
# 1. 저장소 클론
git clone https://github.com/your-username/teamtodo.git
cd teamtodo

# 2. 환경 변수 설정
cp .env.example .env.local
# .env.local 파일에 Supabase 정보 추가

# 3. 로컬 서버 실행
npx serve
# 또는
python -m http.server 8000
```

### 🌐 배포하기

#### Vercel (권장)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/teamtodo)

#### 수동 배포
자세한 배포 가이드는 [DEPLOYMENT.md](DEPLOYMENT.md)를 참조하세요.

## 📋 요구 사항

- **Supabase 계정**: 데이터베이스 및 인증
- **모던 브라우저**: Chrome, Firefox, Safari, Edge
- **인터넷 연결**: 실시간 동기화를 위해 필요

## 🔧 설정

### Supabase 설정
1. [Supabase](https://supabase.com)에서 새 프로젝트 생성
2. 프로젝트 URL과 Anon Key 복사
3. `.env.local` 파일에 정보 추가
4. 애플리케이션이 자동으로 필요한 테이블 생성

### Google OAuth (선택사항)
1. [Google Cloud Console](https://console.cloud.google.com)에서 OAuth 클라이언트 생성
2. Supabase Authentication 설정에서 Google 프로바이더 활성화
3. 클라이언트 ID와 시크릿 추가

## 📄 라이센스

이 프로젝트는 MIT 라이센스 하에 있습니다 - 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 🤝 기여하기

기여는 언제나 환영합니다! [CONTRIBUTING.md](CONTRIBUTING.md)를 참조하세요.