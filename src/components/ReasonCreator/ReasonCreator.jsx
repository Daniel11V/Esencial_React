import { useFormik } from "formik"
import { useDispatch } from "react-redux"
import { newBank } from "../../actions/moneyActions"
import './ReasonCreator.scss'
import * as Yup from 'yup'
import { ActionButton } from "../ActionButton/ActionButton"

const schema = Yup.object().shape({
    name: Yup.string()
        .required('Campo requerido')
        .min(3, 'El nombre es demasiado corto')
        .max(15, 'El nombre es demasiado largo'),
        
    coin: Yup.string()
        .required('Campo requerido'),

    lastMonthMount: Yup.number()
        .min(0, 'El monto debe ser positivo')
})

export const ReasonCreator = () => {
    const dispatch = useDispatch()
    
    const submitBank = (values) => {
        const { name, coin, imgUrl, lastMonthMount } = values
        
        dispatch(newBank({ 
            name, imgUrl, 
            counts: [{ 
                coin, 
                lastMonthMount: (lastMonthMount > 0)?lastMonthMount:0,  
            }] 
        }))

        formik.resetForm()
    }

    const formik = useFormik({
        initialValues: {
            name: '',
            coin: '',
            imgUrl: '',
            lastMonthMount: ''
        },
        validationSchema: schema,
        validateOnChange: false, 
        validateOnBlur: false,
        onSubmit: (values) => submitBank(values)
    })

    return (
        <form className="otherBankCr row">
            <h4>Agregar Motivo</h4>
            <div className="input-field">
                <input type="text" 
                    name="name"
                    className="otherBankCr__input-text"
                    placeholder="Nombre del banco/cuenta*"
                    value={formik.values.name}
                    onChange={formik.handleChange}  />
                {formik.errors.name&&<p className="alert-form">{formik.errors.name}</p>}
            </div>
            <div className="input-field">
                <input type="text" 
                    name="imgUrl"
                    className="otherBankCr__input-text"
                    placeholder="Link de imagen"
                    value={formik.values.imgUrl} 
                    onChange={formik.handleChange} />
            </div>
            <div className="input-field">
                <input type="text" 
                    name="coin"
                    className="otherBankCr__input-text"
                    placeholder="Tipo de moneda*"
                    value={formik.values.coin} 
                    onChange={formik.handleChange} />
                {formik.errors.coin&&<p className="alert-form">{formik.errors.coin}</p>}
            </div>
            <div className="input-field">
                <input type="number" 
                    name="lastMonthMount"
                    className="otherBankCr__input-number"
                    placeholder="Monto inicial"
                    value={formik.values.lastMonthMount} 
                    onChange={formik.handleChange} />
                {formik.errors.lastMonthMount&&<p className="alert-form">{formik.errors.lastMonthMount}</p>}
            </div>
            <ActionButton className="otherBankCr__add" word="Guardar" icon="check" onClick={formik.handleSubmit} />
        </form>
    )
}
