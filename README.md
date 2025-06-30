# TeamTodo - 협업용 TO-DO 리스트

소규모 팀(최대 10명)을 위한 협업용 TO-DO 리스트 웹 애플리케이션입니다.

![TeamTodo Preview](https://github.com/your-username/teamtodo/raw/main/screenshots/preview.png)

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

### 로컬에서 실행하기

1. 저장소를 클론합니다.
   ```
   git clone https://github.com/your-username/teamtodo.git
   cd teamtodo
   ```

2. 필요한 환경 변수를 설정합니다.
   ```
   cp .env.example .env.local
   ```
   `.env.local` 파일을 수정하여 Supabase URL과 Anon Key를 추가합니다.

3. 로컬 서버를 실행합니다.
   ```
   npx serve
   ```

### Vercel에 배포하기

1. GitHub에 저장소를 Fork 또는 Push합니다.
2. [Vercel](https://vercel.com)에 로그인합니다.
3. "New Project"를 클릭하고 저장소를 선택합니다.
4. Supabase 환경 변수를 추가합니다.
5. "Deploy" 버튼을 클릭합니다.

## 📄 라이센스

이 프로젝트는 MIT 라이센스 하에 있습니다 - 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 🤝 기여하기

기여는 언제나 환영합니다! [CONTRIBUTING.md](CONTRIBUTING.md)를 참조하세요.