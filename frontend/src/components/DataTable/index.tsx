import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Data } from "../../types/data";

interface Props {
  data: Data[];
  openModal: () => void;
  setIdToDelete: React.Dispatch<React.SetStateAction<string>>;
}

export const DataTable = ({ data, openModal, setIdToDelete }: Props) => {
  const handleDelete = (id: string) => {
    setIdToDelete(id);
    openModal();
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>N'ty wyraz ciągu</TableCell>
            <TableCell>Język</TableCell>
            <TableCell>Data wykonania</TableCell>
            <TableCell>Czas wykonania [s]</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data.map(
              ({
                Id,
                FibonacciCount,
                Language,
                MeasurementDate,
                TestDuration,
              }) => (
                <TableRow
                  key={Id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center" component="th" scope="row">
                    {FibonacciCount}
                  </TableCell>
                  <TableCell align="center">{Language}</TableCell>
                  <TableCell align="center">{MeasurementDate}</TableCell>
                  <TableCell align="center">{TestDuration}</TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => handleDelete(`${Id}`)}>
                      <DeleteIcon sx={{ color: "#1565c0" }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              )
            )}
          {data.length === 0 && (
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center" component="th" scope="row">
                Brak danych
              </TableCell>
              <TableCell align="center">Brak danych</TableCell>
              <TableCell align="center">Brak danych</TableCell>
              <TableCell align="center">Brak danych</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
