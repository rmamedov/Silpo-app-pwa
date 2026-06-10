// Сільпо — Home screen (PWA, built to the official Figma spec)
import { useEffect, useState } from 'react';
import Icon from './components/Icon.jsx';
import {
  VRMark, ServiceMark, SilpoTile, LokoTile, AllInOne, CategoryTileIcon,
  TsinoMark, PercentMark, GiftBadge, AddPlusMark,
} from './components/logos.jsx';
import ProductScreen from './components/ProductScreen.jsx';
import { homeData as D } from './data/home.live.js';

// Flat product helpers for navigation / similar-products
const ALL_PRODUCTS = D.sections.flatMap((s) => s.products);
const TSINO_IDS = new Set((D.sections.find((s) => s.id === 'tsino')?.products || []).map((p) => p.id));
const sectionOf = (id) => D.sections.find((s) => s.products.some((p) => p.id === id));

/* ---------- Top app bar: address + VR bonus + avatar (52px, padding 10 16) ---------- */
const Header = ({ bonus, address, notif }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8,
    height: 52, padding: '10px 16px', flex: 'none' }}>
    <button style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, minWidth: 0, height: 32,
      background: 'transparent', border: 0, padding: 0, cursor: 'pointer', textAlign: 'left' }}>
      <Icon name="pin" size={24} color="var(--black-72)"/>
      <span style={{ fontSize: 14, fontWeight: 400, lineHeight: '18px', color: 'var(--black-72)',
        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{address}</span>
    </button>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 'none' }}>
      <button style={{ display: 'flex', alignItems: 'center', gap: 4, height: 32, padding: '4px 8px 4px 4px',
        background: 'var(--blue-50)', borderTop: '1px solid #fff', border: 0,
        boxShadow: '0 1px 0 rgba(0,0,0,.06)', borderRadius: 24, cursor: 'pointer' }}>
        <VRMark size={24}/>
        <span style={{ fontSize: 16, fontWeight: 600, lineHeight: '22px', color: '#13131E' }}>{bonus}</span>
      </button>
      <button aria-label="Профіль" style={{ position: 'relative', width: 32, height: 32, border: 0,
        borderRadius: 30, background: '#2358D1', cursor: 'pointer', display: 'grid', placeItems: 'center',
        flex: 'none', padding: 0 }}>
        <Icon name="person" size={20} color="#fff"/>
        {notif && <span style={{ position: 'absolute', top: -7, right: -5, minWidth: 15, height: 14,
          padding: '1px 3px', background: '#FF0A3B', border: '1px solid #fff', borderRadius: 4,
          color: '#fff', fontSize: 10, fontWeight: 600, display: 'grid', placeItems: 'center',
          filter: 'drop-shadow(0 1px 0 rgba(0,0,0,.06))', boxSizing: 'border-box' }}>{notif}</span>}
      </button>
    </div>
  </div>
);

/* ---------- Promo banner carousel (114px slides, radius 12) + pager dots ---------- */
const slideBase = { position: 'relative', width: '100%', flex: 'none', scrollSnapAlign: 'start',
  height: 114, overflow: 'hidden', cursor: 'pointer' };

// «Власний Рахунок» berry wordmark
const VRWordmark = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="9" cy="13.5" r="4.4" fill="#7B2FF7"/>
      <circle cx="15" cy="13.5" r="4.4" fill="#A21CAF"/>
      <circle cx="12" cy="17" r="4.4" fill="#5B21B6"/>
      <path d="M12.2 8.6c.2-2.3 1.8-3.8 4.2-4-.2 2.3-1.8 3.9-4.2 4z" fill="#FF8200"/>
    </svg>
    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 8.5, lineHeight: 1.1,
      color: '#3D1F66', letterSpacing: '.2px' }}>ВЛАСНИЙ<br/>РАХУНОК</span>
  </div>
);

