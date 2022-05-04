import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import ButtonWrapper from './ButtonComponent';
import store from '../redux/store';

test('Handles onClick', () => {
    const onClick = jest.fn();

    render(
        <Provider store={store}>
            <ButtonWrapper submit={onClick} />
        </Provider>,
    );

    const linkElement = screen.getByText(/Submit/i);

    fireEvent.click(linkElement);
    expect(onClick).toHaveBeenCalled();
    expect(onClick).toHaveBeenCalledTimes(1);
});
