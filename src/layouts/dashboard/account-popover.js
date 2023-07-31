import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { Box, Divider, MenuItem, MenuList, Popover, Typography } from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';


export const AccountPopover = (props) => {
     let claims = JSON.parse(localStorage.getItem('claims'))
     const {userData, signOut} = useAuth()
  const { anchorEl, onClose, open } = props;
  const router = useRouter();
//   const auth = useAuth();

  const handleSignOut = useCallback(
    () => {
      onClose?.();
      signOut();
      router.push('/auth/login');
    },
    [onClose,  router]
  );

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom'
      }}
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: 200 } }}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2
        }}
      >
        <Typography variant="overline">
          Account
        </Typography>
        <Typography
          color="text.secondary"
          variant="body2"
        >
          Hi {claims.firstName} {claims.lastName}
        </Typography>
        <Typography
          color="text.secondary"
          variant="body2"
          marginTop={1}
        >
          <b>{claims.role} </b>
        </Typography>
      </Box>
      <Divider />
      <MenuList
        disablePadding
        dense
        sx={{
          p: '8px',
          '& > *': {
            borderRadius: 1
          }
        }}
      >
        <MenuItem onClick={handleSignOut}>
          Sign out
        </MenuItem>
      </MenuList>
    </Popover>
  );
};

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired
};
