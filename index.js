/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import Toast from 'react-native-toast-message';
import store from './src/services/store/store';


const AppProvider = () => {
    return (
        <Provider store={store}>
            <App />
            <Toast autoHide={true} visibilityTime={3000} />
        </Provider>
    )
}

AppRegistry.registerComponent(appName, () => AppProvider);
