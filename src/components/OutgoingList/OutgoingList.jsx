import "./OutgoingList.scss"

import { Fragment, useEffect, useState } from "react"

import M from "materialize-css"
import { Outgoing } from "../Outgoing/Outgoing"
import { deleteOutgoing } from "../../actions/outgoingActions"
import { useDispatch } from "react-redux"

export const OutgoingList = ({ outgoing = [], category = "products" }) => {
    const [deleteId, setDeleteId] = useState(null) 
    const dispatch = useDispatch()

    useEffect(() => {
        let elems = document.querySelectorAll('.modal')
        M.Modal.init(elems)
    }, [])
    
    return (
        <Fragment>
            <div className="prod_list">
                {outgoing.map((outInfo, i) => (
                    <Outgoing key={i} outId={i} outInfo={outInfo} category={category} setDeleteId={setDeleteId}/>
                ))}
            </div>
            {/* Modal Deleted */}
            <div id="modal_deleted" className="modal">
                <div className="modal-content">
                    <h5>Esta acción no se podra deshacer. Seguro de eliminar el producto? </h5>
                </div>
                <div className="modal-footer">
                    <a href="#!" className="modal-close waves-effect waves-green btn-flat" onClick={()=>dispatch(deleteOutgoing(category, deleteId))}>
                        Confirmar</a>
                    <a href="#!" className="modal-close waves-effect waves-green btn-flat">
                        Cancelar</a>
                </div>
            </div>
        </Fragment>
    )
}
