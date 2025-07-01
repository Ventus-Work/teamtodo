// TeamTodo JavaScript 파일
// 기존 인라인 JavaScript를 이곳으로 이동 예정

console.log('script.js 파일이 로드되었습니다.');

// ==================== Supabase 설정 ====================

// Supabase 클라이언트 초기화
let supabase = null;

// 환경 변수 로드 및 Supabase 초기화 함수
async function initSupabase() {
    try {
        // 환경 설정 가져오기
        const config = await window.TeamTodoConfig.getSupabaseConfig();
        const { supabaseUrl, supabaseKey } = config;
        
        if (!supabaseUrl || !supabaseKey) {
            console.error('❌ Supabase URL 또는 API 키가 환경 변수에 설정되지 않았습니다.');
            throw new Error('Supabase 환경 변수가 설정되지 않았습니다.');
        }
        
        // Supabase 클라이언트 생성
        supabase = supabase.createClient(supabaseUrl, supabaseKey);
        console.log('✅ Supabase 클라이언트 초기화 완료');
        
        return true;
    } catch (error) {
        console.error('❌ Supabase 초기화 오류:', error);
        return false;
    }
}

// 초기화 시도
initSupabase();

// ==================== 🚨 최우선: 버튼 클릭 함수들 정의 ====================

// 로그인 버튼 클릭 핸들러 (즉시 정의)
function handleLoginClick() {
    console.log('🔑 로그인 버튼이 클릭되었습니다!');
    
    // 로그인 모달 표시 시도
    try {
        const modal = document.getElementById('loginModal');
        if (modal) {
            modal.classList.remove('hidden');
            modal.style.display = 'flex';
            console.log('로그인 모달 표시됨');
        } else {
            console.log('로그인 모달을 찾을 수 없습니다');
            // 모달이 없는 경우 직접 구글 로그인 시도
            loginWithGoogle();
        }
    } catch (error) {
        console.error('모달 표시 오류:', error);
        // 오류 발생 시 직접 구글 로그인 시도
        loginWithGoogle();
    }
}

// 데모 버튼 클릭 핸들러 (즉시 정의)
function handleDemoClick() {
    console.log('✨ 데모 버튼이 클릭되었습니다!');
    alert('데모 모드로 진입합니다!');
    
    // 데모 계정으로 자동 로그인 시도
    try {
        loginWithEmail('demo@teamtodo.com', 'demo1234');
    } catch (error) {
        console.error('데모 로그인 오류:', error);
        showNotification('데모 모드 로그인 중 오류가 발생했습니다', 'error');
    }
}

