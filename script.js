// TeamTodo JavaScript 파일
// 기존 인라인 JavaScript를 이곳으로 이동 예정

console.log('script.js 파일이 로드되었습니다.');

// ==================== 🚨 최우선: 버튼 클릭 함수들 정의 ====================

// 로그인 버튼 클릭 핸들러 (즉시 정의)
function handleLoginClick() {
    console.log('🔑 로그인 버튼이 클릭되었습니다!');
    alert('로그인 기능이 호출되었습니다!');
    
    // 로그인 모달 표시 시도
    try {
        const modal = document.getElementById('loginModal');
        if (modal) {
            modal.classList.remove('hidden');
            modal.style.display = 'flex';
            console.log('로그인 모달 표시됨');
        } else {
            console.log('로그인 모달을 찾을 수 없습니다');
        }
    } catch (error) {
        console.error('모달 표시 오류:', error);
    }
}

// 데모 버튼 클릭 핸들러 (즉시 정의)
function handleDemoClick() {
    console.log('✨ 데모 버튼이 클릭되었습니다!');
    alert('데모 모드로 진입합니다!');
    
    // 데모 모드 실행 시도
    try {
        console.log('데모 모드 시작...');
        // 기본 데모 로직 실행
    } catch (error) {
        console.error('데모 모드 오류:', error);
    }
}

// 전역 window 객체에 명시적으로 할당 (브라우저 호환성)
window.handleLoginClick = handleLoginClick;
window.handleDemoClick = handleDemoClick;

// 함수 정의 확인 로그
console.log('✅ 버튼 핸들러 함수들이 정의되었습니다');
console.log('handleLoginClick:', typeof handleLoginClick);
console.log('handleDemoClick:', typeof handleDemoClick);
console.log('window.handleLoginClick:', typeof window.handleLoginClick);
console.log('window.handleDemoClick:', typeof window.handleDemoClick);

// ==================== Supabase 설정 (단순화) ====================

const SUPABASE_URL = 'https://nlywtmsbkvaggfvezonj.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5seXd0bXNia3ZhZ2dmdmV6b25qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzOTAzMDEsImV4cCI6MjA2NTk2NjMwMX0.FMyZENGZkUHJEp6YFe-VdYT-L3b49si1yu6EvWun01Y';

// 연결 정보 확인
console.log('Supabase URL:', SUPABASE_URL);
console.log('Supabase Key 확인:', SUPABASE_ANON_KEY ? '설정됨' : '없음');

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

// DOM 로드 완료 시 초기화
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM 로드 완료 - 초기화 시작');
    
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
    
    console.log('🎉 초기화 완료!');
});