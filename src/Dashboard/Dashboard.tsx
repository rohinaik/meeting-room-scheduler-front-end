import * as React from 'react';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import NavBar from '../NavBar/NavBar';
import SearchIcon from "@mui/icons-material/Search";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState } from 'react';
import { DateField } from '@mui/x-date-pickers/DateField';
//import { Dayjs } from 'dayjs';
import dayjs, { Dayjs } from "dayjs";
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import './Dashboard.css';
import AddIcon from '@mui/icons-material/Add';
import MeetingRoomCard from '../MeetingCard/MeetingRoomCard';
import format from 'date-fns/format';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Bookings from '../Bookings/Bookings';
import { SelectProvider } from '@mui/base';
import { useNavigate } from "react-router-dom";

interface LinkTabProps {
    label?: string;
    href?: string;
}



function Dashboard() {
    const [value, setValue] = React.useState('1');
    const navigate = useNavigate();

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    const [rooms, setRooms] = React.useState<{ id: number; name: string }[]>([]);

    const [checkInDate, setCheckInDate] = useState<Dayjs | null>(dayjs());

    const [checkInTime, setcheckInTime] = useState<Dayjs | null>(dayjs());

    const [checkOutTime, setcheckOutTime] = useState<Dayjs | null>(dayjs());

    const [checkInDateString, setCheckInDateString] = useState<string>("");
    const [checkInTimeString, setCheckInTimeString] = useState<string>("");
    const [checkOutTimeString, setCheckOutTimeString] = useState<string>("");

    const handleCheckInDateChange = (date: any) => {
        setCheckInDate(date);
    };

    const handleAddRoomClick = async () => {
        navigate('/addRoom');
    }
    const handleSearchClick = async () => {
        if (checkInDate != null && checkInTime != null && checkOutTime != null) {
            setCheckInDateString(checkInDate.format('DD-MM-YYYY'));
            setCheckInTimeString(checkInTime.format('HH:mm'));
            setCheckOutTimeString(checkOutTime.format('HH:mm'));
            const response = await fetch('http://localhost:8080/api/meetings/' + checkInDate.format('DD-MM-YYYY') + '/' + checkInTime.format('HH:mm') + '/' + checkOutTime.format('HH:mm'), {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                mode: 'cors'
            });

            if (response.ok) {
                var searchResponse = await response.text();
                searchResponse = searchResponse.substring(1, searchResponse.length - 1);
                var roomsList = searchResponse.split(',');
                var roomsTemp: { id: number; name: string; }[] = [];
                roomsList.forEach(element => {
                    roomsTemp.push({ id: parseInt(element), name: 'Room ' + element });
                });
                setRooms(roomsTemp);
                console.log(rooms);
            }
            else {
                console.log("API Error:" + response);
            }
        }
    };

    return (
        <div>
            < NavBar />
            <div className='all-container'>
                <div className='app-name'>
                    <Typography variant="h2">
                        Meeting Room Scheduler
                    </Typography>
                </div>
                <div>
                    <div className='searchAvailableRooms-container'>
                        <Card className="card">
                            <CardContent>
                                <div className="content">
                                    <div>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DemoContainer components={['DateField']}>
                                                <DateField label="Meeting Date"
                                                    className="date-container"
                                                    value={checkInDate}
                                                    onChange={(newValue) => handleCheckInDateChange(newValue)} />
                                            </DemoContainer>
                                        </LocalizationProvider>
                                    </div>
                                    <div className="indiv-time-container">
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DemoContainer components={['TimePicker']}>
                                                <TimePicker label="Check In"
                                                    className="indiv-time"
                                                    value={checkInTime}
                                                    onChange={(newValue) => setcheckInTime(newValue)} />
                                            </DemoContainer>
                                        </LocalizationProvider>
                                    </div>
                                    <div className="indiv-time-container">
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DemoContainer components={['TimePicker']}>
                                                <TimePicker label="Check Out"
                                                    className="indiv-time"
                                                    value={checkOutTime}
                                                    onChange={(newValue) => setcheckOutTime(newValue)} />
                                            </DemoContainer>
                                        </LocalizationProvider>
                                    </div>
                                    <div className="searchButton">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            startIcon={<SearchIcon />}
                                            onClick={handleSearchClick}
                                            fullWidth
                                            className='search-btn'
                                        >
                                            Search
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
                
                { localStorage.getItem('userType') == "ADMIN"?
                <div className="addRoomButton">
                    <Button
                        variant="contained"
                        color="success"
                        startIcon={<AddIcon />}
                        onClick={handleAddRoomClick}
                        className='addroom-btn'
                    >
                        Add Rooms
                    </Button>
                </div> : null}
                

                <div className='tab-container'>
                    <Box sx={{ width: '100%', typography: 'body1', borderRadius: "12px", border: "4px" }}>
                        <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider', borderRadius: "12px" }}>
                                <TabList onChange={handleChange} aria-label="lab API tabs example">
                                    <Tab style={{ minWidth: "50%" }} label="Available Rooms" value="1" />
                                    <Tab style={{ minWidth: "50%" }} label="Your Bookings" value="2" />
                                </TabList>
                            </Box>
                            <TabPanel value="1">
                                <Grid container spacing={2}>
                                    {rooms.map((room: any) => (
                                        <Grid item xs={6} sm={4} md={3} key={room.id}>
                                            <Paper sx={{ p: 2, backgroundColor: "#bbf9fa", minHeight: "fit-content" }}>
                                                <MeetingRoomCard id={room.id} name={room.name} date={checkInDateString} checkin={checkInTimeString} checkout={checkOutTimeString} />
                                            </Paper>
                                        </Grid>
                                    ))}
                                </Grid>
                            </TabPanel>
                            <TabPanel value="2">
                                <Bookings></Bookings>
                            </TabPanel>
                        </TabContext>
                    </Box>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;