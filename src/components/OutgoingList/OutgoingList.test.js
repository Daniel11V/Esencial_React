import React from "react";
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react';
import { OutgoingList } from './OutgoingList'
import { defaultOutgoings } from "../../data/defaultData";


test('debe renderizarse correctamente', () => {

    const component = render(<OutgoingList products={defaultOutgoings} />)

    // Contendra este texto dentro una vez
    // component.getByText('Por Mes')

    // expect()

})