import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate, useNavigate } from 'react-router-dom';

//Material Ui
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Button, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, Slider } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

//CSS
import '../Auth.css'

//Validation
import { checkWhiteSpace, nameValidation, emailValidation, ageValidation } from '../../../validation/validation';

//Reducer
import { register } from '../../../redux/Slice/AuthSlice'

import Swal from 'sweetalert2'

import { main } from '../../../Notification/notification';

//Components
import NumericFormatCustom from '../../../components/NumericFormatCustom';

const Register = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userState = useSelector(state => state.auth)

    const [formData, setFormData] = useState({
        name: "",
        age: "",
        email: "",
        color: "",
        skill: 1
    })

    const [error, setError] = useState({
        name: "",
        age: "",
        email: "",
        color: "",
        skill: 1
    })

    function handleChange(e) {


        let { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))

        if (name === 'email') {
            emailValidation(formData.email, 'email', setError);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault()
        console.log('handle main submit');

        let successValidation = Object.entries(formData).map(([key, value]) => {
            if (typeof value === 'string') {
                formData[key] = value.trim();
            }

            let spaceExist = checkWhiteSpace(formData[key], key, setError)
            console.log(spaceExist, 'space exist');
            return spaceExist

        }).find(error => error === false);

        console.log(successValidation, 'error');
        if (successValidation === false) return


        let validName = nameValidation(formData.name, 'name', setError);
        let validAge = ageValidation(formData.age, 'age', setError);

        if (!validName || !validAge) {
            return;
        }

        let response = await dispatch(register(formData))
        console.log(response, 'register error resposne');

        if (response.error) {
            console.log('inside if');

            if (response.payload?.message) {
                {
                    Swal.fire({
                        icon: 'error',
                        title: 'Sorry',
                        text: `${response.payload.message}`,
                    })
                }
                return
            } else {
                {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: `Invalid Form Submission. Please check the details properly.`,
                    })
                }
                return
            }
        } else {

            {
                Swal.fire({
                    icon: 'success',
                    title: `${response.payload.message}`,
                    text: `${response.payload.skillMessage} ${response.payload.fact}`,
                }).then(function () {
                    main()
                    navigate('/user')
                })
            }

        }


    }
    // console.log(userState, 'user state');

    function handleNotification() {
    }

    return (
        <section>

            <Box height={'100%'}>
                <Grid container spacing={2} height={"100%"}>
                    <Grid item xs={12} className='all-center'>
                        <div className="inner-content">
                            <div className="form-header">
                                <h2 className='center-text'>Register</h2>
                            </div>
                            <form onSubmit={handleSubmit} className='form'>

                                <div className="form-input">
                                    <TextField onChange={handleChange} className='formInput' name='name' fullWidth label="Name" id="fullWidth" variant="outlined" xs={{ width: "100%" }} error={error.name !== "" ? true : false} helperText={error.name} />
                                </div>

                                <div className="form-input">
                                    <TextField onChange={handleChange} className='formInput' name='email' fullWidth label="Email" id="fullWidth" variant="outlined" xs={{ width: "100%" }} error={error.email !== "" ? true : false} helperText={error.email} />
                                </div>

                                <div className="form-input">
                                    <TextField InputProps={{
                                        inputComponent: NumericFormatCustom,
                                    }} onChange={handleChange} className='formInput' name='age' fullWidth label="Age" id="fullWidth" variant="outlined" xs={{ width: "100%" }} error={error.age !== "" ? true : false} helperText={error.age} />
                                </div>

                                <div className="form-input">
                                    <FormControl fullWidth className='formInput' error={error.color != "" ? true : false}>
                                        <InputLabel id="demo-simple-select-label">Select Color</InputLabel>
                                        <Select
                                            value={formData.color}
                                            label="Select Color" labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            name='color'
                                            onChange={handleChange}
                                        >
                                            <MenuItem value={"Red"}>Red</MenuItem>
                                            <MenuItem value={"Green"}>Green</MenuItem>
                                            <MenuItem value={"Blue"}>Blue</MenuItem>
                                            <MenuItem value={"Yellow"}>Yellow</MenuItem>
                                            <MenuItem value={"Black"}>Black</MenuItem>
                                        </Select>
                                        {error.color != "" ? <FormHelperText>{error.color}</FormHelperText> : null}

                                    </FormControl>
                                </div>

                                <div className="form-input">
                                    <label className='formLabel'>Skills</label>
                                    <Slider defaultValue={1} onChange={handleChange} value={formData.skill} name="skill" min={1} max={formData.age > 60 ? 7 : 10} aria-label="Default" valueLabelDisplay="auto" />
                                </div>

                                <div className="form-btn-div">
                                    <Button variant="contained" type='submit' className='authBtn formBtn blue-button'>Submit</Button>
                                </div>
                            </form>
                        </div>
                    </Grid>
                </Grid>

            </Box>

            <button onClick={handleNotification}>Enable Notification</button>

        </section>

    )
}

export default Register