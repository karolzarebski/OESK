import { Box } from "@mui/material";
import { ReactNode } from "react";

interface Props {
  children: ReactNode | ReactNode[];
}

export const AppContainer = ({ children }: Props) => (
  <Box
    width="100%"
    height="100vh"
    display="flex"
    justifyContent="center"
    alignItems="center"
    flexDirection="column"
    gap="1rem"
  >
    {children}
  </Box>
);
