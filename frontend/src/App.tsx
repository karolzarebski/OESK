import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import axios from "axios";
import { AddModal } from "./components/AddModal";
import { DataTable } from "./components/DataTable";
import { AppContainer } from "./containers/AppContainer";
import { DataContainer } from "./containers/DataContainer";
import { Data } from "./types/data";
import { DeleteModal } from "./components/DeleteModal";
import { Box } from "@mui/material";
import { ChartModal } from "./components/ChartModal";
import { Filters } from "./components/Filters";

function App() {
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showChartModal, setShowChartModal] = useState<boolean>(false);
  const [data, setData] = useState<Data[]>([]);
  const [idToDelete, setIdToDelete] = useState<string>("");
  const [lang, setLang] = useState<number>(1);

  const closeAddModal = () => setShowAddModal(false);
  const closeDeleteModal = () => setShowDeleteModal(false);
  const closeChartModal = () => setShowChartModal(false);
  const openAddModal = () => setShowAddModal(true);
  const openDeleteModal = () => setShowDeleteModal(true);
  const openChartModal = () => setShowChartModal(true);

  const handleGetAll = () => {
    setLang(1);
    axios.get(`http://localhost:5000/get`).then((res) => setData(res.data));
  };

  useEffect(() => {
    if (!showAddModal && !showDeleteModal) handleGetAll();
  }, [showAddModal, showDeleteModal]);

  return (
    <AppContainer>
      <AddModal showModal={showAddModal} closeModal={closeAddModal} />
      <ChartModal
        showModal={showChartModal}
        closeModal={closeChartModal}
        data={data}
      />
      <DeleteModal
        showModal={showDeleteModal}
        closeModal={closeDeleteModal}
        idToDelete={idToDelete}
      />
      <DataContainer>
        <Typography variant="h4">Historia operacji</Typography>

        <DataTable
          data={data}
          openModal={openDeleteModal}
          setIdToDelete={setIdToDelete}
        />
        <Filters
          setWord={setLang}
          setData={setData}
          word={lang}
          data={data}
        />
      </DataContainer>
      <Box display="flex" gap="1rem">
        <Button onClick={openAddModal} variant="contained">
          Dodaj nową operację
        </Button>
        {lang > 1 && data.length > 0 && (
          <Button onClick={openChartModal} variant="contained">
            Pokaż wykres dla aktualnych danych
          </Button>
        )}
      </Box>
    </AppContainer>
  );
}

export default App;
