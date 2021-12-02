import { useEffect } from "react";
import M from "materialize-css"

export const SaveModalButton = ({ onClick }) => {
    useEffect(() => {
        let elems = document.querySelectorAll('.modal');
        M.Modal.init(elems);
    }, [])

    return (
        <div>
            <a href="#modal_saved" className="btn waves-effect waves-light blue darken-2 save-btn right modal-trigger" onClick={onClick}>
                <i className="material-icons right">save</i>Guardar
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
