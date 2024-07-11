import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFirebase } from '../firebase';
import { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { signinUserWithEmailAndPassword } from '../firebase'


const Signin = () => {
    const firebase = useFirebase();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await signinUserWithEmailAndPassword(email, password);
        } catch (error) {
            console.error("Error during sign in:", error);
            alert("Error during sign in: " + error.message);
        }
    };
console.log(firebase.isLoggedIn)
    useEffect(() => {
        if (firebase.isLoggedIn) {
            navigate('/')
        }
    }, [firebase, navigate])

    return (
        <div className="container w-90">
            <Form className='mt-5 w-65' onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    signin
                </Button>
                <span className='m-5 font-bold'>OR</span>
                <Button variant='danger' onClick={(e) => firebase.signinWithGoogle()}>Signin with google</Button>
            </Form>

        </div>
    )
}

export default Signin
