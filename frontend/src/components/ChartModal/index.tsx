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
        text: "Język",
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

const getSrednia = (numbers: string[]) => {
  let suma = 0;
  numbers.map((el) => suma+=+el);
  return suma/numbers.length;
}

export const ChartModal = ({ showModal, closeModal, data }: Props) => {
  const allLabels = data.map((el) => el.Language);
  // @ts-ignore
  const labels = [...new Set(allLabels)].sort();
  const cSharp = getSrednia(data.filter((filt)=>filt.Language === "C#").map((el) => el.TestDuration));
  const cPP = getSrednia(data.filter((filt)=>filt.Language === "C++").map((el) => el.TestDuration));
  const pureC = getSrednia(data.filter((filt)=>filt.Language === "C").map((el) => el.TestDuration));
  const values = [pureC,cSharp,cPP];

  const chartData = {
    labels,
    datasets: [
      {
        fill: true,
        label: data[0]?.FibonacciCount+"",
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
