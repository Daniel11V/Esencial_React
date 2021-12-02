import { useFormik } from "formik"
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

export const OperationCreator = () => {
    const dispatch = useDispatch()
    
    const submitOperation = (values) => {
        const { myBank, coin, otherName, type, mount, description } = values
        
        dispatch(newOperation({
            myBank, coin, otherName, type, description, mount,
            date: Date.now()
        }))
    }

    const formik = useFormik({
        initialValues: {
            myBank: '',
            coin: 'ARS',
            otherName: '',
            type: 'Pasivo',
            mount: '',
            description: ''
        },
        validationSchema: schema,
        validateOnChange: false, 
        validateOnBlur: false,
        onSubmit: (values) => submitOperation(values)
    })

    return (
        <form className="operCr row">
            <div className="row right">
                <div className="input-field col s3">
                    <input type="text" 
                        className="operCr__name"
                        placeholder="Nombre de tu cuenta"
                        name="myBank"
                        value={formik.values.myBank} 
                        onChange={formik.handleChange}  />
                        {formik.errors.myBank&&<p className="alert-form">{formik.errors.myBank}</p>}
                </div>
                <div className="input-field col s3">
                    <input type="text" 
                        className="operCr__name"
                        placeholder="Tipo de moneda"
                        name="coin"
                        value={formik.values.coin} 
                        onChange={formik.handleChange}  />
                        {formik.errors.coin&&<p className="alert-form">{formik.errors.coin}</p>}
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
                        className="operCr__name"
                        placeholder="Tipo de transacción"
                        name="type"
                        value={formik.values.type} 
                        onChange={formik.handleChange}  />
                </div>
                <div className="input-field col s3">
                    <input type="number" 
                        className="operCr__name"
                        placeholder="Monto de la transacción"
                        name="mount"
                        value={formik.values.mount} 
                        onChange={formik.handleChange}  />
                        {formik.errors.mount&&<p className="alert-form">{formik.errors.mount}</p>}
                </div>
                <div className="input-field col s3">
                    <input type="text" 
                        className="operCr__name"
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
