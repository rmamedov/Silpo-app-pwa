// Сільпо — home screen content model (from design handoff data.js).
// In production this comes from the API; the Silpo MCP integration can
// replace `sections[].products` with live catalogue data.
export const homeData = {
  services: [
    { kind: 'sp',       label: 'Мої пропозиції', count: '9 шт' },
    { kind: 'yezzzmob', label: 'Мобільний звʼязок Yezzz!' },
    { kind: 'fav',      label: 'Улюблене' },
    { kind: 'wheel',    label: 'Колесо фортуни' },
    { kind: 'bvr',      label: 'Великий ВР' },
    { kind: 'vilno',    label: 'Вільнокаса' },
    { kind: 'mink',     label: 'Власні бренди' },
    { kind: 'yezzz',    label: 'Yezzz!', badge: 'НОВЕ' },
  ],

  brandCards: [
    { id: 'silpo', tile: 'silpo', grad: 'linear-gradient(107deg,#FFE7D3,#FFCFA9)',
      footGrad: 'rgba(254,133,34,.16)', title: 'Сільпо\nЗнижки тижня', cta: 'Каталог акцій' },
    { id: 'loko',  tile: 'loko',  grad: 'linear-gradient(107deg,#FFD9EB,#FFB9DB)',
      footGrad: 'rgba(255,106,213,.16)', title: 'Доставка\nза 25 хв', cta: 'Дивитися розпродаж' },
  ],

  sections: [
    {
      id: 'week',
      title: 'Знижки тижня',
      desc: 'Економте більше з Власним Рахунком',
      products: [
        { id: 'p1', name: "Майонез Hellmann's Original 73% с/б", emoji: '🥫', tint: 'linear-gradient(135deg,#FFF0E0,#FFE1C1)', old: 199, price: 159, unit: '250 г', accent: '#2458D3' },
        { id: 'p2', name: 'Фісташки смажені солоні',              emoji: '🥜', tint: 'linear-gradient(135deg,#EBF9ED,#CDF0D3)', old: 179, price: 144, unit: '250 г', accent: '#1135BA' },
        { id: 'p3', name: 'Олія оливкова «Премія»® Pure суміш',  emoji: '🫒', tint: 'linear-gradient(135deg,#F1F2F8,#E4E5ED)', old: 249, price: 199, unit: '500 мл', accent: '#1135BA' },
        { id: 'p4', name: 'Маршмелоу асорті',                     emoji: '🍬', tint: 'linear-gradient(135deg,#FAE6F0,#F7D4E5)', old: 59.99, price: 44.99, unit: '200 г', accent: '#1135BA' },
        { id: 'p5', name: 'Кава мелена «Lavazza» Crema e Gusto',  emoji: '☕', tint: 'linear-gradient(135deg,#FFF6E0,#FFEDC1)', old: 289, price: 219, unit: '250 г', accent: '#1135BA' },
      ],
    },
    {
      id: 'tsino',
      title: 'Цінотижики',
      desc: 'Щотижневі ціни, які тішать',
      products: [
        { id: 't1', name: "Майонез Hellmann's Original 73% с/б", emoji: '🥫', tint: 'linear-gradient(135deg,#FFF0E0,#FFE1C1)', old: 199, price: 159, unit: '250 г', accent: '#2458D3', bubble: 'tsino' },
        { id: 't2', name: 'Фісташки смажені солоні',              emoji: '🥜', tint: 'linear-gradient(135deg,#EBF9ED,#CDF0D3)', old: 179, price: 144, unit: '250 г', accent: '#1135BA', bubble: 'klatsni' },
        { id: 't3', name: 'Олія оливкова «Премія»® Pure суміш',  emoji: '🫒', tint: 'linear-gradient(135deg,#F1F2F8,#E4E5ED)', old: 249, price: 199, unit: '500 мл', accent: '#1135BA', bubble: 'tsino' },
        { id: 't4', name: 'Маршмелоу асорті',                     emoji: '🍬', tint: 'linear-gradient(135deg,#FAE6F0,#F7D4E5)', old: 59.99, price: 44.99, unit: '200 г', accent: '#1135BA', bubble: 'klatsni' },
        { id: 't5', name: 'Печиво вівсяне з журавлиною',          emoji: '🍪', tint: 'linear-gradient(135deg,#FFF0E0,#FFC384)', old: 89, price: 64, unit: '300 г', accent: '#1135BA', bubble: 'tsino' },
      ],
    },
    {
      id: 'fresh',
      title: 'Овочі та фрукти',
      desc: 'Свіже щодня — з полиці на стіл',
      weighed: true,
      products: [
        { id: 'f1', name: 'Банан',                  emoji: '🍌', tint: 'linear-gradient(135deg,#FFF6E0,#FFDB84)', old: 4.90, price: 3.26, unit: 'кг', kg: true, accent: '#1135BA' },
        { id: 'f2', name: 'Огірок короткоплідний',  emoji: '🥒', tint: 'linear-gradient(135deg,#EBF9ED,#CDF0D3)', old: 11.90, price: 8.20, unit: 'кг', kg: true, accent: '#1135BA' },
        { id: 'f3', name: 'Виноград кишміш білий',  emoji: '🍇', tint: 'linear-gradient(135deg,#EEE7FF,#DDD2FF)', old: 24.90, price: 18.96, unit: 'кг', kg: true, accent: '#1135BA' },
        { id: 'f4', name: 'Томат рожевий тепличний', emoji: '🍅', tint: 'linear-gradient(135deg,#FFEBEF,#FFCED7)', old: 32.90, price: 25.50, unit: 'кг', kg: true, accent: '#1135BA' },
        { id: 'f5', name: 'Яблуко Гала',            emoji: '🍎', tint: 'linear-gradient(135deg,#FFEBEF,#FFCED7)', old: 19.90, price: 14.90, unit: 'кг', kg: true, accent: '#1135BA' },
      ],
    },
  ],
};
