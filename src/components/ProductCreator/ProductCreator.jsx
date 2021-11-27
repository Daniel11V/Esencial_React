import M from "materialize-css";
import { useState, useEffect } from "react"
import { GrFormAdd } from "react-icons/gr"
import './ProductCreator.scss'

export const ProductCreator = ({ createProduct }) => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [imgUrl, setImgUrl] = useState('')

    useEffect(() => {
        let elems = document.querySelectorAll('.modal');
        M.Modal.init(elems);
    }, [])
    
    const submitProduct = () => {
        if (name && price) {

            createProduct({ name, price, quantity: 0, period: "Month", imgUrl })

            setName('')
            setPrice('')
            setImgUrl('')
        }
    }

    return (
        <div className="prodCr row">
            <div className="prodCr__img" 
                style={{ backgroundImage: `url(${imgUrl})`}} 
                alt={"Imagen de " + name} >
                {/* Modal Trigger */}
                <a className="waves-effect modal-trigger" href="#getImgUrl">
                    <GrFormAdd />
                </a>
                {/* Modal Structure */}
                <div id="getImgUrl" className="modal">
                    <div className="modal-content">
                        <h4>Pegar URL de la imagen del producto</h4>
                        <p>En serio, busca una imagen en Google</p>
                        <input type="text" value={imgUrl} onChange={e => setImgUrl(e.target.value)} placeholder="Pegar aqui..."/>
                    </div>
                    <div className="modal-footer">
                        <a href="#!" className="modal-close waves-effect waves-green btn-flat">Listo!</a>
                    </div>
                </div>
            </div>
            <div className="row right">
                <div className="input-field col s9">
                    <input type="text" 
                        className="prodCr__name"
                        placeholder="Nombre del producto"
                        value={name} 
                        onChange={e => setName(e.target.value)}  />
                </div>
                <div className="input-field col s2">
                    <span>$</span>
                    <input type="number" 
                       className="prodCr__price"
                       placeholder="1000"
                       value={price} 
                       onChange={e => setPrice(e.target.value)} />
                </div>
            </div>
            <div className="prodCr__add waves-effect" onClick={submitProduct}>
                <i className="material-icons">check</i>
            </div>
        </div>
    )

    // return (
    //    <div className="prodCr col s12">
    //         <div className="prodCr__img" 
    //             style={{ backgroundImage: `url(${imgUrl})`}} 
    //             alt={"Imagen de " + name} >
    //             {/* Modal Trigger */}
    //             <a className="waves-effect modal-trigger" href="#getImgUrl">
    //                 <GrFormAdd />
    //             </a>
    //         </div>
            
            
    //         <div className="row">
    //             <div className="input-field col s5">
    //                 <input 
    //                     type="text" 
    //                     id="nameCr"
    //                     className="prodCr__name col s3"
    //                     value={name} 
    //                     onChange={e => setName(e.target.value)} />
    //                 <label for="nameCr">Nombre del producto</label>
    //             </div>
                
    //             <div className="input-field col s3">
    //                 $   
    //                 <input 
    //                     type="number" 
    //                     className="prodCr__price"
    //                     value={price} 
    //                     onChange={e => setPrice(e.target.value)} />
    //                 <label for="priceCr">Precio</label>
    //             </div>
    //         </div>

    //         {/* <div className="right row">
    //             <div className="input-field col s4">
    //                 <input 
    //                     type="text" 
    //                     id="nameCr"
    //                     className="prodCr__name col s3"
    //                     value={name} 
    //                     onChange={e => setName(e.target.value)} />
    //                 <label for="nameCr">Nombre del producto</label>
    //             </div>
                
    //             <div className="right2">
    //                 <div className="input-field col s3">
    //                     $   
    //                     <input 
    //                         type="number" 
    //                         className="prodCr__price"
    //                         value={price} 
    //                         onChange={e => setPrice(e.target.value)} />
    //                     <label for="priceCr">Precio</label>
    //                 </div>

    //                 <div className="right3">
    //                     <div className="input-field col s3">
    //                         <select>            
    //                             <option value="Month">Por Mes</option>
    //                             <option value="Year">Por Año</option>
    //                         </select>
    //                     </div>
    //                     <div className="prodCr__counter">
    //                         <GrFormSubtract className="prodCr__counter__btn" />
    //                         <span className="prodCr__counter__show">{}</span>
    //                         <GrFormAdd className="prodCr__counter__btn" />
    //                     </div>
    //                 </div>
    //             </div>
    //         </div> */}
    //     </div>
    // )
}
