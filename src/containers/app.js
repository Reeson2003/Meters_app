import {Provider} from 'react-redux';

<Provider store={store}>
    <Router hideNavBar={true}>
        <Route
            name="launch"
            component={Launch}
            initial={true}
            wrapRouter={true}
            title="Launch"/>
        <Route
            name="counter"
            component={CounterApp}
            title="Counter App"/>
    </Router>
</Provider>