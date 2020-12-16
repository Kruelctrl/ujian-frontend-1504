import React from 'react'
import Axios from 'axios'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

// import component
import Navigation from './components/navigation'

// import page
import Home from './pages/home'
import LoginPage from './pages/loginPage'
import RegisterPage from './pages/registerPage'
import DetailProduct from './pages/detailProduct'
import CartPage from './pages/cartPage'
import HistoryPage from './pages/history'
import HistoryAdmin from './pages/historyAdmin'
import NotFound from './pages/error404'

// import action login
import { login, getHistory } from './actions'

class App extends React.Component {

    // keep login
    componentDidMount() {
        Axios.get(`http://localhost:2000/users/${localStorage.id}`)
            .then((res) => {
                console.log(res.data);
                this.props.login(res.data)

                // keep get history
                Axios.get(`http://localhost:2000/history?username=${this.props.username}`)
                    .then((res) => {
                        console.log(res.data)
                        this.props.getHistory(res.data)
                    })
                    .catch((err) => console.log(err))
            })
            .catch((err) => console.log(err));
    }

    render() {
        console.log(this.props.role)
        if (this.props.role === 'admin') {
            return (
                <div>
                    <Navigation />
                    <Switch>
                        <Route path='/' component={Home} exact />
                        <Route path='/login' component={LoginPage} />
                        <Route path='/register' component={RegisterPage} />
                        <Route path='/detail' component={DetailProduct} />
                        <Route path='/history_admin' component={HistoryAdmin} />
                        <Route path='*' component={NotFound} />

                    </Switch>
                </div>
            )
        }
        return (
            <div>
                <Navigation />
                <Switch>
                    <Route path='/' component={Home} exact />
                    <Route path='/login' component={LoginPage} />
                    <Route path='/register' component={RegisterPage} />
                    <Route path='/detail' component={DetailProduct} />
                    <Route path='/cart' component={CartPage} />
                    <Route path='/history' component={HistoryPage} />
                    <Route path='*' component={NotFound} />
                </Switch>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        username: state.user.username,
    }
}

export default connect(mapStateToProps, { login, getHistory })(App)