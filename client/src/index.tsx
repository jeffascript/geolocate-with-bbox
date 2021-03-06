import { ColorModeScript, ChakraProvider, theme } from '@chakra-ui/react';
import * as React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker';
import { GeoModeSelectProvider } from './context-api/GeoSelectCtx';
import store from './redux/store';

ReactDOM.render(
    <React.StrictMode>
        <ColorModeScript />
        <Provider store={store}>
            {' '}
            <GeoModeSelectProvider>
                <ChakraProvider theme={theme}>
                    <App />
                </ChakraProvider>
            </GeoModeSelectProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
