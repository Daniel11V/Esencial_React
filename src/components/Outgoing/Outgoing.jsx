import M from "materialize-css";
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { GrFormAdd, GrFormSubtract } from "react-icons/gr"
import { saveOutgoingLocal } from "../../actions/outgoingActions";
import './Outgoing.scss'

export const Outgoing = ({ outId, outInfo, category }) => {
    const dispatch = useDispatch()
    const { name, price, quantity, period, imgUrl } = outInfo

    useEffect(() => {
        let elems = document.querySelectorAll('select');
        M.FormSelect.init(elems);
    }, [])

    const tooglePeriod = (e) => {
        e.preventDefault()
        let outgoingUpdated = outInfo
        outgoingUpdated.period = e.target.value
        dispatch(saveOutgoingLocal(category, outId, outgoingUpdated))
    }

    const lessQuantity = () => {
        let outgoingUpdated = outInfo

        if (outgoingUpdated.quantity > 0) {
            outgoingUpdated.quantity--
            dispatch(saveOutgoingLocal(category, outId, outgoingUpdated))
        }
    }
    
    const addQuantity = () => {
        let outgoingUpdated = outInfo
        outgoingUpdated.quantity++
        dispatch(saveOutgoingLocal(category, outId, outgoingUpdated))
    }

    return (
        <div className="out">
            <div className="out__img" 
                style={{ backgroundImage: `url(${imgUrl})`}} 
                alt={"Imagen de " + name} />
            
            <div className="right">
                <span className="out__name">{name}</span>
                
                <div className="right2">
                    <span className="out__price">$ {price}</span>

                    <div className="right3">
                        <div className="out__period input-field col s12">
                            <select value={period} onChange={tooglePeriod}>            
                                <option value="Month">Por Mes</option>
                                <option value="Year">Por Año</option>
                            </select>
                        </div>
                        <div className="out__counter">
                            <GrFormSubtract className="out__counter__btn" onClick={lessQuantity}/>
                            <span className="out__counter__show">{quantity}</span>
                            <GrFormAdd className="out__counter__btn" onClick={addQuantity}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="out__delete waves-effect" onClick={()=>console.log('delete')}>
                <i className="material-icons">delete</i>
            </div>
        </div>
    )
}
