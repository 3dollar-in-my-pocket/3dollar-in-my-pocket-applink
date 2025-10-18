import { useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

const DynamicLink = () => {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const path = params['*'] || '';
  const appScheme = import.meta.env.VITE_APP_SCHEME || 'dollars';

  useEffect(() => {
    const tryAppDeepLink = async () => {
      const deepLink = `${appScheme}://${path}${location.search}`;
      window.location.href = deepLink;
      setTimeout(() => {
        if (document.visibilityState === 'visible') {
          const userAgent = navigator.userAgent.toLowerCase();

          if (/iphone|ipad|ipod|apple/.test(userAgent)) {
            window.location.href = 'https://apps.apple.com/kr/app/%EA%B0%80%EC%8A%B4%EC%86%8D-3%EC%B2%9C%EC%9B%90-%EB%82%98%EC%99%80-%EA%B0%80%EA%B9%8C%EC%9A%B4-%ED%91%B8%EB%93%9C%ED%8A%B8%EB%9F%AD%EA%B3%BC-%EA%B8%B8%EA%B1%B0%EB%A6%AC-%EC%9D%8C%EC%8B%9D/id1496099467';
          } else if (/android/.test(userAgent)) {
            window.location.href = 'https://play.google.com/store/apps/details?id=com.zion830.threedollars';
          } else {
            navigate('/');
          }
        }
      }, 2000);
    };

    tryAppDeepLink();
  }, [path, navigate]);

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#2a2a2a',
      color: '#ffffff',
      fontFamily: "'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
      textAlign: 'center',
      padding: '20px'
    }}>
      <div>
        <h1 style={{ fontSize: '24px', marginBottom: '16px' }}>앱으로 이동중...</h1>
        <p style={{ color: '#aaa', fontSize: '16px' }}>
          앱이 설치되어 있지 않다면 스토어로 이동합니다.
        </p>
      </div>
    </div>
  );
};

export default DynamicLink;
