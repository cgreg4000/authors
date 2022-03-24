import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

const AllAuthors = () => {

    let [authorList, setAuthorList] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:8000/api/authors`)
            .then(response => {
                console.log(response.data.authors)
                setAuthorList(response.data.authors.sort((a, b) => {
                    if (a.fullName.toUpperCase() < b.fullName.toUpperCase()) {
                        return -1
                    }
                    if (a.fullName.toUpperCase() > b.fullName.toUpperCase()) {
                        return 1
                    }
                    return 0
                }))
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const deleteAuthor = (_id) => {
        axios.delete(`http://localhost:8000/api/authors/delete/${_id}`)
            .then(response => {
                console.log(response)
                setAuthorList(authorList.filter(authorObject => authorObject._id != _id))
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div>
            <h1>Favorite Authors</h1>
            <Link to="/new" >Add an Author</Link>
            <hr />
            {
                authorList.map(authorObject => {
                    return (
                        <div key={authorObject._id}>
                            <h3>{authorObject.fullName}</h3>
                            <Link to={`edit/${authorObject._id}`} className='btn btn-secondary m-2'>Edit</Link>
                            <button className='btn btn-danger m-2' onClick={() => { deleteAuthor(authorObject._id) }}>Delete</button>
                        </div>
                    )
                })
            }
        </div>

    )
}

export default AllAuthors;