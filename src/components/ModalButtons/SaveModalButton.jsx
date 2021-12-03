import { useEffect } from "react";
import M from "materialize-css"
import { ActionButton } from "../ActionButton/ActionButton";

export const SaveModalButton = ({ onClick }) => {
    useEffect(() => {
        let elems = document.querySelectorAll('.modal');
        M.Modal.init(elems);
    }, [])

    return (
        <div>
            <a href="#modal_saved" className="modal-trigger" onClick={onClick}>
                <ActionButton word="Guardar" icon="save" />
            </a>
            
            {/* Modal Saved */}
            <div id="modal_saved" className="modal">
                <div className="modal-content">
                    <h5>Guardado con exito </h5>
                </div>
                <div className="modal-footer">
                    <a href="#!" className="modal-close waves-effect waves-green btn-flat">Genial!</a>
                </div>
            </div>
        </div>
    )
}
