import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFirebase } from '../firebase';
import { Card, Button, Container, Row, Col, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Details = () => {
    const firebase = useFirebase();
    const params = useParams();
    const [data, setData] = useState(null)
    const [url, setURL] = useState(null);
    const [qty, setQty] = useState(1)



    useEffect(() => {
        firebase.getBookById(params.bookId).then((value) => setData(value.data()))
    }, [])

    useEffect(() => {
        if (data) {
            const imageURL = data.imageURL;
            firebase.getImageURL(imageURL).then((url) => setURL(url))
        }
    }, [data])

    // console.log(url)

    const placeOrder = async () => {
        const result = await firebase.placeOrder(params.bookId, qty);
    }

    if (data === null) {
        return (
            <h1>Loading...</h1>
        )
    }



    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={8}>
                    <Card className="p-4 shadow-lg" style={{ borderRadius: "10px", backgroundColor: "#f8f9fa" }}>
                        <Row>
                            <Col md={6} className="d-flex justify-content-center align-items-center">
                                <img
                                    src={url}
                                    alt={data.name}
                                    className="img-fluid rounded shadow"
                                    style={{ maxHeight: "450px", objectFit: "cover" }}
                                />
                            </Col>
                            <Col md={6}>
                                <Card.Body>
                                    <h1 className="mb-3">{data.name}</h1>
                                    <div>
                                        <h3>Details</h3>
                                        <p><strong>Price:</strong> {data.price} Rs</p>
                                        <p><strong>Uploaded by:</strong> {data.userEmail}</p>
                                        <div>
                                            <strong>Rating:</strong>
                                            <span className="ml-2">★★★★☆ 4.5/5</span>
                                        </div>
                                    </div>
                                    <Form.Group as={Row} controlId="formBasicPassword" className="mt-4 mb-1 align-items-center">
                                        <Form.Label column sm={4}>Quantity</Form.Label>
                                        <Col sm={8}>
                                            <Form.Control
                                                type="number"
                                                value={qty}
                                                onChange={(e) => setQty(e.target.value)}
                                            />
                                        </Col>
                                    </Form.Group>
                                    <Button onClick={placeOrder} variant="primary" className="btn-lg mt-3">Buy now</Button>
                                </Card.Body>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Details
