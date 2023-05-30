import { List, ListItem, ListItemIcon, ListItemText, ListItemButton } from '@mui/material';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import { Link } from 'react-router-dom';

const NavList = () => {

    const navList = [
        { id: 1, name: 'Notes', icon: <LightbulbOutlinedIcon fontSize="large" />, route: '/' },
        { id: 2, name: 'Archive', icon: <ArchiveOutlinedIcon fontSize="large" />, route: '/archive'  },
        { id: 3, name: 'Trash', icon: <DeleteOutlineIcon fontSize="large" />, route: '/trash' },
        { id: 4, name: 'Pinned', icon: <PushPinOutlinedIcon fontSize="large" />, route: '/pinned' },
    ]

    return (
        <List>
            {
                navList.map(list => (
                    <ListItem key={list.id} disablePadding sx={{ display: 'block' }}>
                        <Link to={`${list.route}`} style={{ textDecoration: 'none', display: 'flex', color: 'inherit'}}>
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon sx={{
                                minWidth: 0,
                                
                            }}>
                                {list.icon}
                            </ListItemIcon>
                            <ListItemText primary={list.name} sx={{ marginLeft: '25px' }} />
                        </ListItemButton>
                        </Link>
                    </ListItem>
                ))
            }
        </List>
    )
}

export default NavList;




// <List>
//           {['Notes', 'Archive', 'Trash', 'Pinned'].map((text, index) => (
//             <ListItem key={text} disablePadding sx={{ display: 'block' }}>
//               <ListItemButton
//                 sx={{
//                   minHeight: 48,
//                   justifyContent: open ? 'initial' : 'center',
//                   px: 2.5,
//                 }}
//               >
//                 <ListItemIcon
//                   sx={{
//                     minWidth: 0,
//                     mr: open ? 3 : 'auto',
//                     justifyContent: 'center',
//                   }}
//                 >
//                   {index === 0 && <LightbulbOutlinedIcon fontSize="large" />}
//                   {index === 1 && <ArchiveOutlinedIcon fontSize="large" />}
//                   {index === 2 && <DeleteOutlineIcon fontSize="large" />}
//                   {index === 3 && <PushPinOutlinedIcon fontSize="large" />}
//                 </ListItemIcon>
//                 <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
//               </ListItemButton>
//             </ListItem>
//           ))}
//         </List>