const SlideVR = () => (
  <div style={{ ...slideBase, background: '#9D76F4' }}>
    <svg viewBox="0 0 343 114" preserveAspectRatio="none"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
      <path d="M132 0 C 158 26, 112 62, 148 114 L 343 114 L 343 0 Z" fill="#FFD23F"/>
      <circle cx="112" cy="34" r="4.5" fill="#FFD23F"/>
      <path d="M118 72 c 8 -4 12 4 6 9 c -6 5 -12 -5 -6 -9z" fill="#FFD23F"/>
    </svg>
    <span style={{ position: 'absolute', left: 26, top: 4, fontSize: 17, letterSpacing: '-4px' }}>🍾🥬</span>
    <svg width="62" height="78" viewBox="0 0 64 84" style={{ position: 'absolute', left: 16, top: 18 }}>
      <path d="M7 20 H57 L52 75 Q51.5 80 46 80 H18 Q12.5 80 12 75 Z" fill="#F6F1E7"/>
      <rect x="23" y="26" width="18" height="5.5" rx="2.75" fill="#D9CFBC"/>
      <text x="32" y="58" textAnchor="middle" transform="rotate(-5 32 58)"
        style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontStyle: 'italic',
          fontSize: 13, fill: '#FF8200' }}>Сільпо</text>
    </svg>
    <svg width="20" height="20" viewBox="0 0 24 24" style={{ position: 'absolute', left: 78, top: 14 }}>
      <path d="M12 2.5c-4.1 0-7.5 3.2-7.5 7.4 0 5.5 6.6 10.8 6.9 11.1.2.13.4.2.6.2s.4-.07.6-.2c.3-.3 6.9-5.6 6.9-11.1 0-4.2-3.4-7.4-7.5-7.4z" fill="#FF8200"/>
      <circle cx="12" cy="9.9" r="2.7" fill="#9D76F4"/>
    </svg>
    <div style={{ position: 'absolute', right: 12, top: 9 }}><VRWordmark/></div>
    <div style={{ position: 'absolute', right: 12, top: 40, textAlign: 'right', fontWeight: 800,
      fontSize: 14, lineHeight: 1.3, color: '#4B2A8C' }}>
      СПРОБУЙТЕ ДОСТАВКУ<br/>АБО САМОВИВІЗ</div>
    <span style={{ position: 'absolute', right: 12, bottom: 10, display: 'inline-flex', alignItems: 'center',
      height: 22, padding: '0 14px', background: '#4C2F92', borderRadius: 999, color: '#fff',
      fontSize: 10, fontWeight: 800, letterSpacing: '.4px' }}>ЗАМОВИТИ</span>
  </div>
);

const SlideDelivery = () => (
  <div style={{ ...slideBase, background: '#9D76F4' }}>
    <div style={{ position: 'absolute', inset: '0 0 0 30%', background: '#FFBF02',
      clipPath: 'polygon(8% 0, 100% 0, 100% 100%, 0 100%)' }}/>
    <div style={{ position: 'absolute', left: 10, top: 8, bottom: 8, width: '26%',
      display: 'grid', placeItems: 'center', fontSize: 38, letterSpacing: '-10px' }}>🛒🥦</div>
    <span style={{ position: 'absolute', left: '6%', bottom: 10, fontSize: 16 }}>🍞</span>
    <div style={{ position: 'absolute', right: 12, top: 10, display: 'flex', gap: 2.5 }}>
      {[3, 5, 2, 6, 3, 5, 2].map((w, i) => (
        <span key={i} style={{ width: w, height: 12, background: '#000' }}/>
      ))}
    </div>
    <div style={{ position: 'absolute', left: '38%', top: 38, right: 14 }}>
      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 17, lineHeight: 1.1,
        color: '#fff', textShadow: '0 1px 0 rgba(71,39,132,.25)' }}>ДОСТАВКА ПРОДУКТІВ</div>
      <div style={{ marginTop: 4, fontWeight: 700, fontSize: 12, lineHeight: 1.15, color: '#472784' }}>
        за 30 хвилин — замовляйте в застосунку</div>
    </div>
    <span style={{ position: 'absolute', left: '44%', bottom: 8, color: '#472784', fontSize: 9 }}>✦</span>
  </div>
);

const SlideTsino = () => (
  <div style={{ ...slideBase, background: '#FFCD00', display: 'flex', alignItems: 'center',
    gap: 14, padding: '0 18px', boxSizing: 'border-box' }}>
    <TsinoMark size={56}/>
    <div>
      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 21, color: '#04000D' }}>
        ЦІНОТИЖИКИ</div>
      <div style={{ marginTop: 2, fontWeight: 600, fontSize: 12, color: 'rgba(4,0,13,.8)' }}>
        Щотижневі ціни, які тішать — щочетверга</div>
    </div>
  </div>
);

