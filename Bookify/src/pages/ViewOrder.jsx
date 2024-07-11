import React, { useEffect, useState } from 'react'
import { useFirebase } from '../firebase'
import BookCard from '../components/Card';
import OrderCard from '../components/OrderCard';

const ViewOrder = () => {
    const firebase = useFirebase();
    const [books, setBooks] = useState([])

    useEffect(() => {
        if (firebase.isLoggedIn)
            firebase.fetchMyBooks(firebase.user.uid)?.then((books) => setBooks(books.docs))
    }, [firebase])
    console.log(books)

    if (!firebase.isLoggedIn)
        <h1>Please Login First</h1>
    return (
        <>
            {/* <h1>Your Orders</h1> */}
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center',justifyContent: 'center', marginTop: '20px' }}>

                {
                    books.map((book) =>
                    (
                        <OrderCard Link={`/books/orders/${book.id}`} key={book.id} id={book.id} {...book.data()}></OrderCard>
                    ))
                }
            </div>
        </>
    )
}

export default ViewOrder
