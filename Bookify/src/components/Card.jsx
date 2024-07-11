import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useFirebase } from '../firebase';
import { useNavigate } from 'react-router-dom';


const BookCard = (props) => {
    const firebase = useFirebase();
    const navigate = useNavigate();
    const [url, setUrl] = useState(null)

    useEffect(() => {
        firebase.getImageURL(props.imageURL).then((url) => setUrl(url))
    }, [])
    return (
        <Card style={{ width: '100%', margin: '25px', border: '1px solid rgb(185, 184, 185)', overflow: 'hidden' }}>
            <Card.Img
                variant="top"
                src={url}
                style={{ height: '200px', objectFit: 'contain' }}
            />
            <Card.Body>
                <Card.Title>{props.name}</Card.Title>
                <Card.Text>
                    {props.userEmail} is selling this book for {props.price} Rs.
                </Card.Text>
                <Button onClick={(e) => navigate(props.Link)} variant="primary">View</Button>
            </Card.Body>
        </Card>


    )
}

export default BookCard