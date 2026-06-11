// Сільпо — Product detail screen (built to silpo-product-card-spec.md).
// The 18+ block renders only for adult goods (alcohol / tobacco): products with `adult: true`.
import { useState, useEffect, useRef } from 'react';
import Icon from './Icon.jsx';
import { TsinoMark, AddPlusMark, HeartMark, ServiceMark } from './logos.jsx';
import { gallery } from '../data/gallery.js';

const fmt = (n) => n.toFixed(2);

// Step + unit label (e.g. 0.25 кг → "250 г", 1 шт → "1 шт")
const stepLabel = (p) => {
  const step = p.step || (p.kg ? 0.1 : 1);
  if (p.kg || p.unit === 'кг') {
    const g = Math.round(step * 1000);
    return g < 1000 ? `${g} г` : `${parseFloat((g / 1000).toFixed(2))} кг`;
  }
  return `${parseFloat(step.toFixed(2))} ${p.unit || 'шт'}`;
};

const Star = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#FE8522"
    style={{ filter: 'drop-shadow(0 4px 12px rgba(254,133,34,.32))', flex: 'none' }}>
    <path d="M12 2.5l2.9 6.1 6.6.6-5 4.4 1.5 6.5L12 17.2 6 20.6l1.5-6.5-5-4.4 6.6-.6z"/>
  </svg>
);

/* ---------- Accordion row (44px, expandable) ---------- */
const Accordion = ({ label, children, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ borderTop: '1px solid rgba(32,33,36,.12)' }}>
      <button onClick={() => setOpen((o) => !o)} style={{ width: '100%', minHeight: 44, padding: '0 16px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, background: '#fff',
        border: 0, cursor: 'pointer' }}>
        <span style={{ fontSize: 16, fontWeight: 600, lineHeight: 1.35, color: '#202124', textAlign: 'left' }}>{label}</span>
        <span style={{ display: 'grid', placeItems: 'center', transition: 'transform 200ms cubic-bezier(.2,.7,.2,1)',
          transform: open ? 'rotate(90deg)' : 'none' }}>
          <Icon name="chevR" size={24} color="rgba(32,33,36,.72)"/>
        </span>
      </button>
      {open && <div style={{ padding: '0 16px 14px' }}>{children}</div>}
    </div>
  );
};

