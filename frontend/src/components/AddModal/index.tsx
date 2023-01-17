import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { ModalContainer } from "../../containers/ModalContainer";

interface Props {
  showModal: boolean;
  closeModal: () => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AddModal = ({ showModal, closeModal, setLoading }: Props) => {
  const [lang, setLang] = useState<string>("");
  const [fib, setFib] = useState<number>(1);

  const setLanguage = (event: any) => setLang(event.target.value);
  const setFibonacci = (event: any) => {
    if (event.target.value > 75) return setFib(75);
    return setFib(event.target.value);
  };

  const handleAdd = () => {
    setLoading(true);
    axios
      .post(`http://localhost:5000/add`, {
        language: lang,
        fibonacci_count: +fib,
      })
      .then((res) => {
        closeModal();
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      });
  };

  return (
    <Modal open={showModal} onClose={closeModal}>
      <ModalContainer>
        <Typography variant="h4">Dodaj nową operację</Typography>
        <FormControl>
          <InputLabel id="language-select">Wybierz język</InputLabel>
          <Select
            value={lang}
            labelId="language-select"
            label="Wybierz język"
            onChange={setLanguage}
          >
            <MenuItem value="C">C</MenuItem>
            <MenuItem value="C++">C++</MenuItem>
            <MenuItem value="C#">C#</MenuItem>
          </Select>
        </FormControl>
        <TextField
          onChange={setFibonacci}
          value={fib}
          inputProps={{ min: 1, max: 75, step: 1 }}
          InputProps={{ inputProps: { min: 1, max: 75, step: 1 } }}
          type="number"
          variant="outlined"
          label="Numer ciągu"
        />
        <Box display="flex" gap="2rem" justifyContent="flex-end">
          <Button variant="contained" onClick={handleAdd}>
            Dodaj
          </Button>
          <Button variant="contained" onClick={closeModal}>
            Anuluj
          </Button>
        </Box>
      </ModalContainer>
    </Modal>
  );
};
