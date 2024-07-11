import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useFirebase } from '../firebase';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

const schema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
});

const Register = () => {
    const firebase = useFirebase();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await schema.validate({ email, password }, { abortEarly: false });
            await firebase.signupUserWithEmailAndPassword(email, password);
        } catch (error) {
            if (error.name === 'ValidationError') {
                const errorMessage = error.inner.map((e) => e.message).join('\n');
                setError(errorMessage);
            } else {
                console.error('Error during sign up:', error);
                alert('Error during sign up: ' + error.message);
            }
        }
    };

    useEffect(() => {
        if (firebase.isLoggedIn) {
            navigate('/');
        }
    }, [firebase, navigate]);

    return (
        <div className="container-fluid vh-100 d-flex flex-column align-items-center justify-content-center">
            <div className="col-md-6 col-lg-4">
                <h1 className="text-center mb-4">Sign Up</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            isInvalid={!!error}
                        />
                        <Form.Control.Feedback type="invalid">
                            {error}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            isInvalid={!!error}
                        />
                        <Form.Control.Feedback type="invalid">
                            {error}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100">
                        Sign Up
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default Register;
