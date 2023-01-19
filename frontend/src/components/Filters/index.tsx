import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { Data } from "../../types/data";


interface Props {
  setWord: React.Dispatch<React.SetStateAction<number>>;
  setData: React.Dispatch<React.SetStateAction<Data[]>>;
  word: number;
  data: Data[];
}

export const Filters = ({ word, setWord, setData, data }: Props) => {
  // @ts-ignore
  const wordsList = Array.from({length:46}, (_,i) => i+1);

  const setFilterWord = (event: any) => {
    const {
      target: { value },
    } = event;
      setWord(value);
      axios.get(`http://localhost:5000/get?word=${value}`).then((res) => setData(res.data));
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
          <InputLabel id="filter-language-select">Wybierz wyraz ciągu</InputLabel>
          <Select
            sx={{ width: "30ch" }}
            value={word}
            labelId="filter-language-select"
            label="Wybierz wyraz ciągu"
            onChange={setFilterWord}
          >
            {wordsList.map((el) => <MenuItem value={el}>{el}</MenuItem>)}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};
