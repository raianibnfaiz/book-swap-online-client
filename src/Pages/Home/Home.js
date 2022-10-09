import React from 'react';
import { useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { useQuery } from 'react-query';
import Loading from '../Loading/Loading';

const Home = () => {
    const [allBook, setAllBook] = useState([]);
    const { data: myBookList, isLoading, refetch } = useQuery('myBookList', () => fetch(`http://localhost:5000/bookList/`, {
        method: 'GET',

    }).then(res => res.json())
        .then(data => {
            console.log(data, myBookList);
            setAllBook(data);
        }));

    console.log(allBook);
    if (isLoading) {
        return <Loading></Loading>;
    }
    return (

        <Container className='w-75 mx-auto'>
            <Row>
                {allBook.map(book => {
                    return (<Col>
                        <Card style={{ width: '18rem' }} className='p-4 m-1'>
                            <Card.Img variant="top" src={book.img} />
                            <Card.Body>
                                <Card.Title>{book.book_title}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{book.author}</Card.Subtitle>
                                <Button variant="primary">Go somewhere</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    )
                })}
            </Row>
        </Container>
    );
};

export default Home;