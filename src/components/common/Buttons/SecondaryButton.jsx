import { Button } from '@mui/material';

export const SecondaryButton = ({ children, ...props }) => (
  <Button
    variant="outlined"
    {...props}
    sx={{
      py: 0.5,
      borderRadius: 2,
      ...props.sx
    }}
  >
    {children}
  </Button>
);