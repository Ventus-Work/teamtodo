# Supabase 설정 가이드

TeamTodo를 위한 Supabase 백엔드 설정 방법을 단계별로 설명합니다.

## 🚀 1단계: Supabase 프로젝트 생성

### 프로젝트 생성
1. [Supabase](https://supabase.com) 접속 및 로그인
2. "New Project" 클릭
3. 프로젝트 정보 입력:
   - **Name**: `TeamTodo` (또는 원하는 이름)
   - **Database Password**: 강력한 비밀번호 설정
   - **Region**: `Asia Northeast 1 (Tokyo)` 권장
4. "Create new project" 클릭

### API 키 확인
프로젝트 생성 후 Settings > API에서 확인:
```
Project URL: https://abcdefgh.supabase.co
anon public key: eyJ0eXAiOiJKV1QiLCJhbGc...
service_role key: eyJ0eXAiOiJKV1QiLCJhbGc...
```

⚠️ **중요**: `service_role` 키는 절대 클라이언트에서 사용하지 마세요!

---

## 🔐 2단계: Authentication 설정

### 기본 설정
1. **Authentication > Settings** 이동
2. **Site URL** 설정:
   ```
   http://localhost:8000 (개발용)
   https://your-app.vercel.app (배포용)
   ```
3. **Redirect URLs** 설정:
   ```
   http://localhost:8000/**
   https://your-app.vercel.app/**
   ```

### Google OAuth 설정 (선택사항)

#### Google Cloud Console 설정
1. [Google Cloud Console](https://console.cloud.google.com) 접속
2. 새 프로젝트 생성 또는 기존 프로젝트 선택
3. **APIs & Services > Credentials** 이동
4. **Create Credentials > OAuth client ID** 클릭
5. Application type: **Web application**
6. Authorized redirect URIs 추가:
   ```
   https://abcdefgh.supabase.co/auth/v1/callback
   ```

#### Supabase에서 Google 활성화
1. **Authentication > Providers** 이동
2. **Google** 제공자 활성화
3. Google에서 받은 정보 입력:
   - **Client ID**: Google에서 받은 클라이언트 ID
   - **Client Secret**: Google에서 받은 클라이언트 시크릿

---

## 🗄️ 3단계: 데이터베이스 스키마

TeamTodo는 애플리케이션 첫 실행 시 자동으로 필요한 테이블을 생성합니다.

### 자동 생성되는 테이블들:

#### 🧑‍💼 사용자 관리
- **users**: 사용자 기본 정보
- **user_action_requests**: 사용자 액션 요청
- **user_action_history**: 액션 히스토리

#### 🏢 워크스페이스 관리  
- **workspaces**: 워크스페이스 정보
- **workspace_members**: 멤버십 정보

#### ✅ 할 일 관리
- **todos**: 할 일 정보
- **todo_tags**: 할 일-태그 연결
- **comments**: 댓글 시스템
- **attachments**: 첨부파일

#### 🏷️ 분류 및 조직화
- **tags**: 태그 정보
- **projects**: 프로젝트 정보

#### 🔔 알림 시스템
- **notifications**: 알림 정보

#### 👥 권한 관리
- **permissions**: 권한 정의
- **role_permissions**: 역할-권한 연결
- **custom_roles**: 커스텀 역할
- **role_tab_permissions**: 탭별 권한

### 수동 스키마 생성 (필요한 경우)

만약 자동 생성이 안 되는 경우, SQL Editor에서 다음을 실행:

```sql
-- UUID 확장 활성화
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 사용자 테이블
CREATE TABLE IF NOT EXISTS public.users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email VARCHAR NOT NULL UNIQUE,
    full_name VARCHAR,
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    account_status VARCHAR DEFAULT 'pending' CHECK (account_status IN ('pending', 'approved', 'rejected', 'suspended')),
    approved_by UUID REFERENCES public.users(id),
    approved_at TIMESTAMPTZ,
    global_role VARCHAR DEFAULT 'user' CHECK (global_role IN ('super_admin', 'admin', 'user')),
    display_name VARCHAR,
    nickname VARCHAR
);

-- 워크스페이스 테이블
CREATE TABLE IF NOT EXISTS public.workspaces (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR NOT NULL,
    description TEXT,
    created_by UUID REFERENCES public.users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 나머지 테이블들은 애플리케이션에서 자동 생성됩니다.
```

---

## 🔒 4단계: Row Level Security (RLS) 설정

TeamTodo는 간단하고 안전한 RLS 정책을 사용합니다.

### 자동 설정되는 정책들:

모든 테이블에 대해 다음 정책이 적용됩니다:
```sql
-- 예시: users 테이블
CREATE POLICY "Allow all authenticated users to access users" 
ON users FOR ALL 
USING (auth.uid() IS NOT NULL);
```

이 정책은:
- ✅ 인증된 사용자만 데이터 접근 가능
- ✅ 무한 재귀 방지
- ✅ 높은 성능
- ✅ 간단한 유지보수

### 고급 RLS 정책 (추후 적용 예정)

향후 버전에서는 더 세밀한 권한 제어를 위해 다음과 같은 정책들이 추가될 예정입니다:

```sql
-- 워크스페이스별 데이터 격리
CREATE POLICY "Users can only access their workspace data" 
ON todos FOR ALL 
USING (
    workspace_id IN (
        SELECT workspace_id 
        FROM workspace_members 
        WHERE user_id = auth.uid()
    )
);
```

---

## 🔄 5단계: Realtime 설정

### Realtime 활성화
1. **Settings > API** 이동
2. **Realtime** 섹션에서 활성화할 테이블 선택:
   - ✅ workspaces
   - ✅ workspace_members  
   - ✅ todos
   - ✅ projects
   - ✅ comments
   - ✅ notifications

### 실시간 구독 테스트
SQL Editor에서 테스트:
```sql
-- 테스트 데이터 삽입
INSERT INTO todos (title, workspace_id, created_by) 
VALUES ('테스트 할 일', 'workspace-id', 'user-id');
```

---

## 📁 6단계: Storage 설정 (선택사항)

파일 첨부 기능을 위한 Storage 설정:

### 버킷 생성
1. **Storage** 메뉴 이동
2. **Create Bucket** 클릭
3. 버킷 이름: `teamtodo-attachments`
4. **Public bucket** 체크 (파일 공유용)

### 정책 설정
```sql
-- 인증된 사용자만 업로드 가능
CREATE POLICY "Users can upload attachments" 
ON storage.objects FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);

-- 모든 사용자가 다운로드 가능
CREATE POLICY "Anyone can view attachments" 
ON storage.objects FOR SELECT 
USING (true);
```

---

## ✅ 7단계: 설정 확인

### 체크리스트
- [ ] Supabase 프로젝트 생성 완료
- [ ] API 키 확인 및 복사
- [ ] Authentication 설정 완료
- [ ] Site URL 및 Redirect URL 설정
- [ ] Google OAuth 설정 (선택사항)
- [ ] 데이터베이스 스키마 확인
- [ ] RLS 정책 활성화
- [ ] Realtime 구독 활성화
- [ ] Storage 설정 (선택사항)

### 테스트 방법
1. 애플리케이션에서 구글 로그인 시도
2. 워크스페이스 생성 테스트
3. 할 일 추가/수정/삭제 테스트
4. 실시간 동기화 확인

---

## 🔧 문제 해결

### 자주 발생하는 문제들

#### 1. 로그인 실패
```
원인: Site URL 설정 오류
해결: Authentication > Settings에서 정확한 URL 확인
```

#### 2. 데이터 로딩 실패
```
원인: RLS 정책 미설정
해결: SQL Editor에서 RLS 정책 확인 및 적용
```

#### 3. 실시간 업데이트 안됨
```
원인: Realtime 구독 비활성화
해결: Settings > API에서 테이블별 Realtime 활성화
```

#### 4. CORS 오류
```
원인: Redirect URL 미설정
해결: Authentication > Settings에서 모든 필요한 URL 추가
```

### 로그 확인 방법

#### Supabase 로그
1. **Logs** 메뉴에서 실시간 로그 확인
2. **SQL Editor**에서 쿼리 실행 결과 확인

#### 브라우저 콘솔
```javascript
// Supabase 연결 상태 확인
console.log('Supabase URL:', supabase.supabaseUrl);
console.log('Current User:', supabase.auth.user());
```

---

## 📚 추가 리소스

- [Supabase 공식 문서](https://supabase.com/docs)
- [Row Level Security 가이드](https://supabase.com/docs/guides/auth/row-level-security)
- [Realtime 설정 가이드](https://supabase.com/docs/guides/realtime)
- [Google OAuth 설정](https://supabase.com/docs/guides/auth/social-login/auth-google)

---

## 🆘 지원

설정 중 문제가 발생하면:
- [Supabase Discord](https://discord.supabase.com) 커뮤니티 참여
- [GitHub Issues](https://github.com/your-username/teamtodo/issues)에 문제 보고
- [Supabase Support](https://supabase.com/support) 문의

---

축하합니다! 🎉 Supabase 설정이 완료되었습니다. 이제 TeamTodo를 실행해보세요!