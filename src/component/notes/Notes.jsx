import React, { useState } from 'react'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import IconButton from '@mui/material/IconButton';
import PushPinIcon from '@mui/icons-material/PushPin';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import ArchiveIcon from '@mui/icons-material/Archive';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Tooltip from '@mui/material/Tooltip';
import Github from '@uiw/react-color-github';
import ColorLensTwoToneIcon from '@mui/icons-material/ColorLensTwoTone';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Notes.css'

const colorMap = new Map("");

const Notes = (props) => {
  const [hex, setHex] = useState("");

  let notesList = props.allData
  let search = props.onSearch  

  const pinHandler = (id) => {
    axios.put(`http://localhost:8080/pinNotes/${localStorage.getItem("Token")}/${id}`)
      .then((res) => {
        toast.success(res.data.message);
        props.loadComponent();
      })
      .catch((err) => { console.log(err) })
  }

  const archiveHandler = (id) => {
    axios.put(`http://localhost:8080/archiveNotes/${localStorage.getItem("Token")}/${id}`)
      .then((res) => {
        toast.success(res.data.message);
        props.loadComponent();
      })
      .catch((err) => { console.log(err) })
  }

  const deleteHandler = (id) => {
    axios.delete(`http://localhost:8080/removeNotes/${localStorage.getItem("Token")}/${id}`)
      .then((res) => {
        toast.success(res.data.message);
        props.loadComponent();
      })
      .catch((err) => { console.log(err) })
  }

  const trashHandler = (id) => {
    axios.put(`http://localhost:8080/trashNotes/${localStorage.getItem("Token")}/${id}`)
      .then((res) => {
        toast.success(res.data.message);
        props.loadComponent();
      })
      .catch((err) => { console.log(err) })
  }

  return (
    <>
      {notesList
        .filter(val => {
          if (search === '') {
            return val;
          } else if (val.title.toLowerCase().includes(search.toLowerCase()) || val.notes.toLowerCase().includes(search.toLowerCase())) {
            return val;
          }
        })
        .map((product) => {
          return (
            <Card className='card' sx={{ maxWidth: '280px', border: 1, borderRadius: '16px', height: '100%', backgroundColor: (colorMap.get(product.id))}}>
              <CardContent class="cardcontent">
                <Tooltip title={product.title} arrow>
                  <label className='cardtitle'>
                    {product.title}
                  </label></Tooltip>
                {!product.pinNote && <div onClick={() => pinHandler(product.id)} className='pintop'><PushPinOutlinedIcon /></div>}
                {product.pinNote && <div onClick={() => pinHandler(product.id)} className='pintop'><PushPinIcon /></div>}
              </CardContent>
              <CardContent class="cardcontent">
                <label className='cardnote'>
                  {product.notes}
                </label>
              </CardContent>
              <br />
              <CardActions disableSpacing>
                <IconButton>
                  {!product.archive && <div onClick={() => archiveHandler(product.id)} className='actionbutton'><Tooltip title="Archive" arrow><ArchiveIcon /></Tooltip></div>}
                  {product.archive && <div onClick={() => archiveHandler(product.id)} className='actionbutton'><Tooltip title="Un-Archive" arrow><UnarchiveIcon /></Tooltip></div>}
                </IconButton>
                <IconButton>
                  {!product.trash && <div onClick={() => trashHandler(product.id)} className='actionbutton'><Tooltip title="Trash" arrow><DeleteOutlineIcon /></Tooltip></div>}
                  {product.trash && <div onClick={() => deleteHandler(product.id)} className='actionbutton'><Tooltip title="Delete" arrow><DeleteIcon /></Tooltip></div>}
                  {product.trash && <div onClick={() => trashHandler(product.id)} className='actionbutton'><Tooltip title="Restore" arrow><RestoreFromTrashIcon /></Tooltip></div>}
                </IconButton>
                <Tooltip title={<Github color={hex}
                                onChange={(color) => {
                                  setHex(color.hex);
                                  colorMap.set(product.id ,color.hex);
                                }} />} arrow>
                                <ColorLensTwoToneIcon color="action" />
                            </Tooltip>
              </CardActions>
            </Card>
          )
        }
        )}
    </>
  )
}
export default Notes