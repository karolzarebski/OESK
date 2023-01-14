import { Box, Button, Modal, Typography } from "@mui/material";
import axios from "axios";
import { ModalContainer } from "../../containers/ModalContainer";

interface Props {
  showModal: boolean;
  closeModal: () => void;
  idToDelete: string;
}

export const DeleteModal = ({ showModal, closeModal, idToDelete }: Props) => {
  const handleDelete = () => {
    axios
      .delete(`http://localhost:5000/delete?id=${idToDelete}`)
      .then((res) => {
        closeModal();
      });
  };

  return (
    <Modal open={showModal} onClose={closeModal}>
      <ModalContainer>
        <Typography variant="h4">
          Czy na pewno chcesz usunąć operację z historii?
        </Typography>
        <Box display="flex" gap="2rem" justifyContent="flex-end">
          <Button variant="contained" onClick={handleDelete}>
            Usuń
          </Button>
          <Button variant="contained" onClick={closeModal}>
            Anuluj
          </Button>
        </Box>
      </ModalContainer>
    </Modal>
  );
};