const BannerCarousel = () => {
  const [active, setActive] = useState(0);
  const slides = [SlideVR, SlideDelivery, SlideTsino];
  const onScroll = (e) => {
    const el = e.currentTarget;
    setActive(Math.min(slides.length - 1, Math.round(el.scrollLeft / el.clientWidth)));
  };
  return (
    <div style={{ padding: '4px 16px 0', flex: 'none' }}>
      <div style={{ position: 'relative', borderRadius: 12, overflow: 'hidden' }}>
        <div className="no-sb" onScroll={onScroll}
          style={{ display: 'flex', overflowX: 'auto', scrollSnapType: 'x mandatory' }}>
          {slides.map((S, i) => <S key={i}/>)}
        </div>
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 8, display: 'flex',
          justifyContent: 'center', alignItems: 'center', gap: 4, pointerEvents: 'none' }}>
          {slides.map((_, i) => (
            <span key={i} style={{ width: i === active ? 16 : 6, height: 6, borderRadius: 8,
              background: i === active ? '#FFFFFF' : 'rgba(255,255,255,.6)',
              boxShadow: '0 1px 2px rgba(0,0,0,.18)',
              transition: 'width 350ms cubic-bezier(.4,0,.2,1), background 350ms cubic-bezier(.4,0,.2,1)',
              willChange: 'width' }}/>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ---------- Search row (48px field, bg black-8) + Вільнокаса ---------- */
const SearchRow = () => (
  <div style={{ display: 'flex', gap: 8, padding: '4px 16px', flex: 'none' }}>
    <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8, height: 48, padding: '12px 16px',
      background: 'var(--black-8)', borderTop: '1px solid var(--black-4)',
      boxShadow: 'inset 0 -1px 0 rgba(255,255,255,.7)', borderRadius: 80, cursor: 'text',
      boxSizing: 'border-box' }}>
      <Icon name="search" size={24} color="var(--black-72)"/>
      <span style={{ fontSize: 16, fontWeight: 400, lineHeight: '22px', color: 'var(--black-87)' }}>
        Пошук в «Сільпо»</span>
    </div>
    <button title="Вільнокаса" style={{ width: 48, height: 48, flex: 'none', border: 0, cursor: 'pointer',
      padding: 12, background: 'var(--black-4)', borderTop: '1px solid var(--black-4)',
      boxShadow: 'inset 0 -1px 0 rgba(255,255,255,.7)', borderRadius: 80,
      display: 'grid', placeItems: 'center', boxSizing: 'border-box' }}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="rgba(19,19,30,.72)">
        <path d="M8 8v8c0 .55-.45 1-1 1s-1-.45-1-1V8c0-.55.45-1 1-1s1 .45 1 1zm4-1c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1s1-.45 1-1V8c0-.55-.45-1-1-1zm5 10c.55 0 1-.45 1-1V8c0-.55-.45-1-1-1s-1 .45-1 1v8c0 .55.45 1 1 1zM7 3H4c-1.1 0-2 .9-2 2v3c0 .55.45 1 1 1s1-.45 1-1V5h3c.55 0 1-.45 1-1s-.45-1-1-1zm13 0h-3c-.55 0-1 .45-1 1s.45 1 1 1h3v3c0 .55.45 1 1 1s1-.45 1-1V5c0-1.1-.9-2-2-2zM7 19H4v-3c0-.55-.45-1-1-1s-1 .45-1 1v3c0 1.1.9 2 2 2h3c.55 0 1-.45 1-1s-.45-1-1-1zm14-4c-.55 0-1 .45-1 1v3h-3c-.55 0-1 .45-1 1s.45 1 1 1h3c1.1 0 2-.9 2-2v-3c0-.55-.45-1-1-1zm-6.5-8c-.28 0-.5.22-.5.5v9c0 .28.22.5.5.5s.5-.22.5-.5v-9c0-.28-.22-.5-.5-.5zm-5 0c-.28 0-.5.22-.5.5v9c0 .28.22.5.5.5s.5-.22.5-.5v-9c0-.28-.22-.5-.5-.5z"/>
      </svg>
    </button>
  </div>
);

/* ---------- Secondary services rail (white 104×82 tiles) ---------- */
const ServiceTile = ({ s }) => (
  <button style={{ width: 104, height: 82, flex: 'none', border: 0, cursor: 'pointer', textAlign: 'left',
    background: '#FFFFFF', boxShadow: '0 1px 0 rgba(0,0,0,.06)', borderRadius: 12, padding: 8,
    display: 'flex', flexDirection: 'column', gap: 8 }}>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8,
      height: 32, alignSelf: 'stretch' }}>
      <ServiceMark kind={s.kind} size={32}/>
      {s.count && <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        height: 25, padding: '6px 9px', border: '1px solid var(--black-8)', borderRadius: 32,
        fontSize: 12, fontWeight: 600, color: '#13131E', boxSizing: 'border-box' }}>{s.count}</span>}
      {s.gift && <GiftBadge size={24}/>}
    </div>
    <span style={{ fontSize: 12, fontWeight: 500, lineHeight: 1.1, letterSpacing: '-0.01em',
      color: '#13131E' }}>{s.label}</span>
  </button>
);

