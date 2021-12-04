export const defaultOutgoings = {
    products: [
        { name: 'Remera', price: 2000, quantity: 0, period: 'Month', imgUrl: 'https://essential.vteximg.com.br/arquivos/ids/305737-1000-1000/266-0710_1.jpg?v=637112560190470000' },
        { name: 'Zapatillas', price: 2000, quantity: 0, period: 'Month', imgUrl: 'https://static0.tiendeo.com.ar/upload_articulos/257825/e3af9bc1-80c2-5be5-8e48-848652227b5f.jpg' },
        { name: 'Cepillo de Diente de Madera', price: 1000, quantity: 0, period: 'Month', imgUrl: 'https://http2.mlstatic.com/D_NQ_NP_665031-MLA45044042579_032021-O.webp' },
        { name: 'Pasta Dental', price: 1000, quantity: 0, period: 'Month', imgUrl: 'https://farmaciasdelpueblo.vteximg.com.br/arquivos/ids/173611/2119317_Colgate-Pasta-Dental-Colgate-Anticaries-con-Calcio-x-90-gr_img2.png?v=637580918756370000' }
    ],
    services: [
        { name: 'Electricidad', price: 2000, quantity: 1, period: 'Month', imgUrl: 'https://i.pinimg.com/736x/9e/58/20/9e58204ad65a38c1fff02611324581a1.jpg' },
        { name: 'Wifi', price: 1000, quantity: 1, period: 'Month', imgUrl: 'https://media.istockphoto.com/vectors/wifi-logo-vector-id487562378?k=20&m=487562378&s=170667a&w=0&h=E4UTo_CpnQVVwvxesH8QHOwqpUBR-N9EkQBGtiCPzV0=' },
        { name: 'Gas', price: 1000, quantity: 1, period: 'Month', imgUrl: 'data:image/jpeg;base64,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' },
        { name: 'Seguridad', price: 1500, quantity: 1, period: 'Month', imgUrl: 'https://cdn.forbes.com.mx/2020/05/Videovigilancia-seguridad.jpg' }
    ]
}

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
    reasons: [
        {
            name: 'Gastos de Productos',
            isPasive: true,
            imgUrl: '',
        },
        {
            name: 'Gastos de Servicios',
            isPasive: true,
            imgUrl: '',
        },
        {
            name: 'Ganancias de Servicios',
            isPasive: false,
            imgUrl: '',
        },
        {
            name: 'Sueldo',
            isPasive: false,
            imgUrl: '',
        }
    ],
    operations: []
}

export const coinsInfo = {
    ARS: { imgUrl: "", price: 1 },
    USD: { imgUrl: "", price: 100 },
    EUR: { imgUrl: "", price: 110 },
    BTC: { imgUrl: "", price: 1000000 },
    ETH: { imgUrl: "", price: 1000000 }
}