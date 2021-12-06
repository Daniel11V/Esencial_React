import '@testing-library/jest-dom/extend-expect'

import { OutgoingList } from './OutgoingList'
import { Provider } from 'react-redux';
import React from "react";
import { defaultOutgoings } from "../../data/defaultData";
import { render } from '@testing-library/react';
import { store } from '../../store/store';

test('debe renderizarse correctamente', () => {
    const { products, services } = defaultOutgoings

    const component = render(
        <Provider store={store}>
            <OutgoingList outgoing={products} category="products" />
            <OutgoingList outgoing={services} category="services" />
        </Provider>
    )

    // Contendra este texto dentro una vez
    component.getAllByText('Por Mes')

    // expect()

})