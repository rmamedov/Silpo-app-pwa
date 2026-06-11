// Сільпо — product photo galleries (image arrays from Silpo MCP silpo_get_product_details,
// fetched 2026-06-10). Keyed by product id; ProductScreen falls back to [p.img] if absent.
const I = 'https://images.silpo.ua/v2/products/500x500/webp/';

export const gallery = {
  // --- Цінотижики ---
  '1ed075dc-e649-6e76-967a-dd63763181f9': [ // Перець червоний
    I + 'dd451510-588d-4bf1-afa7-c9b5b2eeeb4b.png',
    I + '8feb8790-a670-41e3-8480-b9bd295c34e9.jpg',
    I + 'f3686036-ef0e-49dd-a9f9-52e4b657d9e6.jpg',
    I + 'e25cb6f0-f136-4e13-b172-f0d250bc63d1.jpg',
    I + '9cf1587a-dc34-4829-807e-7353f91e7d4e.jpg',
    I + 'a2c0ff6f-b071-45f2-be9a-85e715a5d282.jpg',
    I + '5ccffb00-312f-40b0-9b61-2e2d13ec64a8.jpg',
    I + '467c61f5-7589-4e94-a508-415479da6ed2.png',
  ],
  '1ed075db-ae9d-6aaa-91e3-dd63763181f9': [ // Апельсин
    I + '6ad7b56f-dc6d-4577-9005-ce3220d4bf15.png',
    I + '0260ba1e-6416-44b9-b5a3-11395d8bd44a.png',
  ],
  '1ed075df-6db5-6c28-a9a7-dd63763181f9': [ // Абрикос
    I + 'b3c89c9b-b626-4dcb-9a6c-1c77f8e28cd4.png',
  ],
  '1ed0768d-d70a-633c-ae56-5f148feebb3f': [ // Майонез Kitchen Masters
    I + 'b50ec936-015e-41ef-bba8-b2c99e63e9cb.png',
    I + '02e0ca7f-d53d-42d5-9579-e050d494662a.jpg',
    I + 'a0f4dad1-d75f-419b-ac6e-f939a0bbfe81.jpg',
    I + '5f5492ab-b856-4789-a8cb-3b6bfa232902.jpg',
  ],
  '1ed0764a-e1c1-6f02-a087-dd63763181f9': [ // Snickers
    I + '0f548af9-32d5-49c3-a4bb-e5bdabc13d36.png',
    I + '0c0b9a28-60db-4d85-bf6e-244700b2e42d.png',
    I + '33b82cf9-d38a-4ce2-b2af-bb646f5065a0.png',
    I + '2da1baea-6e2e-433c-aa25-c2e1d3a49800.png',
    I + '833f1196-634f-4b4b-9ea7-7d69d54197c2.png',
  ],
  '1f0b12f3-69f6-6088-90d0-99da029d27df': [ // Папір туалетний «Премія»
    I + 'c77be7a8-4982-42d2-bac6-866cbf710cbf.png',
    I + '49d89834-0cbe-40f4-8ed3-9a91c5adaa36.png',
  ],

  // --- Тільки онлайн ---
  '1ed075db-ae9b-6f2a-bf1a-dd63763181f9': [ // Банан
    I + 'f5214071-6d83-4de8-b655-b977809cf880.png',
  ],
  '1ed075e8-1eb7-62d0-a3d2-dd63763181f9': [ // Огірок Екстра
    I + 'd8776b28-ffe7-4cb3-ad7d-de37532eea57.png',
    I + 'c36e2503-f1b4-405c-bdbe-74b89ff5f7f1.png',
    I + '6a0f1fff-e8db-44c0-8029-6e16e0e3c139.png',
    I + 'a4374613-49b1-47bf-8f0b-748ce68555a5.png',
    I + '4972381f-5527-4ab0-9aaa-90d34900f999.png',
  ],
  '1ed075e5-990d-6a6e-8bdc-dd63763181f9': [ // Томат рожевий
    I + 'e3f4e45d-876d-47c4-bbcc-fd5a0645cd4b.png',
    I + '858fac0c-392f-4358-96a6-41eeadd8dff5.png',
  ],
  '1edb0002-6fa9-6d74-b885-c9a9c5f7a57c': [ // Авокадо Хасс
    I + '0e65c623-30ea-459e-a130-ed3321e9aa2a.png',
    I + '6390b96d-acb0-4248-aa68-d3fe0a8e5beb.png',
    I + 'd91751a1-0f3d-4492-bb18-d80afcc57b81.png',
  ],
  '1ed075da-6532-6146-a995-dd63763181f9': [ // Молоко «Селянське»
    I + '5f77614d-d5bb-4465-a1ea-9e86d33a3e24.png',
    I + '293b2842-2d36-493e-bc6d-0165a287bc2c.jpg',
    I + 'b4e973fd-697c-4b89-9ae6-589ccc8fb782.jpg',
  ],
  '1ef82a04-05c3-6010-b44a-eb3015a9c571': [ // Огірок Рівненський
    I + '3d62a707-495c-441d-be7e-1c87e8ba6dc8.png',
    I + '4972381f-5527-4ab0-9aaa-90d34900f999.png',
    I + '018bccc3-c059-48cd-a5b0-5a3468d8f3a6.jpg',
    I + '26d20475-b8b9-4844-8773-d39ee24945fc.jpg',
    I + '225e994a-9b63-4ec0-ac76-f981d05ead10.jpg',
  ],

  // --- Алкоголь ---
  '1ed1eebd-edb1-6e9c-8cfc-29a5436cd7be': [ // Jack Daniel's Gentleman Jack
    I + 'bfe8d45d-aaea-437e-af8d-9faa3b706e87.png',
    I + 'f8e596d8-26ac-48cb-b69b-03d3f234764c.png',
    I + '95d6854c-9e39-476a-bd6c-d2e88a070eae.png',
  ],
  '1efa21a8-2946-6b2a-9611-83e521327e2d': [ // Пиво Львівське 1715
    I + '17824948-cede-4680-98bd-e3a38bd8f109.png',
  ],
  // Майонез «Торчин» «Європейський» 72» — фото + промо-відео.
  // Відео хоститься на сервері (дроплет), не входить у бандл застосунку;
  // вантажиться лише коли користувач свайпне на нього.
  '1ed0765d-8898-68b4-849d-dd63763181f9': [
    I + 'ff179db1-fa19-4b79-83c7-e0c9ec1bbe0e.png',
    'http://104.248.132.130/media/torchyn-evropeyskyi.mp4',
  ],
  // Майонез «Королівський смак» «Королівський» 67% — фото + промо-відео (з сервера).
  '1ed0761f-67ca-609e-9574-dd63763181f9': [
    I + 'ee71c47c-14e4-4a3d-95b0-6cc910ae2b55.png',
    'http://104.248.132.130/media/korolivskyi-smak-67.mp4',
  ],
};
