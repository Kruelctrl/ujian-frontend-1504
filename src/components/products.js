import React from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom'

import {
    Card,
    Button
} from 'react-bootstrap'

class Products extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        Axios.get('http://localhost:2000/products')
            .then((res) => {
                // console.log(res.data)
                this.setState({ data: res.data })
            })
            .catch((err) => console.log(err))
    }

    render() {
        // console.log(this.state.data)
        return (
            <div style={{ padding: '50px' }}>
                <br>
                </br>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                    {this.state.data.map((item, index) => {
                        return (
                            <Card key={index} style={{ width: '50%', diplay:'flex', flexDirection:'column', alignContent:'space-between'}}>
                                <Card.Img variant="top" src={item.image} style={{}} />
                                <Card.Body>
                                <Card.Title style={{}}>{item.name}</Card.Title>
                                <Card.Text style={{}}>{item.description}</Card.Text>
                                <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                                        <Button variant="primary" as={Link} to={`/detail`}>
                                            Add to cart<i className="fas fa-shopping-cart" style={{ fontSize: '22px', color: 'white' }}></i>
                                            </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        )
                    })}
                </div>
            </div>
        )
    }
}

const styles = {
    cardBody: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    }
}

export default Products