import React from 'react'
import Axios from 'axios'

import {
    Accordion,
    Table,
    Image,
    Card
} from 'react-bootstrap'

class HistoryAdmin extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        Axios.get(`http://localhost:2000/history`)
            .then((res) => {
                console.log(res.data)
                this.setState({data: res.data})
            })
            .catch((err) => console.log(err))
    }

    renderTBody = () => {
        return (
            <Accordion>
                {this.state.data.map((item, index) => {
                    return (
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey={index + 1}>
                                Date: {item.date}, Total Purchasing: IDR {item.total.toLocaleString()}
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey={index + 1}>
                                <Table striped bordered hover variant="dark">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Name</th>
                                            <th>Image</th>
                                            <th>Price</th>
                                            <th>Size</th>
                                            <th>Quantity</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {item.product.map((item2, index2) => {
                                            return (
                                                <tr>
                                                    <td>{index2 + 1}</td>
                                                    <td>{item2.name}</td>
                                                    <td>
                                                        <Image src={item2.image} style={{ height: 100, width: 100 }} rounded />
                                                    </td>
                                                    <td>IDR {item2.price.toLocaleString()}</td>
                                                    <td>{item2.size}</td>
                                                    <td>{item2.qty}</td>
                                                    <td>IDR {item2.total.toLocaleString()}</td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </Table>
                            </Accordion.Collapse>
                        </Card>
                    )
                })}
            </Accordion>
        )
    }

    render() {        
        return (
            <div style={{ marginTop: '70px', padding: '0 20px' }}>
                <h1>History Transaction Admin</h1>
                {this.renderTBody()}
            </div>
        )
    }
}

export default HistoryAdmin