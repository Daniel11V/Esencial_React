import { useFormik } from "formik"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import * as Yup from 'yup'
import { newOperation } from "../../actions/moneyActions"
import { ActionButton } from "../ActionButton/ActionButton"
import './OperationCreator.scss'

const schema = Yup.object().shape({
    myBank: Yup.string()
        .required('Campo requerido'),
        
    coin: Yup.string()
        .required('Campo requerido'),

    otherName: Yup.string()
        .required('Campo requerido'),

    mount: Yup.number()
        .required('Campo requerido')
        .min(1, 'El monto debe ser positivo')
})

export const OperationCreator = () => {
    const dispatch = useDispatch()
    const { banks, reasons } = useSelector(state => state.money)
    const [banksCurrentCoin, setBanksCurrentCoin] = useState([])

    const submitOperation = (values) => {
        const { myBank, coin, otherName, pasiveString, mount, description } = values
        const isPasive = (pasiveString.localeCompare("Pasive")===0)
        const otherIsMe = false
        
        dispatch(newOperation({
            myBank, coin, otherName, otherIsMe, isPasive, description, mount,
            date: Date.now()
        }))
    }

    const formik = useFormik({
        initialValues: {
            myBank: '',
            coin: 'ARS',
            otherName: '',
            pasiveString: 'Pasive',
            mount: '',
            description: ''
        },
        validationSchema: schema,
        validateOnChange: false, 
        validateOnBlur: false,
        onSubmit: (values) => submitOperation(values)
    })

    useEffect(() => {
        
        setBanksCurrentCoin(banks.filter(bank => (
            bank.counts.some(count => !count.coin.localeCompare(formik.values.coin))
        )))

    }, [banks, formik.values.coin])

    return (
        <form className="operCr">
            <h4>Realizar Operación</h4>
            <div className="input-field money-input">
                {/* <label for="myBank">Tipo de Moneda</label> */}
                <div className="symbol-money">$</div>
                <input type="number" 
                    className="operCr__mount"
                    placeholder="1000"
                    name="mount"
                    value={formik.values.mount} 
                    onChange={formik.handleChange}  />
                    {formik.errors.mount&&<p className="alert-form">{formik.errors.mount}</p>}
                
                <select 
                    name="coin"
                    value={formik.values.coin} 
                    onChange={formik.handleChange}>    
                    <option value="ARS">ARS</option>
                    <option value="USD">USD</option>

                    {/* {banksCurrentCoin.map(bank => (
                    ))}       */}

                </select>
            </div>
            <div className="input-field operCr__counts">
                {/* <span>Tu cuenta:</span> */}
                <select 
                    name="myBank"
                    className="operCr__myBank"
                    value={formik.values.myBank} 
                    onChange={formik.handleChange}>    
                    
                    <option value="" disabled>Tu cuenta</option>
                    {banksCurrentCoin.map((bank, i) => (
                        <option key={i} value={bank.name}>{bank.name}</option>
                    ))}      

                </select>
                {formik.errors.myBank && <p className="alert-form">{formik.errors.myBank}</p>}
                <Link to="/banks/new">
                    <i className="material-icons">add</i>
                </Link>
            </div>
            <div className="input-field operCr__pasive">
                {(formik.values.pasiveString === "Pasive")?
                    <i className="material-icons">arrow_downward</i>
                    :<i className="material-icons">arrow_upward</i>
                }                
                <select 
                    name="pasiveString"
                    value={formik.values.pasiveString} 
                    onChange={formik.handleChange}>    
                    <option value="Pasive">
                        Envia a
                    </option>
                    <option value="Active">
                        Recive de
                    </option>
                </select>
            </div>
            {/* {(formik.values.pasiveString === "Pasive")?
                <span>Motivo / Destinatario:</span>
                :<span>Motivo / Emisor:</span>
            }   */}
            <div className="input-field operCr__counts">
                <select
                    name="otherName"
                    value={formik.values.otherName} 
                    onChange={formik.handleChange}  >
                    <option value="" disabled>Motivo / Otra Cuenta</option>
                    {reasons.map((reason, i) => (
                        <option key={i} value={reason.name}>{reason.name}</option>
                    ))}    
                    {banksCurrentCoin.map((bank, i) => (
                        <option key={i} value={bank.name}>{bank.name}</option>
                    ))}    
                        <option value="Cuenta Ajena">Cuenta Ajena</option>
                </select>
                {formik.errors.otherName&&<p className="alert-form">{formik.errors.otherName}</p>}
                <Link to="/reasons/new">
                    <i className="material-icons">add</i>
                </Link>
            </div>
            <div className="input-field">
                <input type="text" 
                    placeholder="Descripción"
                    name="description"
                    value={formik.values.description} 
                    onChange={formik.handleChange}  />
            </div>
            <Link to="/" className="operCr__add">
                <ActionButton word="Guardar" icon="check" onClick={formik.handleSubmit} />
            </Link>
        </form>
    )
}
