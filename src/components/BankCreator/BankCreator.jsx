import { useFormik } from "formik"
import { useDispatch } from "react-redux"
import { newBank } from "../../actions/moneyActions"
import './BankCreator.scss'
import * as Yup from 'yup'

const schema = Yup.object().shape({
    name: Yup.string()
        .required('Campo requerido')
        .min(3, 'El nombre es demasiado corto')
        .max(15, 'El nombre es demasiado largo'),
        
    coin: Yup.string()
        .required('Campo requerido'),

    startMount: Yup.number()
        .min(0, 'El monto debe ser positivo')
})

export const BankCreator = () => {
    const dispatch = useDispatch()
    
    const submitBank = (values) => {
        const { name, coin, imgUrl, startMount } = values
        
        dispatch(newBank({ 
            name, imgUrl, 
            counts: [{ 
                coin, 
                startMount: (startMount > 0)?startMount:0,  
                lastMonthMount: 0
            }] 
        }))

        formik.resetForm()
    }

    const formik = useFormik({
        initialValues: {
            name: '',
            coin: '',
            imgUrl: '',
            startMount: ''
        },
        validationSchema: schema,
        validateOnChange: false, 
        validateOnBlur: false,
        onSubmit: (values) => submitBank(values)
    })

    return (
        <form className="bankCr row">

            <div className="row right">
                <div className="input-field col s3">
                    <input type="text" 
                        name="name"
                        className="bankCr__input-text"
                        placeholder="Nombre del banco/cuenta"
                        value={formik.values.name}
                        onChange={formik.handleChange}  />
                    {formik.errors.name&&<p className="alert-form">{formik.errors.name}</p>}
                </div>
                <div className="input-field col s4">
                    <input type="text" 
                        name="imgUrl"
                        className="bankCr__input-text"
                        placeholder="Link de imagen"
                        value={formik.values.imgUrl} 
                        onChange={formik.handleChange} />
                </div>
                <div className="input-field col s1">
                    <input type="text" 
                        name="coin"
                        className="bankCr__input-text"
                        placeholder="Tipo de moneda"
                        value={formik.values.coin} 
                        onChange={formik.handleChange} />
                    {formik.errors.coin&&<p className="alert-form">{formik.errors.coin}</p>}
                </div>
                <div className="input-field col s2">
                    <input type="number" 
                        name="startMount"
                        className="bankCr__input-number"
                        placeholder="Monto inicial"
                        value={formik.values.startMount} 
                        onChange={formik.handleChange} />
                    {formik.errors.startMount&&<p className="alert-form">{formik.errors.startMount}</p>}
                </div>
            </div>
            <div className="bankCr__add waves-effect" onClick={formik.handleSubmit}>
                <i className="material-icons">check</i>
            </div>
        </form>
    )
}
