import { useFormik } from "formik"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import * as Yup from 'yup'
import { newOperation } from "../../actions/moneyActions"
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

export const OperationCreator = ({ banks }) => {
    const dispatch = useDispatch()
    const [banksCurrentCoin, setBanksCurrentCoin] = useState([])

    const submitOperation = (values) => {
        const { myBank, coin, otherName, pasiveString, mount, description } = values
        const isPasive = (pasiveString.localeCompare("Pasivo")===0)
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
            pasiveString: 'Pasivo',
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
        <form className="operCr row">
            <div className="row right">
                <div className="input-field col s3">
                    {/* <label for="myBank">Tipo de Moneda</label> */}
                    <span className="symbol-money">$</span>
                    <input type="number" 
                        className="operCr__mount"
                        placeholder="1000"
                        name="mount"
                        value={formik.values.mount} 
                        onChange={formik.handleChange}  />
                        {formik.errors.mount&&<p className="alert-form">{formik.errors.mount}</p>}
                    
                    <select 
                        name="coin"
                        style={{ display: 'block' }}
                        value={formik.values.coin} 
                        onChange={formik.handleChange}>    
                        <option value="ARS">ARS</option>
                        <option value="USD">USD</option>

                        {/* {banksCurrentCoin.map(bank => (
                        ))}       */}

                    </select>
                </div>
                <div className="input-field col s3">
                </div>
                <div className="input-field col s3">
                    {/* <label for="myBank">Tu Banco</label> */}
                    <span>Tu cuenta:</span>
                    <select 
                        name="myBank"
                        className="operCr__myBank"
                        style={{ display: 'block' }}
                        value={formik.values.myBank} 
                        onChange={formik.handleChange}>    

                        {banksCurrentCoin.map((bank, i) => (
                            <option key={i} value={bank.name}>{bank.name}</option>
                        ))}      

                    </select>
                    {formik.errors.myBank && <p className="alert-form">{formik.errors.myBank}</p>}
                </div>
                <div className="input-field col s3">
                    <select 
                        name="coin"
                        style={{ display: 'block' }}
                        value={formik.values.pasiveString} 
                        onChange={formik.handleChange}>    
                        <option value="Pasive">
                            {/* <i className="material-icons">arrow_downward</i> */}
                            Envia a
                        </option>
                        <option value="Active">
                            {/* <i className="material-icons">arrow_upward</i> */}
                            Recive de
                        </option>
                    </select>
                </div>
                <div className="input-field col s3">
                    <input type="text" 
                        className="operCr__name"
                        placeholder="Nombre del destinatario"
                        name="otherName"
                        value={formik.values.otherName} 
                        onChange={formik.handleChange}  />
                        {formik.errors.otherName&&<p className="alert-form">{formik.errors.otherName}</p>}
                </div>
                <div className="input-field col s3">
                    <input type="text" 
                        placeholder="Descripción"
                        name="description"
                        value={formik.values.description} 
                        onChange={formik.handleChange}  />
                </div>
            </div>
            <div className="operCr__add waves-effect" onClick={formik.handleSubmit}>
                <i className="material-icons">check</i>
            </div>
        </form>
    )
}
