import { useEffect, useState } from "react"
import { NavBar } from './components/NavBar/NavBar';
import { Footer } from './components/Footer/Footer';
import { MyProducts } from './pages/MyProducts/MyProducts';
import { MyOperations } from './pages/MyOperations/MyOperations';
import { getProductsData } from "./helpers/getProductsData";
import { saveProductsData } from "./helpers/saveProductsData";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  const [user, setUser] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false)


  useEffect(() => {

    if (user.googleId && !products.length && !loading) {

      setLoading(true)

      getProductsData()
        .then(savedProds => {
          const userPosition = savedProds.findIndex(savedUser => (savedUser.id.localeCompare(user.googleId) === 0))

          if (userPosition !== -1) {

            setProducts(savedProds[userPosition].products)

          } else {

            const defaultProducts = [
              { name: 'Remera', price: 2000, quantity: 0, period: 'Month', imgUrl: 'https://essential.vteximg.com.br/arquivos/ids/305737-1000-1000/266-0710_1.jpg?v=637112560190470000' },
              { name: 'Zapatillas', price: 2000, quantity: 0, period: 'Month', imgUrl: 'https://static0.tiendeo.com.ar/upload_articulos/257825/e3af9bc1-80c2-5be5-8e48-848652227b5f.jpg' },
              { name: 'Cepillo de Diente de Madera', price: 1000, quantity: 0, period: 'Month', imgUrl: 'https://http2.mlstatic.com/D_NQ_NP_665031-MLA45044042579_032021-O.webp' },
              { name: 'Pasta Dental', price: 1000, quantity: 0, period: 'Month', imgUrl: 'https://farmaciasdelpueblo.vteximg.com.br/arquivos/ids/173611/2119317_Colgate-Pasta-Dental-Colgate-Anticaries-con-Calcio-x-90-gr_img2.png?v=637580918756370000' }
            ];

            setProducts(defaultProducts)

            saveProductsData([
              ...savedProds,
              { id: user.googleId, products: defaultProducts }
            ])
          }
        })
        .catch((err) => console.error(err))
        .finally(() => setLoading(false))
    } else if (!user.googleId && products.length) {
      // Cuando se cierra sesion
      setProducts([])
    }

  }, [user, products, loading])

  const newProduct = (newProd) => {
    setProducts((prods) => [...prods, newProd])

    getProductsData()
      .then(savedProds => {
        let savedProdsNew = savedProds
        const userPosition = savedProds.findIndex(savedUser => (savedUser.id.localeCompare(user.googleId) === 0))
        savedProdsNew[userPosition].products.push(newProd)
        saveProductsData(savedProdsNew)
      })
  }

  return (
    <BrowserRouter id="header-wrapper" className="App">
      <NavBar user={user} setUser={setUser} />

      <Routes>
        <Route path="/" element={<MyProducts products={products} newProduct={newProduct} loading={loading} />} />
        <Route path="/products/:categoryId" element={<MyProducts products={products} newProduct={newProduct} loading={loading} />} />
        <Route path="/operations" element={<MyOperations />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );

}

export default App;
