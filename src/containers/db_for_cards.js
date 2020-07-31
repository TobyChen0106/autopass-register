var short = require('short-uuid');
const card_id_list = [...Array(20).keys()];
const card_list = card_id_list.map((i, index) => (
    `card${i}`
))

const bank_list = ['台新銀行', '渣打銀行', '彰化銀行', '花旗銀行', '第一銀行', '遠東商銀', '聯邦銀行', '永豐銀行', '元大銀行', '上海商銀', '台北富邦', '兆豐銀行',
    '新光銀行', '中國信託', '星展銀行', '華南銀行', '陽信銀行', '滙豐銀行', '日盛銀行', '國泰世華', '合作金庫', '臺灣企銀',
    '王道銀行', '台灣樂天', '凱基銀行', '玉山銀行', '臺灣銀行', '台中商銀', '土地銀行', '安泰銀行', '三信銀行', '高雄銀行', '華泰銀行',
    '美國運通']

export const banks = bank_list.map((i, index) => (
    {
        _id: `bank${index}`,
        bankName: bank_list[index],
        bankImage: '/images/pays/autopass-logo.png',
        bankCode: `${index}`,
        cards: card_list,
    }
));

export const cards = banks.map((bank, indexb) => (
    card_id_list.map((card, index) => (
        {
            cardName: `${bank.bankName}-card-${card}`,
            _id: `card${indexb * 20 + index}`,
            bankName: bank.bankName,
            bankID: bank._id,
            cardImage: '/images/cards/card-01.jpg',
            offers: []
        }
    ))
)).flat();

const pay_id_list = [...Array(13).keys()];

export const pays = pay_id_list.map((i, index) => (
    {
        _id: `pay${index}`,
        payName: "Line Pay",
        payImage: '/images/pays/autopass-logo.png',
        offers: [],
    }
));


const pay = [
    {
        payName: "Line Pay",
        payImage: '/images/pays/autopass-logo.png',
        offers: [],
    },
]