/* ---------- Bottom-bar add control ---------- */
const BottomAdd = ({ p, qty, setQty }) => {
  const inc = p.step || (p.kg ? 0.1 : 1);
  const first = p.step || (p.kg ? 0.5 : 1);
  const fmtQty = (n) => `${parseFloat(n.toFixed(2))} ${p.kg ? 'кг' : 'шт'}`;
  if (qty <= 0) {
    return (
      <button onClick={() => setQty(first)} style={{ width: 167.5, height: 48, flex: 'none', border: 0,
        borderRadius: 8, background: '#2358D1', color: '#fff', cursor: 'pointer',
        fontSize: 16, fontWeight: 700, display: 'grid', placeItems: 'center' }}>У кошик</button>
    );
  }
  return (
    <div style={{ width: 167.5, height: 48, flex: 'none', borderRadius: 8, background: '#2358D1',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 14px' }}>
      <button onClick={() => setQty(Math.max(0, +(qty - inc).toFixed(2)))} aria-label="Менше"
        style={{ width: 28, height: 28, border: 0, background: 'transparent', cursor: 'pointer', display: 'grid', placeItems: 'center' }}>
        <Icon name="minus" size={20} color="#fff" sw={2.6}/></button>
      <span style={{ fontSize: 16, fontWeight: 700, color: '#fff', whiteSpace: 'nowrap' }}>{fmtQty(qty)}</span>
      <button onClick={() => setQty(+(qty + inc).toFixed(2))} aria-label="Більше"
        style={{ width: 28, height: 28, border: 0, background: 'transparent', cursor: 'pointer', display: 'grid', placeItems: 'center' }}>
        <Icon name="plus" size={20} color="#fff" sw={2.6}/></button>
    </div>
  );
};

/* ---------- Similar product card (108px) ---------- */
const SimilarCard = ({ p, qty, setQty, onOpen }) => {
  const disc = p.old ? Math.round((1 - p.price / p.old) * 100) : 0;
  const inc = p.step || (p.kg ? 0.1 : 1);
  const first = p.step || (p.kg ? 0.5 : 1);
  const fmtQty = (n) => `${parseFloat(n.toFixed(2))} ${p.kg ? 'кг' : 'шт'}`;
  return (
    <div onClick={onOpen} style={{ width: 108, flex: 'none', display: 'flex', flexDirection: 'column', gap: 8, cursor: 'pointer' }}>
      <div style={{ position: 'relative', width: 108, height: 108, borderRadius: 8, background: '#fff' }}>
        <img src={p.img} alt="" width="108" height="108" loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: 8 }}/>
        {qty <= 0 ? (
          <button onClick={(e) => { e.stopPropagation(); setQty(first); }} aria-label="Додати в кошик"
            style={{ position: 'absolute', right: 0, bottom: 0, width: 40, height: 40, background: 'transparent',
              border: 0, padding: 0, cursor: 'pointer', display: 'grid', placeItems: 'center' }}>
            <AddPlusMark size={40}/>
          </button>
        ) : (
          <div onClick={(e) => e.stopPropagation()} style={{ position: 'absolute', right: 0, bottom: 0, width: 108, height: 32,
            background: '#2358D1', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 8px' }}>
            <button onClick={() => setQty(Math.max(0, +(qty - inc).toFixed(2)))} aria-label="Менше"
              style={{ width: 22, height: 22, border: 0, background: 'transparent', cursor: 'pointer', display: 'grid', placeItems: 'center' }}>
              <Icon name="minus" size={16} color="#fff" sw={2.6}/></button>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#fff', whiteSpace: 'nowrap' }}>{fmtQty(qty)}</span>
            <button onClick={() => setQty(+(qty + inc).toFixed(2))} aria-label="Більше"
              style={{ width: 22, height: 22, border: 0, background: 'transparent', cursor: 'pointer', display: 'grid', placeItems: 'center' }}>
              <Icon name="plus" size={16} color="#fff" sw={2.6}/></button>
          </div>
        )}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, height: 16 }}>
          {p.old > p.price && <>
            <span style={{ fontSize: 14, color: 'rgba(32,33,36,.87)', textDecoration: 'line-through',
              textDecorationColor: 'rgba(32,33,36,.38)' }}>{fmt(p.old)}</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', height: 16, padding: '0 4px',
              background: '#FE8522', borderRadius: 4, color: '#fff', fontWeight: 600, fontSize: 12 }}>−{disc}%</span>
          </>}
        </div>
        <span style={{ fontSize: 18, fontWeight: 700, lineHeight: '23px', color: '#202124' }}>{fmt(p.price)} ₴</span>
        <span style={{ fontSize: 12, fontWeight: 600, color: '#202124' }}>{stepLabel(p)}</span>
        <span style={{ fontSize: 14, lineHeight: 1.2, color: '#202124', display: '-webkit-box',
          WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', minHeight: 34 }}>{p.name}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {p.rating && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, height: 24, padding: '0 8px',
            background: '#F6F8FD', borderRadius: 100, fontSize: 13, fontWeight: 600, color: 'rgba(32,33,36,.87)' }}>
            <Star size={13}/>{p.rating}</span>}
        </div>
      </div>
    </div>
  );
};

/* ---------- Photo / video gallery (swipeable, scroll-snap) + bullets ----------
   Video items (src ending in .mp4) are streamed from the server (preload="none",
   so nothing downloads until the slide is reached) and auto-play muted the moment
   the user swipes to them; they pause + rewind when swiped away. ---------- */
const isVideo = (src) => /\.mp4(\?|$)/i.test(src);

