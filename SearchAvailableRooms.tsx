import * as React from 'react';
import { useState } from 'react';
import {
  Button,
  Grid
} from '@mui/material';
import './SearchAvailableRooms.css';
import NavBar from '../NavBar/NavBar';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateRange } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MultiInputDateTimeRangeField } from '@mui/x-date-pickers-pro/MultiInputDateTimeRangeField';


const SearchAvailableRooms = () => {

  const [value, setValue] = React.useState<DateRange<Dayjs>>(() => [
    dayjs('2022-04-17T15:30'),
    dayjs('2022-04-21T18:30'),
  ]);

  const handleSearch = () => {
    // if (fromDate && toDate) {
    //   onSearch(fromDate, toDate);
    // }
  };

  return (
    <div>
      <div>
        < NavBar />
      </div>
      <div className='searchAvailableRooms-container'>
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item xs={12}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                components={[
                  'MultiInputDateTimeRangeField',
                ]}
              >
                <MultiInputDateTimeRangeField
                  slotProps={{
                    textField: ({ position }) => ({
                      label: position === 'start' ? 'Check-in' : 'Check-out',
                    }),
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={handleSearch}>
              Search
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default SearchAvailableRooms;
