const getRandom = (min = 1, max = 10) => {

    return Math.floor(Math.random() * (max - min + 1)) + min;

}

const arrayCreaturesEnemy = [
    {
        "image": "https://placehold.co/200x250?text=Шалопайка",
        "title": "Шалопайка - враг",
        "script": "",
        "id": 1,
        "content": "Предсмертный хрип: после смерти появляется шалопай 1 1, он сразу же атакует",
        "damage": getRandom(),
        "health": getRandom(5, 20)
    },
    {
        "script": "",
        "title": "Пиратка 3 1 - враг",
        "image": "https://placehold.co/200x250?text=Пиратка+3+1",
        "id": 2,
        "health": getRandom(5, 20),
        "damage": getRandom(),
        "content": "В следующем ходу вы получаете 1 золотой"
    },
    {
        "damage": getRandom(),
        "content": "Ваши боевые кличи срабатывают дважды",
        "health": getRandom(5, 20),
        "id": 3,
        "title": "Бранн Бранзоборoд - враг",
        "script": "",
        "image": "https://placehold.co/200x250?text=Бранн+Бранзоборoд"
    },
    {
        "damage": getRandom(),
        "health": getRandom(5, 20),
        "id": 4,
        "title": "Тит Ривендерр - враг",
        "script": "",
        "image": "https://placehold.co/200x250?text=Тит+Ривендерр",
        "content": "Ваши предсмертные хрипы срабатывают дважды"
    },
    {
        "damage": getRandom(),
        "health": getRandom(5, 20),
        "image": "https://placehold.co/200x250?text=Драккари",
        "id": 5,
        "content": "Ваши действия конца хода срабатывают дважды",
        "title": "Драккари - враг",
        "script": ""
    },
    {
        "title": "Битбоксер - враг",
        "image": "https://placehold.co/200x250?text=Битбоксер",
        "content": "Когда вы примагничиваете магнетизм к другому механизму, примагничивает так же его к себе",
        "script": "",
        "id": 6,
        "damage": getRandom(),
        "health": getRandom(5, 20)
    },
    {
        "image": "https://placehold.co/200x250?text=Баюботик",
        "title": "Баюботик - враг",
        "content": "В конце хода это существо получает +1 к здоровью",
        "script": "",
        "id": 7,
        "damage": getRandom(),
        "health": getRandom(5, 20)
    }
]

export default arrayCreaturesEnemy;