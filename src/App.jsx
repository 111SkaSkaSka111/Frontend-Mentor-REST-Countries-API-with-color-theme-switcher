import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Pages/Home";

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" Component={<Home />} />
                <Route path="/detail" Component={<Detail />} />
            </Switch>
        </Router>
    );
}

export default App;
