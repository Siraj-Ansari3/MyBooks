import { useEffect, useState } from "react";
import { useFirebase } from "../firebase"
import BookCard from "../components/Card";
import { CardGroup } from "react-bootstrap";

const Home = () => {
    const firebase = useFirebase();
    const [books, setBooks] = useState([]);

    useEffect(() => {
        firebase.listAllBooks().then((books) => setBooks(books.docs))
    }, [])

    return (
        <div className="container mt-5">
            <CardGroup className="justify-content-center">
                {books.map((book) => (
                    <BookCard Link={`/book/view/${book.id}`} key={book.id} id={book.id} {...book.data()} />
                ))}
            </CardGroup>
        </div>
    )
}

export default Home
