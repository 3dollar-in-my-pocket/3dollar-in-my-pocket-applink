import {useEffect, useState} from 'react';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import './BoongVillage.css';
import './TopRankings.css';

const DynamicLink = () => {
    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const path = params['*'] || '';
    const isBoongVillage = path === 'boong-vilage' || path === 'boong-vilage/';
    const isTopRankings = path === 'top-ranking' || path === 'top-rankings';
    const appScheme = import.meta.env.VITE_APP_SCHEME || 'dollars';
    const iosAppStoreUrl = "https://apps.apple.com/kr/app/%EA%B0%80%EC%8A%B4%EC%86%8D-3%EC%B2%9C%EC%9B%90-%EB%82%98%EC%99%80-%EA%B0%80%EA%B9%8C%EC%9A%B4-%ED%91%B8%EB%93%9C%ED%8A%B8%EB%9F%AD%EA%B3%BC-%EA%B8%B8%EA%B1%B0%EB%A6%AC-%EC%9D%8C%EC%8B%9D/id1496099467";
    const androidAppStoreUrl = "https://play.google.com/store/apps/details?id=com.zion830.threedollars";

    const [platform, setPlatform] = useState<'ios' | 'android' | 'unknown'>('unknown');
    const [showDownloadLink, setShowDownloadLink] = useState(false);
    const destination = isBoongVillage
        ? `browser?url=${encodeURIComponent(import.meta.env.VITE_BOONG_VILLAGE_URL)}`
        : isTopRankings
            ? 'home?tabId=CURATION'
            : `${path}${location.search}`;
    const deepLink = `${appScheme}://${destination}`;

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
        <div className={isBoongVillage ? 'container boong-page' : isTopRankings ? 'container rankings-page' : 'container'}>
            {isBoongVillage ? (
                <div className="title boong-intro">
                    <h1>붕어 빌리지</h1>
                    <p className="boong-headline">이세계에선 내가<br />붕어빵 사장님? 🐟</p>
                    <p className="description">
                        붕어빌리지 OPEN!<br />
                        나만의 붕어빵 가게, 지금 시작해보세요!
                    </p>
                </div>
            ) : isTopRankings ? (
                <div className="title">
                    <h1 className="title-line">
                        지금 인기 있는<br />
                        <span className="highlight">길거리 맛집 랭킹</span>
                    </h1>
                    <p className="description">
                        오늘은 어디로 먹으러 갈까요?<br />
                        가슴속 3천원에서 인기 가게를 만나보세요.
                    </p>
                </div>
            ) : (
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
                    지금 바로 가슴속 3천원을 이용해보세요!
                </p>
            </div>
            )}

            <div className="download-buttons" style={{ flexDirection: 'column', alignItems: 'center' }}>
                <a href={deepLink}
                   onClick={handleClick}
                   className="download-btn bookmark-btn">
                    <span>{isBoongVillage ? '장사 시작하기' : isTopRankings ? '랭킹 보러가기' : '보러가기'}</span>
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
            {isBoongVillage && (
                <figure className="boong-preview">
                    <img src="/boong-village-preview.png" alt="붕어 빌리지 게임 화면. 팥과 슈크림을 골라 붕어빵을 굽고 손님에게 판매하는 모습" />
                    <figcaption>나만의 붕어빵 가게를 열어보세요</figcaption>
                </figure>
            )}
        </div>
    );
};

export default DynamicLink;