// 구글 로그인 함수
async function loginWithGoogle() {
    console.log('🔑 구글 로그인 시도...');
    
    try {
        if (!supabase) {
            // 환경 설정 가져오기
            const config = await window.TeamTodoConfig.getSupabaseConfig();
            const { supabaseUrl, supabaseKey } = config;
            
            if (!supabaseUrl || !supabaseKey) {
                throw new Error('Supabase 환경 변수가 설정되지 않았습니다.');
            }
            
            // Supabase 클라이언트 초기화 재시도
            supabase = supabaseJs.createClient(supabaseUrl, supabaseKey);
        }
        
        // 구글 OAuth 제공자로 로그인 요청
        const { user, session, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: window.location.origin // 현재 페이지로 리디렉션
            }
        });
        
        if (error) throw error;
        
        console.log('✅ 구글 로그인 프로세스 시작 - 리디렉션 중...');
        // 여기서는 추가적인 작업이 필요 없음. Supabase가 OAuth 흐름을 처리함
        
    } catch (error) {
        console.error('❌ 구글 로그인 오류:', error);
        
        // 대체 방법: 순수 구글 OAuth 페이지로 이동
        const googleAuthUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
        
        // 환경 변수에서 가져오거나 기본값 사용
        let clientId = ''; // 환경 변수에서 가져오거나 Vercel에 설정해야 함
        
        // 환경 변수에서 가져오기 시도
        try {
            const envResponse = await fetch('/api/env');
            const envData = await envResponse.json();
            clientId = envData.GOOGLE_CLIENT_ID || '';
        } catch (envError) {
            console.error('환경 변수를 가져오는 중 오류 발생:', envError);
        }
        
        if (!clientId) {
            alert('Google 로그인을 위한 설정이 완료되지 않았습니다. 관리자에게 문의하세요.');
            return;
        }
        
        const redirectUri = encodeURIComponent(window.location.origin);
        const scope = encodeURIComponent('email profile');
        
        window.location.href = `${googleAuthUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;
        console.log('⚠️ Supabase 로그인 실패로 인해 직접 Google 로그인 페이지로 리디렉션');
    }
}

// 이메일 로그인 함수 
async function loginWithEmail(email, password) {
    // 인자로 전달된 값이 없으면 폼에서 가져옴
    if (!email || !password) {
        email = document.getElementById('loginEmail').value;
        password = document.getElementById('loginPassword').value;
        
        if (!email || !password) {
            showNotification('이메일과 비밀번호를 입력해주세요.', 'error');
            return;
        }
    }
    
    try {
        if (!supabase) {
            // 환경 설정 가져오기
            const config = await window.TeamTodoConfig.getSupabaseConfig();
            const { supabaseUrl, supabaseKey } = config;
            
            if (!supabaseUrl || !supabaseKey) {
                throw new Error('Supabase 환경 변수가 설정되지 않았습니다.');
            }
            
            // Supabase 클라이언트 초기화 재시도
            supabase = supabaseJs.createClient(supabaseUrl, supabaseKey);
        }
        
        const { user, session, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });
        
        if (error) throw error;
        
        console.log('✅ 이메일 로그인 성공!', user);
        hideLoginModal();
        showNotification('로그인에 성공했습니다.', 'success');
        
    } catch (error) {
        console.error('❌ 이메일 로그인 오류:', error);
        showNotification('로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.', 'error');
    }
}

// 회원가입 함수
async function signupWithEmail() {
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const passwordConfirm = document.getElementById('signupPasswordConfirm').value;
    
    if (!name || !email || !password) {
        showNotification('모든 필드를 입력해주세요.', 'error');
        return;
    }
    
    if (password !== passwordConfirm) {
        showNotification('비밀번호가 일치하지 않습니다.', 'error');
        return;
    }
    
    try {
        if (!supabase) {
            // 환경 설정 가져오기
            const config = await window.TeamTodoConfig.getSupabaseConfig();
            const { supabaseUrl, supabaseKey } = config;
            
            if (!supabaseUrl || !supabaseKey) {
                throw new Error('Supabase 환경 변수가 설정되지 않았습니다.');
            }
            
            // Supabase 클라이언트 초기화 재시도
            supabase = supabaseJs.createClient(supabaseUrl, supabaseKey);
        }
        
        const { user, session, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    name
                }
            }
        });
        
        if (error) throw error;
        
        console.log('✅ 회원가입 성공!', user);
        showNotification('회원가입이 완료되었습니다. 이메일을 확인해주세요.', 'success');
        switchLoginMode('email'); // 로그인 모드로 변경
        
    } catch (error) {
        console.error('❌ 회원가입 오류:', error);
        showNotification('회원가입에 실패했습니다. 다시 시도해주세요.', 'error');
    }
}

// 로그아웃 함수
async function handleLogout() {
    try {
        if (!supabase) {
            // 환경 설정 가져오기
            const config = await window.TeamTodoConfig.getSupabaseConfig();
            const { supabaseUrl, supabaseKey } = config;
            
            if (!supabaseUrl || !supabaseKey) {
                throw new Error('Supabase 환경 변수가 설정되지 않았습니다.');
            }
            
            // Supabase 클라이언트 초기화 재시도
            supabase = supabaseJs.createClient(supabaseUrl, supabaseKey);
        }
        
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        
        console.log('✅ 로그아웃 성공!');
        showNotification('로그아웃되었습니다.', 'success');
        
    } catch (error) {
        console.error('❌ 로그아웃 오류:', error);
        showNotification('로그아웃 중 오류가 발생했습니다.', 'error');
    }
}

// 로그인 모드 전환 함수
function switchLoginMode(mode) {
    const emailLoginForm = document.getElementById('emailLoginForm');
    const signupForm = document.getElementById('signupForm');
    const emailBtn = document.querySelector('.mode-btn:nth-child(1)');
    const signupBtn = document.querySelector('.mode-btn:nth-child(2)');
    
    if (mode === 'email') {
        emailLoginForm.classList.remove('hidden');
        signupForm.classList.add('hidden');
        emailBtn.classList.add('active');
        signupBtn.classList.remove('active');
    } else if (mode === 'signup') {
        emailLoginForm.classList.add('hidden');
        signupForm.classList.remove('hidden');
        emailBtn.classList.remove('active');
        signupBtn.classList.add('active');
    }
}

// 기본 유틸리티 함수들
function showNotification(message, type = 'info') {
    console.log(`[${type.toUpperCase()}] ${message}`);
    // 임시 알림 표시
    alert(message);
}

// 모달 숨기기 함수들
function hideLoginModal() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.classList.add('hidden');
        modal.style.display = 'none';
    }
}

// 전역 window 객체에 명시적으로 할당 (브라우저 호환성)
window.handleLoginClick = handleLoginClick;
window.handleDemoClick = handleDemoClick;
window.loginWithGoogle = loginWithGoogle;
window.loginWithEmail = loginWithEmail;
window.signupWithEmail = signupWithEmail;
window.handleLogout = handleLogout;
window.hideLoginModal = hideLoginModal;
window.switchLoginMode = switchLoginMode;

// DOM 로드 완료 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM 로드 완료 - 초기화 시작');
    
    // Supabase 초기화 재시도
    try {
        if (typeof supabaseJs !== 'undefined' && !supabase) {
            initSupabase().then(success => {
                if (success) {
                    console.log('✅ Supabase 클라이언트 초기화 완료 (DOM 로드 후)');
                }
            });
        }
    } catch (error) {
        console.error('❌ Supabase 초기화 오류 (DOM 로드 후):', error);
    }
    
    // 버튼 이벤트 리스너 추가 확인
    const loginBtn = document.getElementById('login-btn');
    const demoBtn = document.getElementById('demo-btn');
    
    if (loginBtn) {
        console.log('✅ 로그인 버튼 찾음 - onclick 이벤트 설정됨');
        // 이벤트 리스너 방식으로도 추가 (백업)
        loginBtn.addEventListener('click', handleLoginClick);
    } else {
        console.log('❌ 로그인 버튼을 찾을 수 없음');
    }
    
    if (demoBtn) {
        console.log('✅ 데모 버튼 찾음 - onclick 이벤트 설정됨');
        // 이벤트 리스너 방식으로도 추가 (백업)
        demoBtn.addEventListener('click', handleDemoClick);
    } else {
        console.log('❌ 데모 버튼을 찾을 수 없음');
    }
    
    // 구글 로그인 버튼 확인
    const googleLoginBtn = document.getElementById('googleLoginBtn');
    if (googleLoginBtn) {
        console.log('✅ 구글 로그인 버튼 찾음 - onclick 이벤트 설정됨');
        // 이벤트 리스너 방식으로도 추가 (백업)
        googleLoginBtn.addEventListener('click', loginWithGoogle);
    }
    
    console.log('🎉 초기화 완료!');
});