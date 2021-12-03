export const defaultProducts = [
    { name: 'Remera', price: 2000, quantity: 0, period: 'Month', imgUrl: 'https://essential.vteximg.com.br/arquivos/ids/305737-1000-1000/266-0710_1.jpg?v=637112560190470000' },
    { name: 'Zapatillas', price: 2000, quantity: 0, period: 'Month', imgUrl: 'https://static0.tiendeo.com.ar/upload_articulos/257825/e3af9bc1-80c2-5be5-8e48-848652227b5f.jpg' },
    { name: 'Cepillo de Diente de Madera', price: 1000, quantity: 0, period: 'Month', imgUrl: 'https://http2.mlstatic.com/D_NQ_NP_665031-MLA45044042579_032021-O.webp' },
    { name: 'Pasta Dental', price: 1000, quantity: 0, period: 'Month', imgUrl: 'https://farmaciasdelpueblo.vteximg.com.br/arquivos/ids/173611/2119317_Colgate-Pasta-Dental-Colgate-Anticaries-con-Calcio-x-90-gr_img2.png?v=637580918756370000' }
]

export const defaultMoney = {
    lastMounthUpatedTotal: -1,
    banks: [{
        name: 'Efectivo',
        imgUrl: '',
        counts: [
            {
                coin: "ARS",
                lastMonthMount: 0
            }
        ]
    }],
    otherBanks: [
        {
            name: 'Compras Fisicas',
            imgUrl: '',
            coin: ["ARS"]
        },
        {
            name: 'Compras Virtuales',
            imgUrl: '',
            coin: ["ARS", "USD"]
        }
    ],
    operations: []
}

export const coins = [
    { name: "ARS", imgUrl: "" },
    { name: "USD", imgUrl: "" },
    { name: "EUR", imgUrl: "" },
    { name: "BTC", imgUrl: "" },
    { name: "ETH", imgUrl: "" }
]