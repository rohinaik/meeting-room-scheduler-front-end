import Button from "@mui/material/Button";
import Card from "@mui/material/Card/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import "./MeetingRoomCard.css";
import "../Dashboard/Dashboard"
import { useNavigate } from "react-router-dom";

type MeetingRoomProps = {
  id: number;
  name: string;
  date: string;
  checkin: string;
  checkout: string;
};

const MeetingRoomCard = ({ id, name,date,checkin, checkout }: MeetingRoomProps) => {
  const navigate = useNavigate();
  const [beverages, setBeverages] = useState(false);
  const [snacks, setSnacks] = useState(false);
  const [projector, setProjector] = useState(false);
  const [air_conditioner, setAirConditioning] = useState(false);
  const [userId, setUserID] = useState<string | null>('');
  

  const handleBeveragesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBeverages(event.target.checked);
  };

  const handleSnacksChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSnacks(event.target.checked);
  };

  const handleProjectorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProjector(event.target.checked);
  };

  const handleAirConditioningChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAirConditioning(event.target.checked);
  };
  useEffect(() => {
    setUserID(window.localStorage.getItem('userId'))
  }, [])

  const handleBookClick = async () => {

 
    var addOns = [];

    if (beverages){
      addOns.push("beverages");
    }
    if(projector){
      addOns.push("projector");
    }
    if(snacks){
      addOns.push("snacks");
    }
    if(air_conditioner){
      addOns.push("air_conditioner");
    }
    var addOnsString:string = addOns.join(',');

    console.log(date);
    console.log(id);
    console.log(checkin);
    console.log(checkout);
    console.log(userId);
    console.log(addOnsString);

    try {
      const response = await fetch('http://localhost:8080/api/meetings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({roomId: id, userId: userId, date:date,startTime:checkin,endTime:checkout,addons:addOnsString})
               
            });

            if(response.ok)
            {
              console.log(await response.text());
              alert("Room Booked Successfully");
              navigate('/dashboard'); 
            }
            else{
              console.log("API ERROR");
            }
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <Card className="meeting-card">
      <CardHeader title={name} />
      <div className="content">
        <CardContent>
          <FormControlLabel
            control={<Checkbox checked={beverages} onChange={handleBeveragesChange} />}
            label="Beverages"
          />
          <FormControlLabel
            control={<Checkbox checked={snacks} onChange={handleSnacksChange} />}
            label="Snacks"
          />
          <FormControlLabel
            control={<Checkbox checked={projector} onChange={handleProjectorChange} />}
            label="Projector"
          />
          <FormControlLabel
            control={<Checkbox checked={air_conditioner} onChange={handleAirConditioningChange} />}
            label="Air Conditioner"
          />
          <div className="bookButton">
            <Button variant="contained" color="primary" onClick={handleBookClick}>
              Book
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default MeetingRoomCard;
