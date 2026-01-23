import React from "react";
import {
  Box,
  Fade,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import IconButton from "@mui/material/IconButton";
import { NiceCountdown } from "../pages/GamePage/components/NiceCountdown";

export const FloatingCountdownHUD = ({
  visible,
  msLeft,
  label = "",
  onClick,
  topOffset = 72,
  showLabel = true,
}: {
  visible: boolean;
  msLeft: number | null;
  label: string;
  onClick: () => void;
  topOffset?: number;
  showLabel?: boolean;
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const canShow = visible && msLeft != null && msLeft > 0;

  // Softer neon (more subtle)
  const neon =
    theme.palette.mode === "dark"
      ? "rgba(120, 255, 214, 0.38)"
      : "rgba(0, 150, 120, 0.28)";

  const halo =
    theme.palette.mode === "dark"
      ? "rgba(120, 255, 214, 0.10)"
      : "rgba(0, 150, 120, 0.08)";

  const effectiveShowLabel = showLabel && !isMobile && label;

  return (
    <Fade in={canShow} unmountOnExit>
      <Box
        onClick={onClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") onClick();
        }}
        sx={{
          position: "fixed",
          zIndex: theme.zIndex.appBar + 1,
          cursor: "pointer",
          outline: "none",
          top: isMobile
            ? "auto"
            : `calc(env(safe-area-inset-top, 0px) + ${topOffset}px)`,
          right: isMobile ? "auto" : 10,
          bottom: isMobile
            ? `calc(env(safe-area-inset-bottom, 0px) + 10px)`
            : "auto",
          left: isMobile ? "50%" : "auto",
          transform: isMobile ? "translateX(-50%)" : "none",
        }}
      >
        <Paper
          elevation={0}
          sx={{
            borderRadius: 1,
            px: 0.5,
            py: 0.8,
            overflow: "hidden",

            background:
              theme.palette.mode === "dark"
                ? "rgba(10, 12, 16, 0.20)"
                : "rgba(255, 255, 255, 0.72)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            border: "1px solid transparent",
            backgroundImage: `linear-gradient(${
              theme.palette.mode === "dark"
                ? "rgba(10, 12, 16, 0.20)"
                : "rgba(255, 255, 255, 0.72)"
            }, ${
              theme.palette.mode === "dark"
                ? "rgba(10, 12, 16, 0.20)"
                : "rgba(255, 255, 255, 0.72)"
            }), linear-gradient(135deg, ${neon}, rgba(255,255,255,0))`,
            backgroundOrigin: "border-box",
            backgroundClip: "padding-box, border-box",
            boxShadow: `0 0 0 1px ${halo} inset, 0 6px 18px rgba(0,0,0,0.14), 0 0 10px ${halo}`,
          }}
        >
          <Stack
            direction="row"
            spacing={0.6}
            alignItems="center"
            sx={{ minWidth: 0 }}
          >
            <Stack spacing={0} sx={{ minWidth: 0, flex: 1 }}>
              {effectiveShowLabel ? (
                <Typography
                  variant="caption"
                  sx={{
                    opacity: 0.55,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    lineHeight: 1.0,
                    fontSize: 9,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {label}
                </Typography>
              ) : null}

              <Box
                sx={{
                  lineHeight: 1,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  "& *": {
                    fontSize: isMobile ? "0.9rem" : "0.92rem",
                    fontWeight: 800,
                    lineHeight: 1.05,
                  },
                  "& .MuiStack-root": { flexWrap: "nowrap" },
                }}
              >
                <NiceCountdown msLeft={msLeft} compact />
              </Box>
            </Stack>

            <IconButton
              size="small"
              aria-label="Scroll to countdown"
              onClick={(e) => {
                e.stopPropagation();
                onClick();
              }}
              sx={{
                p: 0.15,
                borderRadius: 999,
                color: "text.secondary",
                "& svg": { fontSize: 16 },
                "&:hover": {
                  color: "text.primary",
                  backgroundColor:
                    theme.palette.mode === "dark"
                      ? "rgba(255,255,255,0.05)"
                      : "rgba(0,0,0,0.05)",
                },
              }}
            >
              <KeyboardArrowUpIcon />
            </IconButton>
          </Stack>
        </Paper>
      </Box>
    </Fade>
  );
};
