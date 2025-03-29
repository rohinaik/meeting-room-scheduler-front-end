import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from "react";
import './ViewFeedbacks.css';
import Chip from '@mui/material/Chip';
import React from 'react';
import { Book } from '@mui/icons-material';
import NavBar from '../NavBar/NavBar';
import { Typography } from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(
  feedback_id: number,
  rating: number,
  feedback: string,
  meeting_id: number
) {
  return { feedback_id, rating, feedback, meeting_id};
}


function ViewFeedbacks() {

  const [rows, setRows] = React.useState<{feedback_id: number, rating: number, feedback: string, meeting_id: number}[]>([]);
  const [userId, setUserID] = useState<string | null>('');
  var response;

  useEffect(() => {
    setUserID(window.localStorage.getItem('userId'))
  }, []);

  (async () => {
    console.log(userId);
    response = await fetch(`http://localhost:8080/api/allFeedbacks`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                mode: 'cors'
            });

            if(response.ok)
            {
                var rowsTemp: { feedback_id: number, rating: number, feedback: string, meeting_id: number }[] = [];
                var searchResponse = await response.json();
                searchResponse.forEach((element: {feedback_id: number, rating: number, feedback: string, meeting_id: number}) => { 
                  rowsTemp.push(createData(element['feedback_id'], element['rating'], element['feedback'], element['meeting_id']));
                });
                setRows(rowsTemp);
          
            }
            else{
                console.log("API Error:" + response);
            }
})();
  

            
  return (

    <div>
        < NavBar />
        <div className='all-containers'>
        <div className='app-name'>
                    <Typography variant="h2">
                        Feedbacks
                    </Typography>
                </div>
            
          <TableContainer className= 'table' component={Paper}>
            <Table sx={{ minWidth: 10 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">Feedback Id</StyledTableCell>
                  <StyledTableCell align="center">Rating</StyledTableCell>
                  <StyledTableCell align="center">Feedback</StyledTableCell>
                  <StyledTableCell align="center">Meeting Id</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <StyledTableRow key={row.feedback_id}>
                    <StyledTableCell align="center" component="th" scope="row">{row.feedback_id}</StyledTableCell>
                    <StyledTableCell align="center">{row.rating}</StyledTableCell>
                    <StyledTableCell align="center">{row.feedback}</StyledTableCell>
                    <StyledTableCell align="center">{row.meeting_id}</StyledTableCell>
  
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
    </div>
  );
}
export default ViewFeedbacks;