/* ---------- Main services: Сільпо / LOKO brand cards (104px, radius 12) ---------- */
const BrandCard = ({ c }) => {
  const [a, b] = c.title.split('\n');
  return (
    <div style={{ flex: 1, borderRadius: 12, overflow: 'hidden', cursor: 'pointer' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', height: 64,
        background: c.grad, boxSizing: 'border-box' }}>
        <span style={{ flex: 1, fontSize: 14, fontWeight: 500, lineHeight: 1.1, color: 'var(--black-87)' }}>
          {a}<br/>{b}</span>
        {c.tile === 'silpo' ? <SilpoTile/> : <LokoTile/>}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', height: 40,
        background: c.footGrad, borderTop: '1px solid var(--black-4)', boxSizing: 'border-box' }}>
        <span style={{ flex: 1, fontSize: 12, fontWeight: 500, lineHeight: 1.15, letterSpacing: '-.01em',
          color: 'var(--black-87)' }}>{c.cta}</span>
        <Icon name="arrowR" size={20} color="var(--black-72)"/>
      </div>
    </div>
  );
};

const BusinessGallery = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '8px 16px', flex: 'none' }}>
    <div className="no-sb" style={{ display: 'flex', gap: 8, overflowX: 'auto', margin: '0 -16px', padding: '0 16px' }}>
      {D.services.map(s => <ServiceTile key={s.kind} s={s}/>)}
    </div>
    <div style={{ display: 'flex', gap: 8 }}>
      {D.brandCards.map(c => <BrandCard key={c.id} c={c}/>)}
    </div>
  </div>
);

/* ---------- Promo header (shared: title 20/700 + optional desc + more-button) ---------- */
const PromoHeader = ({ icon, title, desc }) => (
  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, alignSelf: 'stretch' }}>
    {icon && <div style={{ flex: 'none' }}>{icon}</div>}
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 2, minWidth: 0 }}>
      <span style={{ fontSize: 20, fontWeight: 700, lineHeight: '24px', color: '#13131E' }}>{title}</span>
      {desc && <span style={{ fontSize: 12, fontWeight: 500, lineHeight: 1.15, color: 'var(--black-87)' }}>{desc}</span>}
    </div>
    <button aria-label="Дивитися всі" style={{ width: 32, height: 32, flex: 'none', border: 0, cursor: 'pointer',
      margin: '4px 0', background: 'var(--black-4)', boxShadow: '0 1px 0 rgba(0,0,0,.06)',
      backdropFilter: 'blur(8px)', borderRadius: 8, display: 'grid', placeItems: 'center', padding: 4 }}>
      <Icon name="chevR" size={24} color="rgba(32,33,36,.72)"/>
    </button>
  </div>
);

/* ---------- Popular categories (80×111 white tiles, 48px blue-100 circle) ---------- */
const PopularCategories = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '4px 16px', flex: 'none' }}>
    <PromoHeader title="Популярні категорії"/>
    <div className="no-sb" style={{ display: 'flex', gap: 8, overflowX: 'auto', margin: '0 -16px', padding: '0 16px' }}>
      {D.categories.map(c => (
        <button key={c.id} style={{ width: 80, height: 111, flex: 'none', border: 0, cursor: 'pointer',
          background: '#FFFFFF', borderTop: '1px solid #fff', borderRadius: 12, padding: '8px 4px',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, boxSizing: 'border-box' }}>
          <CategoryTileIcon kind={c.id}/>
          <span style={{ width: 72, fontSize: 12, fontWeight: 500, lineHeight: '13px', letterSpacing: '-0.01em',
            color: 'var(--black-72)', textAlign: 'center' }}>{c.label}</span>
        </button>
      ))}
    </div>
  </div>
);

