import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import dayjs from "dayjs";
import axios from "axios";
import { Data } from "../../types/data";

const getFormattedDate = (value: Dayjs) => {
  const day = value.date();
  const month = value.month();
  const year = value.year();
  const formattedMonth = month < 10 ? `0${month + 1}` : month + 1;
  return `${day}${formattedMonth}${year}`;
};

interface Props {
  date: Dayjs | null;
  setLang: React.Dispatch<React.SetStateAction<string>>;
  setData: React.Dispatch<React.SetStateAction<Data[]>>;
  setDate: React.Dispatch<React.SetStateAction<Dayjs | null>>;
  lang: string;
}

export const Filters = ({ date, setLang, setData, lang, setDate }: Props) => {
  const setFilterLang = (event: any) => {
    const {
      target: { value },
    } = event;
    const now = dayjs();
    const formattedDate = getFormattedDate(date || now);
    const link = date
      ? `http://localhost:5000/get?language=${value}&date=${formattedDate}`
      : `http://localhost:5000/get?language=${value}`;

    setLang(value);
    axios.get(link).then((res) => setData(res.data));
  };

  const setFilterDate = (value: Dayjs | null) => {
    if (value) {
      const formattedDate = getFormattedDate(value);
      const link = lang
        ? `http://localhost:5000/get?language=${lang}&date=${formattedDate}`
        : `http://localhost:5000/get?date=${formattedDate}`;
      setDate(value);
      axios.get(link).then((res) => setData(res.data));
    }
  };
  return (
    <Box
      display="flex"
      flexDirection="column"
      pt="1rem"
      width="100%"
      gap="1rem"
    >
      <Typography variant="h4">Filtry</Typography>
      <Box
        display="flex"
        gap="1rem"
        width="100%"
        justifyContent="space-between"
      >
        <FormControl>
          <InputLabel id="filter-language-select">Wybierz język</InputLabel>
          <Select
            sx={{ width: "30ch" }}
            value={lang}
            labelId="filter-language-select"
            label="Wybierz język"
            onChange={setFilterLang}
          >
            <MenuItem value="C">C</MenuItem>
            <MenuItem value="Cpp">C++</MenuItem>
            <MenuItem value="CSharp">C#</MenuItem>
          </Select>
        </FormControl>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Wybierz datę"
            value={date}
            onChange={setFilterDate}
            renderInput={(params) => <TextField {...params} />}
            maxDate={dayjs()}
          />
        </LocalizationProvider>
      </Box>
    </Box>
  );
};
