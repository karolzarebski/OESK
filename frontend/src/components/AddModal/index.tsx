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
}

export const AddModal = ({ showModal, closeModal }: Props) => {
  const [lang, setLang] = useState<string>("");
  const [fib, setFib] = useState<number>(1);

  const setLanguage = (event: any) => setLang(event.target.value);
  const setFibonacci = (event: any) => setFib(event.target.value);

  const handleAdd = () => {
    axios
      .post(`http://localhost:5000/add`, {
        language: lang,
        fibonacci_count: +fib,
      })
      .then((res) => {
        closeModal();
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
