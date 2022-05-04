import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import Input from './Input';
import store from '../../redux/store';

test('Handles Input of Data', () => {
    const { getByTestId, getAllByTestId } = render(
        <Provider store={store}>
            <Input />
        </Provider>,
    );

    const wrapper = screen.getByTestId('container');
    const parent = getByTestId('parent');
    const children = getAllByTestId('child');

    expect(wrapper).toContainElement(parent);

    expect(wrapper).toBeTruthy();
    expect(children[0]).toHaveTextContent('Max Latitude');
    expect(children[1]).toHaveTextContent('Min Longitude');
    expect(children[2]).toHaveTextContent('Max Longitude');
    expect(children[3]).toHaveTextContent('Min Latitude');
    expect(parent).toBeInTheDocument();
});
