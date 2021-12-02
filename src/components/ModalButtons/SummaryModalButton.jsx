import { Fragment, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import M from "materialize-css"

export const SummaryModalButton = () => {
    const [prodsSummary, setProdsSummary] = useState([])
    const [totalSummary, setTotalSummary] = useState(0)
    const cartProds = useSelector(state => state.products.filter(prod => prod.quantity))

    useEffect(() => {
        let elems = document.querySelectorAll('.modal');
        M.Modal.init(elems);
    }, [])

    const summaryCalculations = () => {
        let totalTotal = 0
    
        const summaryProds = cartProds.map((prodInfo, i) => {
            const { name, price, quantity, period, imgUrl } = prodInfo
            
            let monthQuantity
            if (period.localeCompare('Month')) {

                monthQuantity = parseInt(quantity / 12)
                if (!monthQuantity) monthQuantity = 1

            } else {
                monthQuantity = quantity
            }

            let totalProdPrice = monthQuantity*price

            totalTotal += totalProdPrice

            return {
                name, price, quantity, period, imgUrl,
                quantityMonth: monthQuantity,
                totalPrice: totalProdPrice
            }

        })

        setTotalSummary(totalTotal)
        setProdsSummary(summaryProds)
    }

    return (
        <Fragment>
            {/* Modal Trigger */}
            <a href="#modal_summary" className="btn waves-effect waves-light blue darken-2 right modal-trigger" onClick={summaryCalculations}>
                <i className="material-icons right">library_books</i>Resumen
            </a>
            {/* Modal Summary */}
            <div id="modal_summary" className="modal">
                <div className="modal-content">
                    <h4>Lista de Compras del Mes</h4>
                    <div className="summary-table">
                        <span>Productos</span>
                        <span>Precio Unitario</span>
                        <span>Cantidad:</span>
                        <span>Total</span>
                        {prodsSummary.map((prod, i) => (
                            <Fragment key={i} >
                                <span>- {prod.name}</span>
                                <span>$ {prod.price}</span>
                                <span>x{prod.quantityMonth}:</span>
                                <span>$ {prod.totalPrice}</span>
                            </Fragment>
                        ))}
                        <span>TOTAL: </span>
                        <span>$ {totalSummary}</span>
                    </div>
                </div>
                <div className="modal-footer">
                    <a href="#!" className="modal-close waves-effect waves-green btn-flat">Listo!</a>
                </div>
            </div>
        </Fragment>
    )
}