const Gallery = ({ images, showTsino }) => {
  const [active, setActive] = useState(0);
  const vids = useRef({});
  const onScroll = (e) => {
    const el = e.currentTarget;
    setActive(Math.min(images.length - 1, Math.round(el.scrollLeft / el.clientWidth)));
  };
  // Play the active slide's video, pause + rewind the others.
  useEffect(() => {
    Object.entries(vids.current).forEach(([i, v]) => {
      if (!v) return;
      if (Number(i) === active) { const pr = v.play(); if (pr?.catch) pr.catch(() => {}); }
      else { v.pause(); try { v.currentTime = 0; } catch { /* not loaded yet */ } }
    });
  }, [active]);
  return (
    <div style={{ position: 'relative', width: '100%', flex: 'none' }}>
      <div className="no-sb" onScroll={onScroll}
        style={{ display: 'flex', overflowX: 'auto', scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}>
        {images.map((src, i) => (
          <div key={i} style={{ flex: 'none', width: '100%', aspectRatio: '1 / 1', scrollSnapAlign: 'center',
            scrollSnapStop: 'always', display: 'grid', placeItems: 'center', background: '#fff' }}>
            {isVideo(src)
              ? <video ref={(el) => { vids.current[i] = el; }} src={src} muted loop playsInline preload="none"
                  style={{ width: '100%', height: '100%', objectFit: 'contain', background: '#fff' }}/>
              : <img src={src} alt="" loading={i === 0 ? 'eager' : 'lazy'}
                  style={{ width: '86%', height: '86%', objectFit: 'contain' }}/>}
          </div>
        ))}
      </div>
      {showTsino && <div style={{ position: 'absolute', top: 16, left: 16 }}><TsinoMark size={48}/></div>}
      {images.length > 1 && (
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 12, display: 'flex',
          justifyContent: 'center', alignItems: 'center', gap: 4, pointerEvents: 'none' }}>
          {images.map((_, i) => (
            <span key={i} style={{ width: i === active ? 16 : 6, height: 6, borderRadius: 8,
              background: i === active ? '#2358D1' : 'rgba(32,33,36,.2)',
              transition: 'width 350ms cubic-bezier(.4,0,.2,1), background 350ms cubic-bezier(.4,0,.2,1)',
              willChange: 'width' }}/>
          ))}
        </div>
      )}
    </div>
  );
};

const BANANA_ID = '1ed075db-ae9b-6f2a-bf1a-dd63763181f9'; // violet «Власний Рахунок» promo shows only here