/* ---------- Product card (Figma: photo 96, gap 16, counter top:64) ---------- */
const Counter = ({ kg, step, qty, setQty }) => {
  // real per-product basket step from the Silpo API (e.g. banana 0.4 кг); design defaults otherwise
  const inc = step || (kg ? 0.1 : 1);
  const first = step || (kg ? 0.5 : 1);
  const fmtQty = (n) => `${parseFloat(n.toFixed(2))} ${kg ? 'кг' : 'шт'}`;
  if (qty <= 0) {
    return (
      <button onClick={(e) => { e.stopPropagation(); setQty(first); }} aria-label="Додати в кошик"
        style={{ position: 'absolute', right: 0, top: 64, width: 32, height: 32, background: 'transparent',
          border: 0, padding: 0, cursor: 'pointer', display: 'grid', placeItems: 'center' }}>
        <AddPlusMark size={32}/>
      </button>
    );
  }
  return (
    <div onClick={(e) => e.stopPropagation()} style={{ position: 'absolute', right: 0, top: 64, height: 32,
      width: kg ? 98 : 92, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 6px', background: 'var(--blue-700)', borderRadius: 8, boxSizing: 'border-box' }}>
      <button onClick={() => setQty(Math.max(0, +(qty - inc).toFixed(2)))} aria-label="Менше"
        style={{ width: 20, height: 20, border: 0, background: 'transparent', cursor: 'pointer', display: 'grid', placeItems: 'center' }}>
        <Icon name="minus" size={16} color="#fff" sw={2.6}/></button>
      <span style={{ fontSize: 14, fontWeight: 700, color: '#fff', whiteSpace: 'nowrap' }}>{fmtQty(qty)}</span>
      <button onClick={() => setQty(+(qty + inc).toFixed(2))} aria-label="Більше"
        style={{ width: 20, height: 20, border: 0, background: 'transparent', cursor: 'pointer', display: 'grid', placeItems: 'center' }}>
        <Icon name="plus" size={16} color="#fff" sw={2.6}/></button>
    </div>
  );
};

// Step label: the basket step + its unit (Silpo API). kg steps under 1 кг render in grams.
// e.g. step 0.25 кг → "250 г", step 0.4 кг → "400 г", step 1 шт → "1 шт".
const stepLabel = (p) => {
  const step = p.step || (p.kg ? 0.1 : 1);
  if (p.kg || p.unit === 'кг') {
    const g = Math.round(step * 1000);
    return g < 1000 ? `${g} г` : `${parseFloat((g / 1000).toFixed(2))} кг`;
  }
  return `${parseFloat(step.toFixed(2))} ${p.unit || 'шт'}`;
};

const ProductCard = ({ p, showTsino, qty, setQty, fav, toggleFav, onOpen }) => {
  const disc = p.old ? Math.round((1 - p.price / p.old) * 100) : 0;
  const fmt = (n) => n.toFixed(2);
  return (
    <div onClick={onOpen} style={{ width: 96, flex: 'none', display: 'flex', flexDirection: 'column', gap: 16, cursor: 'pointer' }}>
      <div style={{ position: 'relative', width: 96, height: 96, borderRadius: 8, background: p.tint || '#fff',
        display: 'grid', placeItems: 'center', fontSize: 50 }}>
        {p.img
          ? <img src={p.img} alt="" width="96" height="96" loading="lazy"
              style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: 8 }}/>
          : <span>{p.emoji}</span>}
        <div style={{ position: 'absolute', left: 0, top: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
          {showTsino && <TsinoMark size={32}/>}
          {showTsino && p.old > p.price && <PercentMark size={32}/>}
        </div>
        <button onClick={(e) => { e.stopPropagation(); toggleFav(); }} aria-label="В улюблене"
          style={{ position: 'absolute', right: 0, top: 0, width: 24, height: 24, border: 0,
            background: 'transparent', cursor: 'pointer', display: 'grid', placeItems: 'center', padding: 0 }}>
          <Icon name={fav ? 'heart' : 'heartO'} size={18} color={fav ? '#FF0A3B' : 'var(--black-38)'}/>
        </button>
        <Counter kg={p.kg} step={p.step} qty={qty} setQty={setQty}/>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 4, height: 16 }}>
            {p.old > p.price && <>
              <span style={{ fontSize: 12, fontWeight: 400, lineHeight: '16px', color: 'rgba(32,33,36,.87)',
                textDecoration: 'line-through', textDecorationColor: 'rgba(32,33,36,.38)' }}>{fmt(p.old)}</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', height: 16, padding: '0 4px',
                background: '#FE8522', borderRadius: 4, color: '#fff', fontWeight: 600, fontSize: 12,
                lineHeight: '16px' }}>−{disc}%</span>
            </>}
          </div>
          <span style={{ fontSize: 16, fontWeight: 700, lineHeight: '22px', color: '#202124' }}>
            {fmt(p.price)} ₴</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span style={{ fontSize: 12, fontWeight: 600, lineHeight: '16px', color: '#202124' }}>{stepLabel(p)}</span>
          <span style={{ fontSize: 12, fontWeight: 400, lineHeight: '16px', color: '#202124',
            display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {p.name}</span>
        </div>
      </div>
    </div>
  );
};

