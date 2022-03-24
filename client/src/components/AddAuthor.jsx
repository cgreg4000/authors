import axios from 'axios';
import React, { useState } from 'react';
import { Link, useHistory } from "react-router-dom";

const AddAuthor = () => {

    let [fullName, setFullName] = useState("")
    let [formError, setFormError] = useState({})
    const history = useHistory()

    const submitHandler = (e) => {
        e.preventDefault()
        let authorFormData = { fullName }
        console.log(authorFormData)
        axios.post("http://localhost:8000/api/authors/new", authorFormData)
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
        <>
            <h1>Add a New Author</h1>
            <Link to="/" >Home</Link>
            <form className='mt-3' onSubmit={submitHandler}>
                <label className='mb-3'>Full name:</label>
                <input className='form-control' type="text" onChange={(e) => setFullName(e.target.value)}></input>
                <p className='text-danger'>{formError.fullName?.message}</p>
                <Link to="/" className='btn btn-secondary m-2' >Cancel</Link>
                <input className='btn btn-secondary m-2' type="submit" />
            </form>
        </>
    )
}

export default AddAuthor;