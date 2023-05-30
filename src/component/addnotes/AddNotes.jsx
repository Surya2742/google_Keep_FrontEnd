import { useState, useRef } from 'react';
import { toast} from 'react-toastify';
import { Box, TextField, ClickAwayListener } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';

const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    box-shadow: 1px 1px 2px;
    width: 40%;
    border-radius: 8px;
    padding: 10px 15px;
`

const AddNotes = (props) => {
    const [showTextField, setShowTextField] = useState(false);
    const [addNote, setAddNote] = useState({title: "", notes: ""});
    let loggedInUser = localStorage.getItem("Token");

    const containerRef = useRef();

    const onChangeHandler = (e) => {
        const { name, value } = e.target
        setAddNote(prevState => ({
            ...prevState,
            [name]: value
        }))
        console.log(value)
    }

    const handleClickAway = (e) => {
        setShowTextField(false);
        containerRef.current.style.minheight = '30px'
        setAddNote({title: "", notes: ""});
        if (addNote.notes || addNote.title) {
            e.preventDefault();
            axios.post(`http://localhost:8080/createNotes/${loggedInUser}`, addNote)
                .then((Response) => {
                    toast.success(Response.data.message);
                    props.loadComponent();
                     })
                .catch((err) => { 
                    toast.error(err.response.data) })
        }
    }

    const onTextAreaClick = () => {
        setShowTextField(true);
        containerRef.current.style.minheight = '70px'
    }

    return(
        <ClickAwayListener onClickAway={handleClickAway}>
            <Container ref={containerRef}>
                {   showTextField && 
                    <TextField 
                        placeholder="Title"
                        variant="standard"
                        InputProps={{ disableUnderline: true }}
                        style={{ marginBottom: 10 }}
                        onChange={onChangeHandler}
                        name='title'
                        value={addNote.title}
                    />
                }
                <TextField
                    placeholder="Take a note..."
                    multiline
                    maxRows={Infinity}
                    variant="standard"
                    InputProps={{ disableUnderline: true }}
                    onClick={onTextAreaClick}
                    onChange={onChangeHandler}
                    name='notes'
                    value={addNote.notes}
                />
            </Container>
        </ClickAwayListener>
    )
}
export default AddNotes;