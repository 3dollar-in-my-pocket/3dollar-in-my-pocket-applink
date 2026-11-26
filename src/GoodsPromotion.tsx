import './GoodsPromotion.css';

const IMAGE_BASE = '/events/2026-good-promotion';

const prizes = [
    {
        name: '태그미 붕어빵 키링',
        description: '노플라스틱선데이 콜라보 · 폰에 대면 앱이 열리는 NFC 키링',
        image: `${IMAGE_BASE}/keyring.png`,
    },
    {
        name: '붕어빵 핫팩',
        description: '진짜 팥이 든 재사용 핫팩 · 전자레인지 30~40초',
        image: `${IMAGE_BASE}/hotpack.png`,
    },
];

const GoodsPromotion = () => (
    <>
        <header className="goods-hero">
            <p className="goods-badge">가슴속 3천원 겨울 이벤트</p>
            <h1 className="goods-title">
                붕어빵 활동하고<br/>
                <span className="goods-accent">붕어빵 굿즈</span> 받자!
            </h1>
            <p className="goods-lead">
                앱에서 활동을 할 때마다 포인트가 쌓여요.<br/>
                모은 포인트로 굿즈에 응모해 보세요.
            </p>
            <div className="goods-hero-image">
                <img src={`${IMAGE_BASE}/hero.png`} alt="붕어빵 키링이 달린 하트 마스코트" width={290} height={339}/>
            </div>
            <dl className="goods-info">
                <div>
                    <dt>이벤트 기간</dt>
                    <dd>11월 30일(월) ~ 12월 13일(일)</dd>
                </div>
            </dl>
        </header>

        <section className="goods-section">
            <p className="goods-kicker">경품</p>
            <h2>붕어빵 킹 경품</h2>
            <div className="goods-prizes">
                {prizes.map((prize) => (
                    <article key={prize.name} className="goods-prize">
                        <img src={prize.image} alt={prize.name} width={405} height={411} loading="lazy"/>
                        <h3>{prize.name}</h3>
                        <p>{prize.description}</p>
                    </article>
                ))}
            </div>
        </section>

        <p className="goods-howto">앱에서 활동하고 포인트 모아 응모하면 끝!</p>



        <p className="goods-footnote">적립 기준과 유의사항은 앱에서 확인할 수 있어요.</p>
    </>
);

export default GoodsPromotion;
