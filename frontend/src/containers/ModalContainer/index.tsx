import { Box } from "@mui/material";
import { forwardRef, ReactNode } from "react";

interface Props {
  children: ReactNode | ReactNode[];
}
export const ModalContainer = forwardRef(({ children }: Props, ref) => (
  <Box
    ref={ref}
    sx={{
      display: "flex",
      flexDirection: "column",
      position: "absolute" as "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "fit-content",
      height: "fit-content",
      border: "1px solid black",
      bgcolor: "white",
      borderRadius: 15,
      p: "3rem",
      gap: "2rem",
    }}
  >
    {children}
  </Box>
));
