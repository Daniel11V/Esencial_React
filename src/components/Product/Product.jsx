import M from "materialize-css";
import { useEffect, useContext } from "react"
import { GrFormAdd, GrFormSubtract } from "react-icons/gr"
import { ProductContext } from "../../context/ProductContext";
import './Product.scss'

export const Product = ({ prodId, prodInfo }) => {
    const { lessQuantity, addQuantity, tooglePeriod } = useContext(ProductContext)
    const { name, price, quantity, period, imgUrl } = prodInfo

    useEffect(() => {
        let elems = document.querySelectorAll('select');
        M.FormSelect.init(elems);
    }, [])

    const handleChangePeriod = (e) => {
        e.preventDefault()
        tooglePeriod(prodId, e.target.value)
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
                            <select value={period} onChange={handleChangePeriod}>            
                                <option value="Month">Por Mes</option>
                                <option value="Year">Por Año</option>
                            </select>
                        </div>
                        <div className="prod__counter">
                            <GrFormSubtract className="prod__counter__btn" onClick={()=>lessQuantity(prodId)}/>
                            <span className="prod__counter__show">{quantity}</span>
                            <GrFormAdd className="prod__counter__btn" onClick={()=>addQuantity(prodId)}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
