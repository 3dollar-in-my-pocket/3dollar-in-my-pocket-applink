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
          const ua = navigator.userAgent.toLowerCase();
          const isIOS = /iphone|ipod/.test(ua) || (/ipad/.test(ua));
          const isAndroid = /android/.test(ua);
          
          if (isIOS) {
              window.location.href = 'https://apps.apple.com/kr/app/your-app-id';
          } else if (isAndroid) {
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
