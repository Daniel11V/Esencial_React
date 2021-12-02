import React from "react";
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react';
import { ProductList } from './ProductList'
import { defaultProducts } from "../../data/defaultData";


test('debe renderizarse correctamente', () => {

    const component = render(<ProductList products={defaultProducts} />)

    // Contendra este texto dentro una vez
    // component.getByText('Por Mes')

    // expect()

})