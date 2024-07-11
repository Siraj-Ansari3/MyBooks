import { useState } from "react";
import { Button } from "react-bootstrap"
import { Form } from "react-bootstrap"
import { useFirebase } from "../firebase";

const ListingPage = () => {
    const firebase = useFirebase();

    const [name, setName] = useState("");
    const [isbn, setIsbn] = useState("");
    const [price, setPrice] = useState("");
    const [coverPic, setCoverPic] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        await firebase.handleCreateNewListing(name, price, isbn, coverPic);

    }

    return (
        <div className="container w-90">
            <Form className='mt-5 w-65' onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Book Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter book name here..." value={name} onChange={(e) => setName(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>ISBN Number</Form.Label>
                    <Form.Control type="text" placeholder="Enter ISBN number here..." value={isbn} onChange={(e) => setIsbn(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="number" placeholder="Enter Price here..." value={price} onChange={(e) => setPrice(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Cover Picture</Form.Label>
                    <Form.Control 
                    type="file" 
                    onChange={(e) => setCoverPic(e.target.files[0])} 
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Create
                </Button>
            </Form>

        </div>
    )
}

export default ListingPage
