import React from 'react';
import {Route, Switch, Redirect} from "react-router-dom";
import Header from "./components/Header/Header";
import Cocktails from "./containers/Cocktails/Cocktails";
import AddCocktail from "./containers/AddCocktail/AddCocktail";
import UserCocktails from "./containers/UserCocktails/UserCocktails";
import {useSelector} from "react-redux";

const ProtectedRoute = ({isAllowed, ...props}) => {
    return isAllowed ? <Route {...props} /> : <Redirect to="/"/>
};

function App() {
    const user = useSelector(state => state.users.user);
    return (
        <div className="App">
            <Header/>
            <Switch>
                <Route path="/" exact component={Cocktails}/>
                <ProtectedRoute
                    path="/addcocktail"
                    exact
                    component={AddCocktail}
                    isAllowed={user && user.user.role === "user"}
                />
                <ProtectedRoute
                    path="/cocktails/:id"
                    exact
                    component={UserCocktails}
                    isAllowed={user && user.user.role === "user"}
                />
                <Route render={() => <h1>404</h1>}/>
            </Switch>
        </div>
    );
}

export default App;
