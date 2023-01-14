import { Modal, Typography } from "@mui/material";
import { ModalContainer } from "../../containers/ModalContainer";
import { Data } from "../../types/data";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

interface Props {
  showModal: boolean;
  closeModal: () => void;
  data: Data[];
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
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
        text: "Czas wykonania",
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
        borderColor: "rgb(53, 162, 235)",
        data: values,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <Modal open={showModal} onClose={closeModal}>
      <ModalContainer>
        <Line options={options} data={chartData} />
      </ModalContainer>
    </Modal>
  );
};
