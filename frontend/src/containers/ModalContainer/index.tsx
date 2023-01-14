import { Box } from "@mui/material";
import { forwardRef, ReactNode } from "react";

interface Props {
  children: ReactNode | ReactNode[];
  width?: string;
  height?: string;
}
export const ModalContainer = forwardRef(
  ({ children, width, height }: Props, ref) => (
    <Box
      ref={ref}
      sx={{
        display: "flex",
        flexDirection: "column",
        position: "absolute" as "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: width || "fit-content",
        height: height || "fit-content",
        border: "1px solid black",
        bgcolor: "white",
        borderRadius: 15,
        p: "3rem",
        gap: "2rem",
      }}
    >
      {children}
    </Box>
  )
);
