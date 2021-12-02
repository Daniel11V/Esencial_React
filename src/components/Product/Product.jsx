import M from "materialize-css";
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { GrFormAdd, GrFormSubtract } from "react-icons/gr"
import { saveProductLocal } from "../../actions/productActions";
import './Product.scss'

export const Product = ({ prodId, prodInfo }) => {
    const dispatch = useDispatch()
    const { name, price, quantity, period, imgUrl } = prodInfo

    useEffect(() => {
        let elems = document.querySelectorAll('select');
        M.FormSelect.init(elems);
    }, [])

    const tooglePeriod = (e) => {
        e.preventDefault()
        let productUpdated = prodInfo
        productUpdated.period = e.target.value
        dispatch(saveProductLocal(prodId, productUpdated))
    }

    const lessQuantity = () => {
        let productUpdated = prodInfo

        if (productUpdated.quantity > 0) {
            productUpdated.quantity--
            dispatch(saveProductLocal(prodId, productUpdated))
        }
    }
    
    const addQuantity = () => {
        let productUpdated = prodInfo
        productUpdated.quantity++
        dispatch(saveProductLocal(prodId, productUpdated))
    }

    return (
        <div className="prod">
            <div className="prod__img" 
                style={{ backgroundImage: `url(${imgUrl})`}} 
                alt={"Imagen de " + name} />
            
            <div className="right">
                <span className="prod__name">{name}</span>
                
                <div className="right2">
                    <span className="prod__price">$ {price}</span>

                    <div className="right3">
                        <div className="prod__period input-field col s12">
                            <select value={period} onChange={tooglePeriod}>            
                                <option value="Month">Por Mes</option>
                                <option value="Year">Por Año</option>
                            </select>
                        </div>
                        <div className="prod__counter">
                            <GrFormSubtract className="prod__counter__btn" onClick={lessQuantity}/>
                            <span className="prod__counter__show">{quantity}</span>
                            <GrFormAdd className="prod__counter__btn" onClick={addQuantity}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="prod__delete waves-effect" onClick={()=>console.log('delete')}>
                <i className="material-icons">delete</i>
            </div>
        </div>
    )
}
