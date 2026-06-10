// Сільпо — home screen LIVE data snapshot, structured to the official Figma spec.
// Product price / oldPrice / unit (ratio) / step fetched per-product via Silpo MCP
// silpo_get_product_details on 2026-06-10 for branch
// 1edee435-04af-6882-8c3a-c70e6ed87655 (Київ, доставка додому).
// Unit of measure = API `ratio` ("кг" weighted / "шт" piece); step = API add-to-basket step.
// In production this comes from the Silpo API at runtime.

export const homeData = {
  user: {
    bonus: '1235', // 1235.78 ВР (silpo_get_loyalty_info)
    notif: '3',    // unread messages badge on the avatar
  },
  address: 'Регенераторна вулиця, 4к2, Київ', // silpo_get_shopping_cart_by_id

  // secondary-services rail (Figma: white 104×82 tiles)
  services: [
    { kind: 'offers2',    label: 'Мої пропозиції', count: '92' },
    { kind: 'wheel',      label: 'Колесо фортуни' },
    { kind: 'kasa',       label: 'Каса вражень', count: '4' },
    { kind: 'yezzzmob',   label: 'Yezzz!', gift: true },
    { kind: 'vilnoSplit', label: 'Вільнокаса' },
    { kind: 'mink',       label: 'Власні бренди' },
    { kind: 'lokoMini',   label: '¡LOKO!' },
    { kind: 'fav',        label: 'Улюблене' },
  ],

  // main-services brand cards (Figma: 104px tall, radius 12, CTA «Замовити»)
  brandCards: [
    { id: 'silpo', tile: 'silpo', grad: 'linear-gradient(106.74deg,#FFE7D3 0%,#FFCFA9 100.23%)',
      footGrad: 'rgba(254,133,34,.16)', title: '«Сільпо»\nдоставка', cta: 'Замовити' },
    { id: 'loko',  tile: 'loko',  grad: 'linear-gradient(106.83deg,#FFD9EB 0.23%,#FFB9DB 100%)',
      footGrad: 'rgba(255,106,213,.16)', title: 'Доставка\nза 30 хв', cta: 'Замовити' },
  ],

  // Популярні категорії (Figma: 80×111 tiles, 48px blue-100 circle, blue-500 icon)
  categories: [
    { id: 'fruits',  label: 'Фрукти, овочі' },
    { id: 'meat',    label: 'М’ясо, риба' },
    { id: 'dairy',   label: 'Молочні продукти та яйця' },
    { id: 'bread',   label: 'Хліб і випічка' },
    { id: 'sausage', label: 'Ковбасні вироби' },
    { id: 'frozen',  label: 'Заморожені продукти' },
  ],

  // categories-main photo tiles (Figma: 109px, white name chips)
  photoCategories: [
    { lines: ['Сезонні овочі,', 'фрукти'], emoji: '🍓🥦', bg: 'linear-gradient(120deg,#DFF3CF,#FFE9A8)' },
    { lines: ['М’ясні делікатеси'],        emoji: '🥓🌭', bg: 'linear-gradient(120deg,#FFE0D6,#F6BFB0)' },
    { lines: ['Хлібобулочні вироби'],      emoji: '🥖🍞', bg: 'linear-gradient(120deg,#FFEDCD,#F2D8A4)' },
    { lines: ['Міцний', 'алкоголь'],       emoji: '🥃',   bg: 'linear-gradient(120deg,#E4DBF8,#C8BAEC)' },
  ],

  // product sections (Figma: «Цінотижики» + «Тільки онлайн»)
  sections: [
    {
      id: 'tsino',
      icon: 'tsino',
      title: 'Цінотижики',
      desc: 'Щотижневі ціни, які тішать',
      products: [
        { id: '1ed075dc-e649-6e76-967a-dd63763181f9', name: 'Перець червоний',
          img: 'https://images.silpo.ua/v2/products/500x500/webp/dd451510-588d-4bf1-afa7-c9b5b2eeeb4b.png',
          old: 189, price: 158.76, unit: 'кг', kg: true, step: 0.25,
          country: 'Україна', cat: 'Овочі', rating: 4.8, reviews: 124,
          desc: 'Свіжий солодкий перець — соковитий і хрусткий, ідеальний для салатів, гриля та соусів.' },
        { id: '1ed075db-ae9d-6aaa-91e3-dd63763181f9', name: 'Апельсин',
          img: 'https://images.silpo.ua/v2/products/500x500/webp/6ad7b56f-dc6d-4577-9005-ce3220d4bf15.png',
          old: 68.9, price: 57.9, unit: 'кг', kg: true, step: 0.5,
          country: 'Туреччина', cat: 'Фрукти', rating: 4.9, reviews: 312,
          desc: 'Соковиті солодкі апельсини з тонкою шкіркою — джерело вітаміну C.' },
        { id: '1ed075df-6db5-6c28-a9a7-dd63763181f9', name: 'Абрикос',
          img: 'https://images.silpo.ua/v2/products/500x500/webp/b3c89c9b-b626-4dcb-9a6c-1c77f8e28cd4.png',
          old: 169, price: 148.72, unit: 'кг', kg: true, step: 0.2,
          country: 'Україна', cat: 'Фрукти', rating: 4.7, reviews: 86,
          desc: 'Стиглі ароматні абрикоси — солодкі, з ніжною м’якоттю.' },
        { id: '1ed0768d-d70a-633c-ae56-5f148feebb3f', name: 'Майонез Kitchen Masters оригінальний 73%',
          img: 'https://images.silpo.ua/v2/products/500x500/webp/b50ec936-015e-41ef-bba8-b2c99e63e9cb.png',
          old: 189, price: 113, unit: 'шт', step: 1,
          country: 'Литва', cat: 'Соуси', rating: 4.6, reviews: 540, allergens: 'яйця, гірчиця',
          desc: 'Класичний майонез 73% жирності з насиченим вершковим смаком.' },
        { id: '1ed0764a-e1c1-6f02-a087-dd63763181f9', name: 'Шоколадний батончик Snickers Super+1 зі смаженим арахісом',
          img: 'https://images.silpo.ua/v2/products/500x500/webp/0f548af9-32d5-49c3-a4bb-e5bdabc13d36.png',
          old: 65.49, price: 44.99, unit: 'шт', step: 1,
          country: 'Польща', cat: 'Шоколад і батончики', rating: 4.9, reviews: 1203, allergens: 'арахіс, молоко',
          desc: 'Шоколадний батончик зі смаженим арахісом, карамеллю та нугою.' },
        { id: '1f0b12f3-69f6-6088-90d0-99da029d27df', name: 'Папір туалетний «Премія»® 2-шаровий',
          img: 'https://images.silpo.ua/v2/products/500x500/webp/c77be7a8-4982-42d2-bac6-866cbf710cbf.png',
          old: 254, price: 139, unit: 'шт', step: 1,
          country: 'Україна', cat: 'Гігієна', rating: 4.8, reviews: 209,
          desc: '2-шаровий туалетний папір — м’який і міцний, з делікатним тисненням.' },
      ],
    },
    {
      id: 'online',
      icon: 'allinone',
      title: 'Тільки онлайн',
      desc: 'Замовляйте з доставкою додому',
      products: [
        { id: '1ed075db-ae9b-6f2a-bf1a-dd63763181f9', name: 'Банан',
          img: 'https://images.silpo.ua/v2/products/500x500/webp/f5214071-6d83-4de8-b655-b977809cf880.png',
          price: 78.94, unit: 'кг', kg: true, step: 0.4,
          country: 'Еквадор', cat: 'Фрукти', rating: 4.9, reviews: 876,
          desc: 'Стиглі солодкі банани — джерело калію та швидкої енергії.' },
        { id: '1ed075e8-1eb7-62d0-a3d2-dd63763181f9', name: 'Огірок Екстра',
          img: 'https://images.silpo.ua/v2/products/500x500/webp/d8776b28-ffe7-4cb3-ad7d-de37532eea57.png',
          old: 99, price: 89.1, unit: 'кг', kg: true, step: 0.3,
          country: 'Україна', cat: 'Овочі', rating: 4.7, reviews: 143,
          desc: 'Свіжі хрусткі огірки — ідеальні для салатів та засолювання.' },
        { id: '1ed075e5-990d-6a6e-8bdc-dd63763181f9', name: 'Томат рожевий',
          img: 'https://images.silpo.ua/v2/products/500x500/webp/e3f4e45d-876d-47c4-bbcc-fd5a0645cd4b.png',
          price: 159, unit: 'кг', kg: true, step: 0.2,
          country: 'Україна', cat: 'Овочі', rating: 4.8, reviews: 167,
          desc: 'Соковиті рожеві помідори з насиченим солодким смаком.' },
        { id: '1edb0002-6fa9-6d74-b885-c9a9c5f7a57c', name: 'Авокадо Хасс стиглий',
          img: 'https://images.silpo.ua/v2/products/500x500/webp/0e65c623-30ea-459e-a130-ed3321e9aa2a.png',
          old: 49.99, price: 34.99, unit: 'шт', step: 1,
          country: 'Нідерланди', cat: 'Фрукти', rating: 4.6, reviews: 95,
          desc: 'Стиглий авокадо сорту Хасс — кремовий, поживний, готовий до споживання.' },
        { id: '1ed075da-6532-6146-a995-dd63763181f9', name: 'Молоко «Селянське» питне ультрапастеризоване 2,5%',
          img: 'https://images.silpo.ua/v2/products/500x500/webp/5f77614d-d5bb-4465-a1ea-9e86d33a3e24.png',
          old: 57.49, price: 34.99, unit: 'шт', step: 1,
          country: 'Україна', cat: 'Молоко', rating: 4.9, reviews: 2104, allergens: 'лактоза',
          desc: 'Ультрапастеризоване питне молоко 2,5% жирності — зручне для щоденного вжитку.' },
        { id: '1ef82a04-05c3-6010-b44a-eb3015a9c571', name: 'Огірок Рівненський короткоплідний',
          img: 'https://images.silpo.ua/v2/products/500x500/webp/3d62a707-495c-441d-be7e-1c87e8ba6dc8.png',
          price: 99, unit: 'кг', kg: true, step: 0.25,
          country: 'Україна', cat: 'Овочі', rating: 4.7, reviews: 118,
          desc: 'Короткоплідні рівненські огірки — свіжі, хрусткі, тепличні.' },
      ],
    },
    {
      // Алкоголь — adult goods (18+ block). Data via Silpo MCP silpo_get_product_details 2026-06-10.
      id: 'alco',
      icon: 'allinone',
      title: 'Алкоголь',
      desc: 'Лише для повнолітніх — 18+',
      products: [
        { id: '1ed1eebd-edb1-6e9c-8cfc-29a5436cd7be', name: "Віскі Jack Daniel's Gentleman Jack",
          img: 'https://images.silpo.ua/v2/products/500x500/webp/bfe8d45d-aaea-437e-af8d-9faa3b706e87.png',
          price: 1199, unit: 'шт', step: 1, adult: true, abv: 40, volume: '0,7 л', stock: 2,
          country: 'США', cat: 'Віскі', rating: 4.9, reviews: 64,
          desc: 'Теннессі-віскі подвійної вугільної фільтрації. Пряний смак, витримка 6–10 років, 40% спирту.' },
        { id: '1efa21a8-2946-6b2a-9611-83e521327e2d', name: 'Пиво Львівське 1715 світле з/б',
          img: 'https://images.silpo.ua/v2/products/500x500/webp/17824948-cede-4680-98bd-e3a38bd8f109.png',
          price: 174, unit: 'шт', step: 1, adult: true, abv: 4.5, volume: '0,5 л', stock: 15,
          country: 'Україна', cat: 'Пиво', rating: 4.7, reviews: 421,
          desc: 'Світле лагерне пиво за класичною рецептурою броварні «Львівське». 4,5% спирту.' },
      ],
    },
  ],
};
