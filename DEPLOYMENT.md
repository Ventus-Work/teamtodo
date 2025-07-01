# 배포 가이드

TeamTodo 애플리케이션을 배포하는 방법을 단계별로 설명합니다.

## 🚀 빠른 배포 (권장)

### 1. Vercel을 이용한 자동 배포

1. **GitHub에 저장소 업로드**
   ```bash
   git clone <this-repository>
   cd teamtodo
   git remote add origin https://github.com/your-username/teamtodo.git
   git push -u origin main
   ```

2. **Vercel 계정 생성 및 연결**
   - [Vercel](https://vercel.com)에 가입
   - "New Project" 클릭
   - GitHub 저장소 선택

3. **환경 변수 설정**
   Vercel 대시보드에서 Environment Variables에 다음을 추가:
   ```
   SUPABASE_URL=your-supabase-project-url
   SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

4. **배포 완료**
   - "Deploy" 버튼 클릭
   - 약 1-2분 후 배포 완료

---

## 🗄️ Supabase 설정

### 1. Supabase 프로젝트 생성

1. [Supabase](https://supabase.com) 가입
2. "New Project" 생성
3. 데이터베이스 비밀번호 설정
4. 리전 선택 (Asia Northeast 1 - Tokyo 권장)

### 2. 인증 설정

1. **Authentication > Settings**에서:
   - Site URL: `https://your-app-name.vercel.app`
   - Redirect URLs: `https://your-app-name.vercel.app/**`

2. **Google OAuth 설정** (선택사항):
   - Authentication > Providers > Google 활성화
   - Google Cloud Console에서 Client ID/Secret 획득
   - Supabase에 입력

### 3. 데이터베이스 스키마

애플리케이션에서 자동으로 필요한 테이블이 생성됩니다:
- users (사용자 정보)
- workspaces (워크스페이스)
- workspace_members (멤버십)
- todos (할 일)
- projects (프로젝트)
- tags (태그)
- 기타 시스템 테이블들

---

## 🔧 로컬 개발 환경 설정

### 1. 저장소 클론 및 설정

```bash
git clone <this-repository>
cd teamtodo
cp .env.example .env.local
```

### 2. 환경 변수 설정

`.env.local` 파일을 편집:
```
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-anon-key
```

### 3. 로컬 서버 실행

```bash
# Python을 사용하는 경우
python -m http.server 8000

# Node.js serve를 사용하는 경우
npx serve

# Live Server Extension (VS Code)
# index.html을 열고 Go Live 클릭
```

---

## 🌐 다른 플랫폼 배포

### Netlify

1. [Netlify](https://netlify.com) 가입
2. "Sites" > "Add new site" > "Deploy manually"
3. 프로젝트 폴더를 드래그 & 드롭
4. Site settings > Environment variables에 Supabase 키 추가

### GitHub Pages

1. GitHub 저장소 Settings
2. Pages 섹션에서 Source를 "GitHub Actions" 선택
3. Static HTML workflow 선택
4. Supabase 설정은 코드에 직접 포함 (보안 주의)

---

## 🔐 보안 설정

### 1. Row Level Security (RLS)

Supabase에서 RLS 정책이 자동으로 설정됩니다:
- 인증된 사용자만 데이터 접근 가능
- 사용자별 데이터 격리
- 워크스페이스 기반 권한 제어

### 2. 환경 변수 보안

- `.env` 파일은 절대 Git에 커밋하지 마세요
- Supabase Anon Key는 공개되어도 안전합니다
- Service Role Key는 절대 클라이언트에서 사용하지 마세요

---

## 📊 모니터링 및 분석

### Vercel Analytics

```javascript
// vercel.json에 추가
{
  "analytics": {
    "enable": true
  }
}
```

### Supabase 모니터링

- Dashboard에서 API 사용량 확인
- 느린 쿼리 모니터링
- 실시간 사용자 수 확인

---

## 🔧 문제 해결

### 일반적인 문제들

1. **CORS 오류**
   - Supabase 설정에서 도메인 추가
   - Site URL과 Redirect URL 확인

2. **인증 실패**
   - Environment Variables 확인
   - Supabase 프로젝트 상태 확인

3. **데이터베이스 연결 실패**
   - Supabase URL과 Key 재확인
   - RLS 정책 확인

### 로그 확인

```javascript
// 브라우저 콘솔에서
localStorage.getItem('supabase.auth.token')
```

---

## 📞 지원

문제가 있으시면:
1. GitHub Issues에 문제 보고
2. [Supabase Discord](https://discord.supabase.com) 커뮤니티 참여
3. [Vercel Support](https://vercel.com/support) 문의

---

## 🎉 배포 완료!

축하합니다! TeamTodo가 성공적으로 배포되었습니다.

이제 팀원들과 함께 효율적으로 할 일을 관리해보세요! 🚀