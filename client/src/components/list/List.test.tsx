import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import store from '../../redux/store';
import ListItemComponent from './ListItemComponent';

test('Serves the nodes of Items', () => {
    const ItemTree = renderer.create(
        <Provider store={store}>
            <ListItemComponent />
        </Provider>,
    );

    expect(ItemTree).toMatchInlineSnapshot(`null`);
});