/* ---------- Promo section (white card radius 24, padding 16, gap 16) ---------- */
const PromoSection = ({ sec, cart, setQty, favs, toggleFav, onOpen }) => (
  <div style={{ background: '#fff', borderRadius: 24, padding: 16, display: 'flex', flexDirection: 'column',
    gap: 16, boxShadow: '0 1px 0 rgba(0,0,0,.06)', flex: 'none' }}>
    <PromoHeader icon={sec.icon === 'tsino'
      ? <div style={{ padding: '4px 0' }}><TsinoMark size={32}/></div>
      : <AllInOne size={32}/>}
      title={sec.title} desc={sec.desc}/>
    <div className="no-sb" style={{ display: 'flex', gap: 8, overflowX: 'auto', margin: '0 -16px', padding: '0 16px' }}>
      {sec.products.map(p => (
        <ProductCard key={p.id} p={p} showTsino={sec.icon === 'tsino'} qty={cart[p.id] || 0}
          setQty={(q) => setQty(p.id, q)} fav={!!favs[p.id]} toggleFav={() => toggleFav(p.id)}
          onOpen={() => onOpen(p)}/>
      ))}
    </div>
  </div>
);

/* ---------- Categories-main: photo tiles grid (109px, radius 12) ---------- */
const PhotoTile = ({ t, width }) => (
  <div style={{ position: 'relative', width: width || 'auto', flex: width ? 'none' : 1, height: 109,
    borderRadius: 12, overflow: 'hidden', cursor: 'pointer', background: t.bg,
    boxShadow: 'inset 0 -1px 0 rgba(0,0,0,.06), inset 0 1px 4px rgba(255,255,255,.7)' }}>
    <span style={{ position: 'absolute', right: 6, bottom: 2, fontSize: 44, letterSpacing: '-8px' }}>{t.emoji}</span>
    <div style={{ position: 'absolute', left: 8, top: 8, display: 'flex', flexDirection: 'column',
      alignItems: 'flex-start' }}>
      {t.lines.map((line, i) => (
        <span key={line} style={{ display: 'inline-flex', alignItems: 'center', height: 18, padding: '0 4px',
          background: '#fff', borderRadius: i === 0 && t.lines.length > 1 ? '4px 4px 4px 0' : 4,
          fontSize: 14, fontWeight: 600, lineHeight: '18px', color: '#13131E', whiteSpace: 'nowrap' }}>
          {line}</span>
      ))}
    </div>
  </div>
);

const CategoriesMain = () => (
  <div style={{ background: '#fff', borderRadius: 24, padding: 16, display: 'flex', flexDirection: 'column',
    gap: 16, flex: 'none' }}>
    <PromoHeader title="Категорії" desc="Усе для щоденних покупок — від свіжих овочів до делікатесів"/>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'flex', gap: 8 }}>
        <PhotoTile t={D.photoCategories[0]}/>
        <PhotoTile t={D.photoCategories[1]}/>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <PhotoTile t={D.photoCategories[2]}/>
        <PhotoTile t={D.photoCategories[3]} width={109}/>
      </div>
    </div>
  </div>
);

