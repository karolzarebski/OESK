import { Box } from "@mui/material";
import { ReactNode } from "react";

interface Props {
  children: ReactNode | ReactNode[];
}

export const DataContainer = ({ children }: Props) => (
  <Box
    display="flex"
    flexDirection="column"
    p="2rem"
    border="1px solid black"
    borderRadius="15px"
    height="75%"
  >
    {children}
  </Box>
);
