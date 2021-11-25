import M from "materialize-css";
import { useState, useEffect } from "react"
import { GrFormAdd, GrFormSubtract } from "react-icons/gr"
import './Product.scss'

const prodDefault = {
    name: '',
    price: 0,
    quantity: 0,
    period: 'Month',
    imgUrl: ''
}

export const Product = ({ prodInfo = prodDefault }) => {
    const { name, price, quantity, period, imgUrl } = prodInfo
    const [counter, setCounter] = useState(quantity)
    const [selector, setSelector] = useState(period)

    useEffect(() => {
        let elems = document.querySelectorAll('select');
        M.FormSelect.init(elems);
    }, [])



    const handleLess = () => {
        counter > 0 && setCounter(counter - 1)
    }

    const handleMore = () => {
        setCounter(counter + 1)
    }

    const handleChange = (e) => {
        e.preventDefault()
        setSelector(e.target.value)
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
                        <div className="input-field col s12">
                            <select value={selector} onChange={handleChange}>            
                                <option value="Month">Por Mes</option>
                                <option value="Year">Por Año</option>
                            </select>
                        </div>
                        <div className="prod__counter">
                            <GrFormSubtract className="prod__counter__btn" onClick={handleLess}/>
                            <span className="prod__counter__show">{counter}</span>
                            <GrFormAdd className="prod__counter__btn" onClick={handleMore}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
