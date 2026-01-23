import { Alert, Button, CircularProgress, Stack } from "@mui/material";

export const GameNotFound = ({
  onBack,
  labelBack,
  message,
}: {
  onBack: () => void;
  labelBack: string;
  message: string;
}) => {
  return (
    <Alert
      severity="warning"
      action={<Button onClick={onBack}>{labelBack}</Button>}
    >
      {message}
    </Alert>
  );
};

export const GameLoading = () => {
  return (
    <Stack alignItems="center" sx={{ py: 8 }}>
      <CircularProgress />
    </Stack>
  );
};

export const GameError = ({ message }: { message: string }) => {
  return <Alert severity="error">{message}</Alert>;
};
