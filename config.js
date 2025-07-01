// TeamTodo 환경 설정 파일
// 환경 변수를 안전하게 관리하기 위한 파일입니다

// Supabase 환경 변수
async function getSupabaseConfig() {
  try {
    // 환경 변수 API를 호출하여 서버에서 설정한 환경 변수 가져오기
    const response = await fetch('/api/env');
    const data = await response.json();
    
    return {
      supabaseUrl: data.SUPABASE_URL || '',
      supabaseKey: data.SUPABASE_ANON_KEY || ''
    };
  } catch (error) {
    console.error('환경 변수를 가져오는 중 오류 발생:', error);
    return {
      supabaseUrl: '',
      supabaseKey: ''
    };
  }
}

// 환경 설정 객체
const Config = {
  getSupabaseConfig
};

// 전역 객체에 할당
window.TeamTodoConfig = Config;