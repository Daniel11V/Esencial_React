import M from "materialize-css";
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { GrFormAdd } from "react-icons/gr"
import './ProductCreator.scss'
import * as Yup from 'yup'
import { useFormik } from "formik";
import { newProduct } from "../../actions/productActions";

const schema = Yup.object().shape({
    name: Yup.string()
        .required('Campo requerido')
        .min(3, 'El nombre es demasiado corto')
        .max(20, 'El nombre es demasiado largo'),
        
    price: Yup.number()
        .required('Campo requerido')
        .min(1, 'El monto debe ser positivo')

})

export const ProductCreator = ({ createProduct }) => {
    const dispatch = useDispatch()

    useEffect(() => {
        let elems = document.querySelectorAll('.modal');
        M.Modal.init(elems);
    }, [])
    
    const submitProduct = (values) => {
        const { name, price, imgUrl } = values

        // createProduct({ name, price, quantity: 0, period: "Month", imgUrl })
        dispatch(newProduct({ name, price, quantity: 0, period: "Month", imgUrl }))

        formik.resetForm()
    }

    const formik = useFormik({
        initialValues: {
            name: '',
            price: '',
            imgUrl: '',
        },
        validationSchema: schema,
        validateOnChange: false, 
        validateOnBlur: false,
        onSubmit: (values) => submitProduct(values)
    })

    return (
        <div className="prodCr row">
            <div className="prodCr__img" 
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
                <div className="input-field col s9">
                    <input type="text" 
                        name="name"
                        className="prodCr__name"
                        value={formik.values.name} 
                        placeholder="Nombre del producto"
                        onChange={formik.handleChange}  />
                    {formik.errors.name&&<p className="alert-form">{formik.errors.name}</p>}
                </div>
                <div className="input-field col s2">
                    <span>$</span>
                    <input type="number" 
                       className="prodCr__price"
                       placeholder="1000"
                       name="price"
                       value={formik.values.price} 
                       onChange={formik.handleChange} />
                    {formik.errors.price&&<p className="alert-form">{formik.errors.price}</p>}
                </div>
            </div>
            <div className="prodCr__add waves-effect" onClick={formik.handleSubmit}>
                <i className="material-icons">check</i>
            </div>
        </div>
    )
}
