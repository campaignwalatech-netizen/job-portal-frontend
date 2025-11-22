import { Button } from '@mui/material';

export const PrimaryButton = ({ children, loading, ...props }) => (
  <Button
    variant="contained"
    disabled={loading}
    {...props}
    sx={{
      py: 1,
      fontWeight: 600,
      borderRadius: 2,
      ...props.sx
    }}
  >
    {loading ? 'Loading...' : children}
  </Button>
);