/* ---------- Product screen ---------- */
export default function ProductScreen({ p, onBack, qty, setQty, fav, toggleFav, similar, cart, setQtyFor, showTsino, onOpen }) {
  const disc = p.old ? Math.round((1 - p.price / p.old) * 100) : 0;
  const images = gallery[p.id]?.length ? gallery[p.id] : [p.img];
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#fff',
      display: 'flex', flexDirection: 'column' }}>
      {/* 1. Top app bar */}
      <div style={{ flex: 'none', paddingTop: 'var(--safe-top)', borderBottom: '1px solid rgba(32,33,36,.06)' }}>
        <div style={{ height: 56, display: 'flex', alignItems: 'center', gap: 12, padding: '0 16px' }}>
          <button onClick={onBack} aria-label="Назад" style={{ width: 24, height: 24, border: 0, padding: 0,
            background: 'transparent', cursor: 'pointer', flex: 'none', display: 'grid', placeItems: 'center' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.0069 20.0025C14.7468 20.0025 14.4967 19.9025 14.2966 19.7125L7.29266 12.7125C6.90245 12.3225 6.90245 11.6925 7.29266 11.3025L14.2966 4.2925C14.6868 3.9025 15.3171 3.9025 15.7073 4.2925C16.0976 4.6825 16.0976 5.3125 15.7073 5.7025L9.41384 11.9925L15.7073 18.2825C16.0976 18.6725 16.0976 19.3025 15.7073 19.6925C15.5072 19.8925 15.2571 19.9825 14.9969 19.9825L15.0069 20.0025Z" fill="#13131E" fillOpacity="0.72"/>
            </svg>
          </button>
          <div style={{ flex: 1, minWidth: 0 }}/>
          <button aria-label="Поділитися" style={{ width: 24, height: 24, border: 0, padding: 0, background: 'transparent',
            cursor: 'pointer', flex: 'none', display: 'grid', placeItems: 'center' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M16 9.75C15.4477 9.75 15 9.35825 15 8.875C15 8.39175 15.4477 8 16 8H18C19.1046 8 20 8.7835 20 9.75V20.25C20 21.2165 19.1046 22 18 22H6C4.89543 22 4 21.2165 4 20.25V9.75C4 8.7835 4.89543 8 6 8H8C8.55228 8 9 8.39175 9 8.875C9 9.35825 8.55228 9.75 8 9.75H6V11.5V18.5V20.25H8H16H18V18.5V11.5V9.75H16Z" fill="#2358D1"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M13 4.41421L14.2929 5.70711C14.6834 6.09763 15.3166 6.09763 15.7071 5.70711C16.0976 5.31658 16.0976 4.68342 15.7071 4.29289L12.7071 1.29289C12.3166 0.902369 11.6834 0.902369 11.2929 1.29289L8.29289 4.29289C7.90237 4.68342 7.90237 5.31658 8.29289 5.70711C8.68342 6.09763 9.31658 6.09763 9.70711 5.70711L11 4.41421V15.0667C11 15.5821 11.4477 16 12 16C12.5523 16 13 15.5821 13 15.0667V4.41421Z" fill="#2358D1"/>
            </svg>
          </button>
          <button onClick={toggleFav} aria-label="В обране" style={{ width: 24, height: 24, border: 0, padding: 0,
            background: 'transparent', cursor: 'pointer', flex: 'none', display: 'grid', placeItems: 'center' }}>
            <HeartMark size={24} filled={fav}/>
          </button>
        </div>
      </div>

      {/* scrollable body */}
      <div className="no-sb" style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
        {/* 2. Gallery */}
        <Gallery images={images} showTsino={showTsino}/>

        {/* 3. Name + stock + rating */}
        <div style={{ padding: '8px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.2, color: 'rgba(32,33,36,.87)' }}>{p.name}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {p.stock != null && (
              <span style={{ display: 'inline-flex', alignItems: 'center', height: 30, padding: '0 10px',
                background: '#F6F8FD', borderRadius: 4, fontSize: 16, color: 'rgba(32,33,36,.72)' }}>
                Лишилось: {p.stock} {p.unit || 'шт'}</span>
            )}
            {p.rating && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, height: 30, padding: '0 12px',
                background: '#F6F8FD', borderRadius: 100 }}>
                <Star size={16}/>
                <span style={{ fontSize: 16, fontWeight: 600, color: 'rgba(32,33,36,.87)' }}>{p.rating}</span>
                {p.reviews != null && <span style={{ fontSize: 16, color: 'rgba(32,33,36,.72)' }}>· {p.reviews}</span>}
              </span>
            )}
          </div>
        </div>

        {/* 4. Category */}
        {p.cat && (
          <div style={{ padding: '8px 16px' }}>
            <button style={{ width: '100%', height: 48, padding: '0 12px', display: 'flex', alignItems: 'center',
              justifyContent: 'space-between', gap: 8, background: '#F6F8FD', border: '1px solid #EEF2FC',
              borderRadius: 8, cursor: 'pointer' }}>
              <span style={{ fontSize: 16, fontWeight: 600, color: '#202124' }}>{p.cat}</span>
              <Icon name="arrowR" size={24} color="rgba(32,33,36,.72)"/>
            </button>
          </div>
        )}

        {/* 5. Description + accordions */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {(p.desc || p.allergens) && (
            <div style={{ padding: '0 16px 12px', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {p.desc && <span style={{ fontSize: 14, fontWeight: 400, lineHeight: 1.4, color: 'rgba(32,33,36,.87)' }}>{p.desc}</span>}
              {p.allergens && <span style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.4, color: '#202124' }}>Алергени: {p.allergens}</span>}
            </div>
          )}
          <Accordion label="Характеристики">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 14, color: 'rgba(32,33,36,.87)' }}>
              {p.country && <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'rgba(32,33,36,.6)' }}>Країна</span><span>{p.country}</span></div>}
              {p.abv != null && <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'rgba(32,33,36,.6)' }}>Вміст спирту</span><span>{p.abv}%</span></div>}
              {p.volume && <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'rgba(32,33,36,.6)' }}>Об’єм</span><span>{p.volume}</span></div>}
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'rgba(32,33,36,.6)' }}>Одиниця</span><span>{p.unit || 'шт'}</span></div>
            </div>
          </Accordion>
          <Accordion label="Доставка та оплата">
            <span style={{ fontSize: 14, lineHeight: 1.4, color: 'rgba(32,33,36,.87)' }}>
              Доставка додому або самовивіз із магазину. Оплата карткою онлайн, Apple Pay / Google Pay або готівкою при отриманні.</span>
          </Accordion>
        </div>

        {/* 6. Promo blocks */}
        <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {showTsino && (
            <div style={{ display: 'flex', gap: 10, padding: 14, background: '#FFFAE8', borderRadius: 8 }}>
              <TsinoMark size={32}/>
              <span style={{ fontSize: 13, lineHeight: '18px', color: 'rgba(32,33,36,.87)' }}>
                <b>Цінотижики.</b> Щотижня знижуємо ціни на улюблені товари — додавайте до кошика та економте з Власним Рахунком.</span>
            </div>
          )}
          {p.id === BANANA_ID && (
            <div style={{ display: 'flex', gap: 10, padding: 14, background: '#F2ECFC', borderRadius: 8 }}>
              <ServiceMark kind="offers" size={32}/>
              <span style={{ fontSize: 13, lineHeight: '18px', color: 'rgba(32,33,36,.87)' }}>
                <b>Власний Рахунок.</b> Отримуйте кешбек балобонусами за кожну покупку та оплачуйте ними до 99% вартості наступних замовлень у «Сільпо».</span>
            </div>
          )}
          {p.adult && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 14, background: '#FDEBED', borderRadius: 8 }}>
              <span style={{ flex: 'none', display: 'inline-flex', alignItems: 'center', height: 28, padding: '0 10px',
                border: '1.6px solid #DA291C', borderRadius: 100, fontSize: 12, fontWeight: 700, color: '#DA291C' }}>18+</span>
              <span style={{ fontSize: 14, lineHeight: 1.25, color: 'rgba(32,33,36,.87)' }}>
                Продаж алкогольних напоїв та тютюнових виробів особам до 18 років заборонено. Надмірне споживання алкоголю шкідливе для вашого здоров’я.</span>
            </div>
          )}
        </div>

        {/* 7. Similar products */}
        {similar?.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 8 }}>
            <div style={{ height: 40, padding: '8px 16px', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: 18, fontWeight: 600, lineHeight: 1.35, color: '#202124' }}>Схожі товари</span>
            </div>
            <div className="no-sb" style={{ display: 'flex', gap: 8, overflowX: 'auto', padding: '0 16px' }}>
              {similar.map((s) => (
                <SimilarCard key={s.id} p={s} qty={cart[s.id] || 0} setQty={(q) => setQtyFor(s.id, q)}
                  onOpen={() => onOpen(s)}/>
              ))}
            </div>
          </div>
        )}
        <div style={{ height: 16, flex: 'none' }}/>
      </div>

      {/* 8. Bottom bar */}
      <div style={{ flex: 'none', borderTop: '1px solid rgba(32,33,36,.12)', background: '#fff',
        padding: '12px 16px calc(12px + var(--safe-bottom))', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {p.old > p.price && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, height: 18 }}>
              <span style={{ fontSize: 16, color: 'rgba(32,33,36,.87)', textDecoration: 'line-through',
                textDecorationColor: 'rgba(32,33,36,.38)' }}>{fmt(p.old)}</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', height: 22, padding: '0 6px',
                background: '#FFCD00', borderRadius: 4, fontSize: 16, fontWeight: 600, color: '#202124' }}>−{disc}%</span>
            </div>
          )}
          <span style={{ fontSize: 24, fontWeight: 700, lineHeight: 1, color: '#202124' }}>{fmt(p.price)} ₴</span>
          <span style={{ fontSize: 14, lineHeight: 1.1, color: 'rgba(32,33,36,.6)' }}>{p.volume || stepLabel(p)}</span>
        </div>
        <BottomAdd p={p} qty={qty} setQty={setQty}/>
      </div>
    </div>
  );
}
