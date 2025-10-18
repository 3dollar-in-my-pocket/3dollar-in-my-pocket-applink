import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Bookmark = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const appScheme = import.meta.env.VITE_APP_SCHEME || 'dollars';
    const iosAppStoreUrl = "https://apps.apple.com/kr/app/%EA%B0%80%EC%8A%B4%EC%86%8D-3%EC%B2%9C%EC%9B%90-%EB%82%98%EC%99%80-%EA%B0%80%EA%B9%8C%EC%9A%B4-%ED%91%B8%EB%93%9C%ED%8A%B8%EB%9F%AD%EA%B3%BC-%EA%B8%B8%EA%B1%B0%EB%A6%AC-%EC%9D%8C%EC%8B%9D/id1496099467";
    const androidAppStoreUrl = "https://play.google.com/store/apps/details?id=com.zion830.threedollars";

    const [platform, setPlatform] = useState<'ios' | 'android' | 'unknown'>('unknown');
    const [showDownloadLink, setShowDownloadLink] = useState(false);

    useEffect(() => {
        const ua = navigator.userAgent.toLowerCase();
        const isIOS = /iphone|ipod/.test(ua) || (/ipad/.test(ua));
        const isAndroid = /android/.test(ua);

        if (isIOS) {
            setPlatform('ios');
        } else if (isAndroid) {
            setPlatform('android');
        } else {
            setPlatform('unknown');
        }
    }, [navigate, location.search]);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();

        const deepLink = `${appScheme}://bookmark${location.search}`;
        const startTime = Date.now();

        window.location.href = deepLink;

        setTimeout(() => {
            const elapsedTime = Date.now() - startTime;
            if (elapsedTime < 1500) {
                setShowDownloadLink(true);
            }
        }, 1000);
    };

    return (
        <div className="container">
            <div className="title">
                <div className="title-line">
                    <span className="white">내 </span><span className="highlight">음식 폴리</span>
                </div>
                <div className="title-line">
                    <span className="white">들어볼래?</span>
                </div>

                <p className="description">
                    친구가 공유한 맛집 플레이리스트를<br />
                    지금 바로 가슴속 3천원에서 확인해보세요!
                </p>
            </div>

            <div className="download-buttons" style={{ flexDirection: 'column', alignItems: 'center' }}>
                <a href="#"
                   onClick={handleClick}
                   className="download-btn bookmark-btn">
                    <span>보러가기</span>
                </a>

                {showDownloadLink && (
                    <div className="download-link-container">
                        <p className="download-message">앱이 설치되어 있지 않나요?</p>
                        {platform !== 'unknown' ? (
                            <a
                                href={platform === 'android' ? androidAppStoreUrl : iosAppStoreUrl}
                                className="download-link"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                앱 다운로드 하기
                            </a>
                        ) : (
                            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '8px' }}>
                                <a
                                    href={iosAppStoreUrl}
                                    className="download-link"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    iOS 다운로드
                                </a>
                                <span style={{ color: '#ffffff', opacity: 0.5 }}>|</span>
                                <a
                                    href={androidAppStoreUrl}
                                    className="download-link"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Android 다운로드
                                </a>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Bookmark;
