import { Product } from "../Product/Product"
import "./ProductList.scss"

export const ProductList = ({ products }) => {
     
    return (
        <div className="prod_list">
            {products.map((prodInfo, i) => (
                <Product key={i} prodId={i} prodInfo={prodInfo} />
                // <div key={i}></div>
            ))}
        </div>
    )
}
