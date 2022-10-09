import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import Loading from '../Loading/Loading';
import { useForm } from "react-hook-form";

const MyProfile = () => {
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
    const [myBook, setMyBook] = useState([]);
    const [show, setShow] = useState(false);
    const [user] = useAuthState(auth);
    const { email } = useParams();
    //const navigate = useNavigate();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { data: myBookList, isLoading, refetch } = useQuery('myBookList', () => fetch(`http://localhost:5000/bookList/${email}`, {
        method: 'GET',

    }).then(res => res.json())
        .then(data => {
            console.log(data, myBookList);
            setMyBook(data);
        }));

    console.log(myBook);
    if (isLoading) {
        return <Loading></Loading>;
    }

    const imgStorageKey = '0508f37a2cecd3a8f5c8c6064c476690';
    const onSubmit = async data => {
        const image = data.image[0];
        const formData = new FormData();
        formData.append("image", image);
        const url = `https://api.imgbb.com/1/upload?key=${imgStorageKey}`;
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(result => {
                if (result.success) {
                    const name = user?.displayName;
                    const email = user.email;
                    const img = result.data.url;
                    const newBook = {
                        name: name,
                        email: email,
                        book_title: data.book_title,
                        author: data.author,
                        img: img
                    }
                    fetch('http://localhost:5000/bookList', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',

                        },
                        body: JSON.stringify(newBook)
                    })
                        .then(res => res.json())
                        .then(inserted => {
                            if (inserted?.insertedId) {
                                refetch();

                                setShow(false);
                                reset();
                            }

                        })
                }
            })
    }
    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     const name = user?.displayName;
    //     const email = user.email;
    //     const book_title = event.target.book_title.value;
    //     const author = event.target.author.value;
    //     const image = event.target.image;
    //     const url = `https://api.imgbb.com/1/upload?key=${imgStorageKey}`
    //     const newBook = { email, book_title, author, name, image };

    //     console.log(newBook);


    return (
        <div className=' '>

            <h2>My Book List</h2>
            <Table striped bordered hover variant="dark" className='w-75 mx-auto'>
                <thead>
                    <tr>
                        <th></th>
                        <th>Book Title</th>
                        <th>Author</th>
                        <th>Book Owner Email</th>
                    </tr>
                </thead>
                <tbody>

                    {myBook.map((book, index) => {
                        return (

                            <tr>
                                <td>{index + 1}</td>
                                <td>{book.book_title}</td>
                                <td>{book.author}</td>
                                <td>{book.email}</td>
                            </tr>

                        )
                    })}





                </tbody>
            </Table>
            <Button variant="primary" className='w-25 mx-auto' onClick={handleShow}>
                Add Book
            </Button>

            <Modal show={show} onHide={handleClose} bg='dark'>
                <Modal.Header closeButton>
                    <Modal.Title>Add Book To Your Book List</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card border="primary" className='w-100 mx-auto'>

                        <Card.Body>
                            <Card.Title>Add a book</Card.Title>
                            <Card.Text>
                                <form className='w-50 p-3 mx-auto ' style={{ fontFamily: 'Mate SC' }} onSubmit={handleSubmit(onSubmit)}>
                                    <input className='mb-1' type="text" placeholder="Book Title"  {...register("book_title", { required: true, maxLength: 20 })}
                                        aria-invalid={errors.book_title ? "true" : "false"} />
                                    {errors.book_title?.type === 'required' && <p role="alert">Book Title is required</p>}
                                    <input className='mb-1' type="text" placeholder="Author" {...register("author", { required: true, maxLength: 20 })}
                                        aria-invalid={errors.author ? "true" : "false"} />
                                    {errors.author?.type === 'required' && <p role="alert">Author is required</p>}
                                    <input className='mb-1' type="file" {...register("image", { required: true })}
                                        aria-invalid={errors.image ? "true" : "false"} />
                                    {errors.image?.type === 'required' && <p role="alert">Image is required</p>}
                                    <input value="Add to profile" className="btn btn-primary w-full max-w-xs" type="submit" />
                                </form>
                                {/* <form className='w-50 p-3 mx-auto ' style={{ fontFamily: 'Mate SC' }} onSubmit={handleSubmit}>

                                        <input type="text" name="book_title" placeholder='Book Title' className="input input-bordered mb-1" required />
                                        <br />
                                        <input type="text" name="author" placeholder='Author' className="input input-bordered mb-1" required />
                                        <br />
                                        <input type="file" name="image" className="input input-bordered mb-1" required />
                                        <br />
                                        <input type="submit" value="Add to profile" className="btn btn-primary w-full max-w-xs" />
                                    </form> */}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
};

export default MyProfile;