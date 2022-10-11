import { useState } from "react";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";


export default function BasicDatePicker({ selectedDate, setSelectedDate }) {
  // const dateFormat = dayjs(date).format("YYYY-MM-DD")
  
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="등록 날짜"
        inputFormat="YYYY-MM-DD"
        value={selectedDate}
        onChange={(value) => {
          setSelectedDate(value);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
    
  );
}
