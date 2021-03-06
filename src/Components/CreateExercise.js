import React, {useState, useEffect} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

export const CreateExercise = () => {
    const [createExerciseState, setStateHook] = useState({
        username: '',
        description: '',
        duration: 0,
        date: new Date(),
        users: []
    })

    const onChangeUsername = (e) => {
        setStateHook({
            ...createExerciseState,
            username: e.target.value
        });
        
    }
    const onChangeDescription = (e) => {
        setStateHook({
            ...createExerciseState,
            description : e.target.value
        });
    }
    const onChangeDuration = (e) => {
        setStateHook({
            ...createExerciseState,
            duration: e.target.value
        });
    }
    const onChangeDate = (date) => {
        setStateHook({
            ...createExerciseState,
            date: date
        });
    }
    const onSubmit = (e) => {
        e.preventDefault();
        const exercise = {
            username: createExerciseState.username,
            description: createExerciseState.description,
            duration: createExerciseState.duration,
            date: createExerciseState.date,
        };
        console.log(exercise);

        axios.post('http://localhost:5000/exercises/add', exercise) // send http post request to this url
            .then(res => console.log(res.data));

        window.location = '/'; // go back to the list of the exerices(homepage)
    }
    // run once at the beginning (like componentdidmount with classes)
    useEffect(()=>{
        
        axios.get('http://localhost:5000/users/')
            .then(res => {
                res.data.length > 0 ?
                    setStateHook({
                        users:res.data.map(user=>user.username),
                        username:res.data[0].username
                    }) :
                console.log('there is no exercises on your list')
            })
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); 

    // run every time the state(passed parameter) is changed
    useEffect(() => {
       console.log('STATE CHANED 0_0')
       console.log(createExerciseState)
    }, [createExerciseState]);

    return (
        <div>
            <h3>Create New Exercise Log</h3>
            <form onSubmit={onSubmit}>


            
                <div className="form-group">
                    <label>Username: </label>
                    <select useref="userInput"
                        required
                        className="form-control"
                        value={createExerciseState.username || ''}
                        onChange={onChangeUsername}>
                        {
                            createExerciseState.users.map(function (user) {
                                return <option
                                    key={user}
                                    value={user || ''}>{user}
                                </option>;
                            })
                        }
                    </select>
                </div>
                <div className="form-group">
                    <label>Description: </label>
                    <input type="text"
                        required
                        className="form-control"
                        value={createExerciseState.description || ''}
                        onChange={onChangeDescription}
                    />
                </div>
                <div className="form-group">
                    <label>Duration (in minutes): </label>
                    <input
                        type="text"
                        className="form-control"
                        value={createExerciseState.duration || ''}
                        onChange={onChangeDuration}
                    />
                </div>




                <div className="form-group">
                    <label>Date: </label>
                    <div>
                        <DatePicker
                            selected={createExerciseState.date}
                            onChange={onChangeDate}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
                </div>

            </form>                
        </div>
    )
}
