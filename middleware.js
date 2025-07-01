// Vercel Edge Middleware - 환경 변수 주입
export default function middleware(request) {
  const url = new URL(request.url);
  
  // HTML 파일에 대한 요청만 처리
  if (url.pathname === '/' || url.pathname === '/index.html') {
    // 원본 HTML 파일 가져오기
    return fetch(request)
      .then(response => response.text())
      .then(html => {
        // Supabase 환경 변수 주입
        const modifiedHtml = html
          .replace('{{SUPABASE_URL}}', process.env.SUPABASE_URL || '')
          .replace('{{SUPABASE_ANON_KEY}}', process.env.SUPABASE_ANON_KEY || '');
          
        // 새로운 응답 반환
        return new Response(modifiedHtml, {
          headers: { 'Content-Type': 'text/html' },
        });
      });
  }
  
  // 다른 모든 요청은 그대로 처리
  return fetch(request);
}

export const config = {
  matcher: [
    '/',
    '/index.html'
  ],
};