/* ---------- Bottom navigation bar (blur, 11px labels) + floating QR ---------- */
const TabBar = ({ tab, setTab, cartCount }) => {
  const tabs = [
    { id: 'home', label: 'Головна', icon: 'home', iconActive: 'homeF' },
    { id: 'delivery', label: 'Доставка', icon: 'delivery' },
    { id: 'cart', label: 'Кошик', icon: 'cart' },
    { id: 'store', label: 'В магазині', icon: 'store' },
    { id: 'purchases', label: 'Мої покупки', icon: 'receipt' },
  ];
  return (
    <div style={{ flex: 'none', display: 'flex', alignItems: 'flex-start', gap: 2,
      padding: '0 0 calc(12px + var(--safe-bottom))', background: 'rgba(255,255,255,.72)',
      backdropFilter: 'blur(40px)', WebkitBackdropFilter: 'blur(40px)' }}>
      {tabs.map(t => {
        const active = tab === t.id;
        const color = active ? '#2358D1' : 'var(--black-72)';
        return (
          <button key={t.id} onClick={() => setTab(t.id)} style={{ flex: 1, background: 'transparent',
            border: 0, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center',
            gap: 2, padding: '6px 0 0', position: 'relative', color }}>
            <div style={{ width: 64, height: 32, borderRadius: 16, display: 'grid', placeItems: 'center' }}>
              <Icon name={active && t.iconActive ? t.iconActive : t.icon} size={24} sw={1.8}/>
            </div>
            {t.id === 'cart' && cartCount > 0 && (
              <span style={{ position: 'absolute', top: 2, right: 'calc(50% - 22px)', minWidth: 16, height: 14,
                padding: '0 4px', background: '#C5082E', color: '#fff', fontSize: 10, fontWeight: 700,
                borderRadius: 100, display: 'grid', placeItems: 'center' }}>{cartCount}</span>)}
            <span style={{ fontSize: 11, fontWeight: 600, lineHeight: 1.3, textAlign: 'center' }}>{t.label}</span>
          </button>
        );
      })}
    </div>
  );
};

// QR Button — official 64×64 asset (circle + white 38% inner border + QR glyph)
const QrFab = () => (
  <button aria-label="Вільнокаса — сканувати" style={{ position: 'absolute', right: 16,
    bottom: 'calc(78px + var(--safe-bottom))', width: 64, height: 64, border: 0, padding: 0,
    background: 'transparent', cursor: 'pointer', display: 'grid', placeItems: 'center', zIndex: 5 }}>
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask id="qr_mask" fill="white">
        <path d="M0 32C0 14.3269 14.3269 0 32 0C49.6731 0 64 14.3269 64 32C64 49.6731 49.6731 64 32 64C14.3269 64 0 49.6731 0 32Z"/>
      </mask>
      <path d="M0 32C0 14.3269 14.3269 0 32 0C49.6731 0 64 14.3269 64 32C64 49.6731 49.6731 64 32 64C14.3269 64 0 49.6731 0 32Z" fill="#FF8200"/>
      <path d="M0 31C0 13.3269 14.3269 -1 32 -1C49.6731 -1 64 13.3269 64 31V32C64 14.8792 49.6731 1 32 1C14.3269 1 0 14.8792 0 32V31ZM0 32M64 64H0H64M64 64M0 64V0V64M0 64M64 0V64V0" fill="white" fillOpacity="0.38" mask="url(#qr_mask)"/>
      <g filter="url(#qr_shadow)">
        <path d="M18.5 30H28.5C29.33 30 30 29.33 30 28.5V19C30 17.9 29.1 17 28 17H20C18.34 17 17 18.34 17 20V28.5C17 29.33 17.67 30 18.5 30ZM20 20H27V27H20V20ZM20 47H28C29.1 47 30 46.1 30 45V35.5C30 34.67 29.33 34 28.5 34H18.5C17.67 34 17 34.67 17 35.5V44C17 45.66 18.34 47 20 47ZM20 37H27V44H20V37ZM34 18.5V28.5C34 29.33 34.67 30 35.5 30H45.5C46.33 30 47 29.33 47 28.5V20C47 18.34 45.66 17 44 17H35.5C34.67 17 34 17.67 34 18.5ZM44 27H37V20H44V27ZM38.33 38.33H34V35.5C34 34.67 34.67 34 35.5 34H38.33V38.33ZM47 38.33H42.67V34H45.5C46.33 34 47 34.67 47 35.5V38.33ZM42.67 42.66H38.34V38.33H42.67V42.66ZM38.34 46.99H35.51C34.68 46.99 34.01 46.32 34.01 45.49V42.66H38.34V46.99ZM45.51 46.99H42.68V42.66H47.01V45.49C47.01 46.32 46.34 46.99 45.51 46.99Z" fill="white"/>
      </g>
      <defs>
        <filter id="qr_shadow" x="17" y="17" width="30.0098" height="31" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dy="1"/>
          <feComposite in2="hardAlpha" operator="out"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
        </filter>
      </defs>
    </svg>
  </button>
);

/* ---------- persisted state helper ---------- */
const usePersisted = (key, initial) => {
  const [val, setVal] = useState(() => {
    try { return JSON.parse(localStorage.getItem(key)) ?? initial; }
    catch { return initial; }
  });
  useEffect(() => { localStorage.setItem(key, JSON.stringify(val)); }, [key, val]);
  return [val, setVal];
};

