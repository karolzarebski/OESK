import { Modal } from "@mui/material";
import { ModalContainer } from "../../containers/ModalContainer";
import { Data } from "../../types/data";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

interface Props {
  showModal: boolean;
  closeModal: () => void;
  data: Data[];
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  scales: {
    y: {
      ticks: {
        color: "black",
      },
      title: {
        display: true,
        text: "Czas wykonania [s]",
      },
    },
    x: {
      ticks: {
        color: "black",
      },
      title: {
        display: true,
        text: "N-ty wyraz",
      },
    },
  },
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Czasy wykonania dla N wyrazu ciągu",
    },
  },
};

export const ChartModal = ({ showModal, closeModal, data }: Props) => {
  const labels = data.map((el) => el.FibonacciCount);
  const values = data.map((el) => el.TestDuration);

  const chartData = {
    labels,
    datasets: [
      {
        fill: true,
        label: data[0]?.Language,
        data: values,
        backgroundColor: "#1565c0",
      },
    ],
  };

  return (
    <Modal open={showModal} onClose={closeModal}>
      <ModalContainer width="70rem" height="30rem">
        <Bar options={options} data={chartData} width="150" height="50" />
      </ModalContainer>
    </Modal>
  );
};
