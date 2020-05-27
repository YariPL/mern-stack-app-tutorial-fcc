import React,{ useState } from 'react';
import axios from 'axios';

export const CreateUser = () => {
    // set the state and function to change the state
    const [createUserState, setStateHook] = useState({username: ''})

    const onChangeUsername = (e) => {

        setStateHook({
            username:e.target.value
        })

    }

    const onSubmit = (e) => {
        e.preventDefault();
        const newUser = {
            username: createUserState.username
        };
        console.log(newUser);

        axios.post('http://localhost:5000/users/add', newUser) // send http post request to this url
            .then(res => console.log(res.data));

        setStateHook({
            username: ''
        })
    }

    return(
        <div>
            <h3>Create New User</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Username: </label>
                    <input type="text"
                        required
                        className="form-control"
                        value={createUserState.username}
                        onChange={onChangeUsername}
                    />
                </div>
                <div className="form-group">
                    <input type="submit" value="Create User" className="btn btn-primary" />
                </div>
            </form>
        </div>
    )
}