/* ---------- Product overlay: slides in from the right on open, out to the
   right on back. Keeps the last product mounted during the exit animation. ---------- */
function ProductOverlay({ product, cart, favs, setQty, toggleFav, onOpen, onBack }) {
  const [shown, setShown] = useState(product); // persists through the exit transition
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (product) {
      setShown(product);
      // two RAFs so the off-screen start state paints before transitioning in
      const r = requestAnimationFrame(() => requestAnimationFrame(() => setOpen(true)));
      return () => cancelAnimationFrame(r);
    }
    setOpen(false); // slide out
  }, [product]);

  if (!shown) return null;
  const p = shown;
  const similar = (sectionOf(p.id)?.products || ALL_PRODUCTS).filter((x) => x.id !== p.id);
  return (
    <div
      onTransitionEnd={(e) => { if (e.propertyName === 'transform' && !open && !product) setShown(null); }}
      style={{ position: 'fixed', inset: 0, zIndex: 50, maxWidth: 560, margin: '0 auto',
        transform: open ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 320ms cubic-bezier(.2,.7,.2,1)',
        boxShadow: open ? '-8px 0 28px rgba(0,0,0,.14)' : 'none', willChange: 'transform' }}>
      <ProductScreen
        key={p.id}
        p={p}
        onBack={onBack}
        qty={cart[p.id] || 0}
        setQty={(q) => setQty(p.id, q)}
        fav={!!favs[p.id]}
        toggleFav={() => toggleFav(p.id)}
        similar={similar}
        cart={cart}
        setQtyFor={setQty}
        showTsino={TSINO_IDS.has(p.id)}
        onOpen={onOpen}
      />
    </div>
  );
}

/* ---------- App ---------- */
export default function App() {
  const [cart, setCart] = usePersisted('silpo.cart', {});
  const [favs, setFavs] = usePersisted('silpo.favs', { '1ed075da-6532-6146-a995-dd63763181f9': true });
  const [tab, setTab] = useState('home');
  // Open product is derived straight from browser history state, so the back
  // button / back-swipe / forward / reload all stay in sync automatically.
  const [selectedId, setSelectedId] = useState(() => window.history.state?.silpoProductId || null);
  const selected = selectedId ? ALL_PRODUCTS.find(p => p.id === selectedId) || null : null;
  const setQty = (id, q) => setCart(c => { const n = { ...c }; if (q <= 0) delete n[id]; else n[id] = q; return n; });
  const toggleFav = (id) => setFavs(f => ({ ...f, [id]: !f[id] }));
  const cartCount = Object.values(cart).filter(Boolean).length;

  const openProduct = (p) => {
    window.history.pushState({ silpoProductId: p.id }, '');
    setSelectedId(p.id);
  };
  const goBack = () => window.history.back();

  // Back/forward (both fire popstate) → reflect whatever product the current
  // history entry points at (or home when there is none).
  useEffect(() => {
    const sync = () => setSelectedId(window.history.state?.silpoProductId || null);
    window.addEventListener('popstate', sync);
    return () => window.removeEventListener('popstate', sync);
  }, []);

  return (
    <div style={{ position: 'relative', height: '100dvh', background: 'var(--blue-100)',
      display: 'flex', flexDirection: 'column', maxWidth: 560, margin: '0 auto' }}>
      <div style={{ flex: 'none', paddingTop: 'var(--safe-top)' }}>
        <Header bonus={D.user.bonus} address={D.address} notif={D.user.notif}/>
      </div>
      <div className="no-sb" style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <BannerCarousel/>
        <SearchRow/>
        <BusinessGallery/>
        <PopularCategories/>
        {D.sections.map(sec => (
          <PromoSection key={sec.id} sec={sec} cart={cart} setQty={setQty} favs={favs} toggleFav={toggleFav}
            onOpen={openProduct}/>
        ))}
        <CategoriesMain/>
        <div style={{ height: 24, flex: 'none' }}/>
      </div>
      <TabBar tab={tab} setTab={setTab} cartCount={cartCount}/>
      <QrFab/>

      <ProductOverlay
        product={selected}
        cart={cart}
        favs={favs}
        setQty={setQty}
        toggleFav={toggleFav}
        onOpen={openProduct}
        onBack={goBack}
      />
    </div>
  );
}
