import React, { useState, useEffect } from 'react'
import { GetNotes } from '../../service/fetchNotes/GetNotes';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import './Home.css'
import AddNotes from '../../component/addnotes/AddNotes';
import { toast, ToastContainer } from 'react-toastify'
import Header from '../../component/header/Header';
import Notes from '../../component/notes/Notes';

const DrawerHeader = styled('div')(({ theme }) => ({
  ...theme.mixins.toolbar,
}));

const Home = () => {
  const [search, setSearch] = useState("")
  const [notesList, setNotesList] = useState([])

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = () => {
    if (localStorage.getItem("Token") == null) {
      setNotesList([]);
    }
    else {
      GetNotes()
        .then((response) => {
          toast.success(response.data.message);
          setNotesList(response.data.filter(val => val.archive === false).filter(val => val.trash === false));
        })
        .catch((err) => {
          toast.error(err.response.data);
        }
        );
    }
  }

  const inputSearchHandler = (search) => {
    setSearch(search); 
    // console.log("I am running")
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <Header searchMethod={inputSearchHandler} loadComponent={loadNotes} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <header className='headertab'>
          <div className="project">
            <AddNotes loadComponent={loadNotes} />
          </div>
        </header>
        <div className='cardcontainer'>
          {notesList.length === 0 &&
            <img className='emptydata' src='https://svgshare.com/i/AY2.svg' alt='icon' />
          }
          {notesList.filter(val => val.pinNote === true).length !== 0 &&
            <>
            <Notes allData={notesList.filter(val => val.pinNote === true)} onSearch={search} loadComponent={loadNotes} />
            <hr/>
            </>
          }
          {notesList.length !== 0 &&
            <Notes allData={notesList.filter(val => val.pinNote === false)} onSearch={search} loadComponent={loadNotes} />
          }
          <ToastContainer />
        </div>
      </Box>
    </Box >
  );
}

export default Home;