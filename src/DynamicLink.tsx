import {useEffect, useState} from 'react';
import {useLocation, useNavigate, useParams} from 'react-router-dom';

const DynamicLink = () => {
    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const path = params['*'] || '';
    const appScheme = import.meta.env.VITE_APP_SCHEME || 'dollars';
    const iosAppStoreUrl = "https://apps.apple.com/kr/app/%EA%B0%80%EC%8A%B4%EC%86%8D-3%EC%B2%9C%EC%9B%90-%EB%82%98%EC%99%80-%EA%B0%80%EA%B9%8C%EC%9A%B4-%ED%91%B8%EB%93%9C%ED%8A%B8%EB%9F%AD%EA%B3%BC-%EA%B8%B8%EA%B1%B0%EB%A6%AC-%EC%9D%8C%EC%8B%9D/id1496099467";
    const androidAppStoreUrl = "https://play.google.com/store/apps/details?id=com.zion830.threedollars";

    const [platform, setPlatform] = useState<'ios' | 'android' | 'unknown'>('unknown');

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

        if (isAndroid) {
            const deepLink = `${appScheme}://${path}${location.search}`;
            window.location.href = deepLink;
        }
    }, [path, navigate]);

    const handleIOSClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();

        const deepLink = `${appScheme}://${path}${location.search}`;
        const startTime = Date.now();

        window.location.href = deepLink;

        setTimeout(() => {
            const elapsedTime = Date.now() - startTime;
            if (elapsedTime < 3500) {
                window.location.href = iosAppStoreUrl;
            }
        }, 3000);
    };

    const handleAndroidClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();

        const deepLink = `${appScheme}://${path}${location.search}`;
        const startTime = Date.now();

        window.location.href = deepLink;

        setTimeout(() => {
            const elapsedTime = Date.now() - startTime;
            if (elapsedTime < 3500) {
                window.location.href = androidAppStoreUrl;
            }
        }, 3000);
    };

    return (
        <div className="container">
            <div className="title">
                <div className="title-line">
                    <span className="white">언제 어디서 </span><span className="highlight">붕어빵</span><span
                    className="white">을</span>
                </div>
                <div className="title-line">
                    <span className="white">만날지 모르니</span>
                </div>
                <div className="title-line">
                    <span className="highlight">가슴속에 3천원</span><span className="white">을</span>
                </div>
                <div className="title-line">
                    <span className="white">지니고 다녀야 해</span>
                </div>

                <p className="description">
                    다양한 길거리 음식들의 위치가 궁금했다면<br/>
                    지금 바로 가슴속 3천원을 다운로드 해보세요!
                </p>
            </div>

            <div className="download-buttons">
                {(platform === 'ios' || platform === 'unknown') && (
                    <a href={iosAppStoreUrl}
                       onClick={handleIOSClick}
                       className="download-btn">
                        <span className="icon">
                            <img src="/ios.png" alt="iOS"/>
                        </span>
                        <span>for iOS</span>
                    </a>
                )}

                {(platform === 'android' || platform === 'unknown') && (
                    <a href={androidAppStoreUrl}
                       onClick={handleAndroidClick}
                       className="download-btn">
                        <span className="icon">
                            <img src="/android.svg" alt="Android"/>
                        </span>
                        <span>for Android</span>
                    </a>
                )}
            </div>
        </div>
    );
};

export default DynamicLink;
