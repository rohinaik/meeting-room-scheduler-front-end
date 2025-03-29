import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import "./NavBar.css"

interface NavbarProps { }

const NavBar: React.FC<NavbarProps> = () => {
    const navigate = useNavigate();
    
    const onHome = () => {
        navigate('/dashboard');
    };

    const onFeedback = () => {
        navigate('/viewFeedbacks');
    };

   

    const handleSignOut = () => {
        navigate('/');
    };

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const userInfo = {
        name: "Balloon"
    }


    return (
        <nav>
            <div className="logo">
                <Button variant="text" onClick={onHome}>
                    <Typography variant="h6" color="white">
                        Meeting Scheduler
                    </Typography>
                </Button>
            </div>
            <div>
                <div className='action-btn'>

                { localStorage.getItem('userType') == "ADMIN"?
                    <Button className="feedback-btn" onClick={onFeedback}>Feedback</Button>
                 : null}
                    
                   
                    <Button onClick={handleMenuOpen}>
                        <Avatar><PersonIcon /></Avatar>
                    </Button><Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                        <MenuItem>{localStorage.getItem('userName')}</MenuItem>
                        <MenuItem onClick={handleSignOut}>
                            <span style={{ marginRight: "16px" }}>Logout</span>
                            <LogoutIcon />
                        </MenuItem>
                    </Menu>
                </div>
            </div>
        </nav>
    );

};

export default NavBar;
