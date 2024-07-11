import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useFirebase } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const OrderCard = (props) => {
    const firebase = useFirebase();
    const navigate = useNavigate();
    const [url, setUrl] = useState(null)

    useEffect(() => {
        firebase.getImageURL(props.imageURL).then((url) => setUrl(url))
    }, [])

    return (
        <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={url} />
            <Card.Body>
                <Card.Title>{props.name}</Card.Title>
                <Button onClick={(e) => navigate(props.Link)} variant="primary">Order Details</Button>
            </Card.Body>
        </Card>
    )
}

export default OrderCard
