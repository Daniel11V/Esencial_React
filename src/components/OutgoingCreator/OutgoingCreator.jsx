import M from "materialize-css";
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { GrFormAdd } from "react-icons/gr"
import './OutgoingCreator.scss'
import * as Yup from 'yup'
import { useFormik } from "formik";
import { newOutgoing } from "../../actions/outgoingActions";

const schema = Yup.object().shape({
    name: Yup.string()
        .required('Campo requerido')
        .min(3, 'El nombre es demasiado corto')
        .max(20, 'El nombre es demasiado largo'),
        
    price: Yup.number()
        .required('Campo requerido')
        .min(1, 'El monto debe ser positivo'),

    category: Yup.string()
})

export const OutgoingCreator = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        let elems = document.querySelectorAll('.modal');
        M.Modal.init(elems);
    }, [])
    
    const submitOutgoing = (values) => {
        const { name, price, imgUrl, category } = values

        // createOutgoing({ name, price, quantity: 0, period: "Month", imgUrl })
        dispatch(newOutgoing(category, { name, price, quantity: 0, period: "Month", imgUrl }))

        formik.resetForm()
    }

    const formik = useFormik({
        initialValues: {
            name: '',
            price: '',
            imgUrl: '',
            category: 'products'
        },
        validationSchema: schema,
        validateOnChange: false, 
        validateOnBlur: false,
        onSubmit: (values) => submitOutgoing(values)
    })

    return (
        <div className="outCr row">
            <div className="outCr__img" 
                style={{ backgroundImage: `url(${formik.values.imgUrl})`}} 
                alt={"Imagen de " + formik.values.name} >
                {/* Modal Trigger */}
                <a className="waves-effect modal-trigger" href="#getImgUrl">
                    <GrFormAdd />
                </a>
                {/* Modal Structure */}
                <div id="getImgUrl" className="modal">
                    <div className="modal-content">
                        <h4>Pegar URL de la imagen del producto</h4>
                        <p>En serio, busca una imagen en Google</p>
                        <input type="text" name="imgUrl" value={formik.values.imgUrl} onChange={formik.handleChange} placeholder="Pegar aqui..."/>
                    </div>
                    <div className="modal-footer">
                        <a href="#!" className="modal-close waves-effect waves-green btn-flat">Listo!</a>
                    </div>
                </div>
            </div>
            <div className="row right">
                <div className="input-field col s11">
                    <input type="text" 
                        name="name"
                        className="outCr__name"
                        value={formik.values.name} 
                        placeholder="Nombre del producto/servicio"
                        onChange={formik.handleChange}  />
                    {formik.errors.name&&<p className="alert-form">{formik.errors.name}</p>}
                </div>
                <div className="input-field col s7">
                    <select 
                        name="category"
                        value={formik.values.category} 
                        onChange={formik.handleChange}>    
                        <option value="products">Producto</option>
                        <option value="services">Servicio</option>
                    </select>
                </div>
                <div className="input-field col s4 outCr__price" >
                    <span>$</span>
                    <input type="number" 
                       placeholder="1000"
                       name="price"
                       value={formik.values.price} 
                       onChange={formik.handleChange} />
                    {formik.errors.price&&<p className="alert-form">{formik.errors.price}</p>}
                </div>
            </div>
            <div className="outCr__add waves-effect" onClick={formik.handleSubmit}>
                <i className="material-icons">check</i>
            </div>
        </div>
    )
}
