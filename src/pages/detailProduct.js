import React from 'react'
import Axios from 'axios'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import {
    Image,
    Button,
    Modal
} from 'react-bootstrap'

class DetailProduct extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {},
            stock: '',
            total: 1,
            toLogin: false,
            cartErr: false,
            toCart: false
        }
    }

    componentDidMount() {
        Axios.get(`http://localhost:2000/products${this.props.location.search}`)
            .then((res) => {
                console.log(res.data[0])
                this.setState({ data: res.data[0], image: res.data[0] })
            })
            .catch((err) => console.log(err))
    }

    handleAddToCart = () => {
        const { total, data } = this.state
        if (!this.props.id) return this.setState({ toLogin: true })

        // check user input
        if (total === 0) return this.setState({ cartErr: true })

        let cartData = {
            name: data.name,
            image: data.images,
            price: data.price,
            qty: total,
            total: total * data.price
        }
        // console.log(cartData)
        let tempCart = this.props.cart
        tempCart.push(cartData)
        console.log(tempCart)

        Axios.patch(`http://localhost:2000/users/${this.props.id}`, {cart: tempCart})
            .then((res) => {
                console.log(res.data)
                this.setState({ toCart: true})
            })
            .catch((err) => console.log(err))
    }

    render() {
        const { data,total, stock, toLogin, cartErr, toCart } = this.state

        if (toLogin) return <Redirect to='/login' />

        if(toCart) return <Redirect to='/cart' />

        console.log(this.props.id)
        return (
            <div style={{ marginTop: '70px', padding: '0 20px' }}>
                <h1>Product Detail</h1>
                <div style={{ display: 'flex', height: '65vh' }}>
                    <div style={styles.img1}>
                        <Image src={data.image} rounded style={{ height: '90%', width: '90%' }} />
                    </div>
                    <div style={styles.detail}>
                        <div>
                            <h2>{data.name}</h2>
                            <h6>Description: {data.description}</h6>
                            <h6>Price: IDR {data.price ? data.price.toLocaleString() : 0}</h6>
                            <div style={{ display: 'flex' }}>
                                <div style={{ marginRight: '50px' }}>
                                    <div>
                                        {(stock || []).map((item, index) => {
                                            return (
                                                <Button
                                                    key={index}
                                                    onClick={() => this.setState({stock: item.total })}>
                                                    {item.code}
                                                </Button>
                                            )
                                        })}
                                    </div>
                                    <h5>Stock Available = {data.qty}</h5>
                                <div style={{ width: '20%' }}>
                                    <h5>Quantity: </h5>
                                    <div style={{ display: 'flex', backgroundColor: 'white', justifyContent: 'space-between', borderRadius: '5px' }}>
                                        <Button
                                            disabled={total <= 0 ? true : false}
                                            variant="danger"
                                            onClick={() => this.setState({ total: total - 1 })}>
                                            -
                                        </Button>
                                        <h1>{total}</h1>
                                        <Button
                                            disabled={total >= data.qty ? true : false}
                                            variant="primary"
                                            onClick={() => this.setState({ total: total + 1 })}>
                                            +
                                        </Button>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                        <Button onClick={this.handleAddToCart}>Add to Cart</Button>
                    </div>
                </div>
                <Modal show={cartErr} onHide={() => this.setState({ cartErr: false })}>
                    <Modal.Header closeButton>
                        <Modal.Title>Error Quantity!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Please Insert Quantity</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.setState({ cartErr: false })}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

const styles = {
    img1: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexBasis: '40%',
        borderRadius: '15px',
    },
    detail: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        flexBasis: '60%',
        backgroundColor: 'grey',
        padding: '15px',
        borderRadius: '15px'
    },
    total: {
        display: 'flex',
        alignItems: 'center'
    },
    adjust: {
        display: 'flex',
        // alignItems: 'center'
    }
}

const mapStateToProps = (state) => {
    return {
        id: state.user.id,
        cart: state.user.cart
    }
}

export default connect(mapStateToProps)(DetailProduct)