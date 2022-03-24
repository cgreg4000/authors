import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Link, useHistory } from 'react-router-dom';

const EditAuthor = () => {

    const { _id } = useParams();
    const history = useHistory();
    let [fullName, setFullName] = useState("");
    let [formError, setFormError] = useState({});
    let [notFound, setNotFound] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/authors/${_id}`)
            .then(response => {
                console.log(response)
                setFullName(response.data.author.fullName)
            })
            .catch(err => {
                console.log("error getting author info")
                setNotFound(true)
                console.log(err)
            })
    }, [])

    const submitHandler = (e) => {
        e.preventDefault()
        let authorFormData = { fullName }
        console.log(authorFormData)
        axios.put(`http://localhost:8000/api/authors/update/${_id}`, authorFormData)
            .then(response => {
                console.log(response)
                if (response.data.error) {
                    setFormError(response.data.error.errors)
                }
                else {
                    history.push('/')
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        notFound === true ?
            <div>
                <h2>We're sorry, but we could not find the author you are looking for. Would you like to add this author to our database?</h2>
                <Link to="/new" >Add an Author</Link>
            </div> :

            <div>
                <h1>Edit an Author</h1>
                <Link to="/" >Home</Link>
                <form className='mt-3' onSubmit={submitHandler}>
                    <label className='mb-3'>Full name:</label>
                    <input className='form-control mb-3' type="text" onChange={(e) => setFullName(e.target.value)} value={fullName}></input>
                    <p className='text-danger'>{formError.fullName?.message}</p>
                    <Link to="/" className='btn btn-secondary m-2' >Cancel</Link>
                    <input className='btn btn-secondary m-2' type="submit" />
                </form>
            </div>
    )
}

export default EditAuthor;