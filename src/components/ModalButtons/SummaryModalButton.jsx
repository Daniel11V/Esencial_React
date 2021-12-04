import { Fragment, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import M from "materialize-css"
import { ActionButton } from "../ActionButton/ActionButton"

export const SummaryModalButton = ({ category }) => {
    const [outsSummary, setOutsSummary] = useState([])
    const [totalSummary, setTotalSummary] = useState(0)
    const cartOuts = useSelector(state => (category.length)?
        state.outgoings[category].filter(out => out.quantity):
        [ ...state.outgoings.products.filter(out => out.quantity),
            ...state.outgoings.services.filter(out => out.quantity) ])

    useEffect(() => {
        let elems = document.querySelectorAll('.modal');
        M.Modal.init(elems);
    }, [])

    const summaryCalculations = () => {
        let totalTotal = 0
    
        const summaryOuts = cartOuts.map((outInfo, i) => {
            const { name, price, quantity, period, imgUrl } = outInfo
            
            let monthQuantity
            if (period.localeCompare('Month')) {

                monthQuantity = parseInt(quantity / 12)
                if (!monthQuantity) monthQuantity = 1

            } else {
                monthQuantity = quantity
            }

            let totalOutPrice = monthQuantity*price

            totalTotal += totalOutPrice

            return {
                name, price, quantity, period, imgUrl,
                quantityMonth: monthQuantity,
                totalPrice: totalOutPrice
            }

        })

        setTotalSummary(totalTotal)
        setOutsSummary(summaryOuts)
    }

    return (
        <Fragment>
            {/* Modal Trigger */}
            <a href="#modal_summary" className="modal-trigger" onClick={summaryCalculations}>
                <ActionButton word="Resumen" icon="library_books" />
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
                        {outsSummary.map((out, i) => (
                            <Fragment key={i} >
                                <span>- {out.name}</span>
                                <span>$ {out.price}</span>
                                <span>x{out.quantityMonth}:</span>
                                <span>$ {out.totalPrice}</span>
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
