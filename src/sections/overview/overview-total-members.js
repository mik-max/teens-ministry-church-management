import { useState } from 'react';
import PropTypes from 'prop-types';
import ArrowDownIcon from '@heroicons/react/24/solid/ArrowDownIcon';
import ArrowUpIcon from '@heroicons/react/24/solid/ArrowUpIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import { Avatar, Box, Card, CardContent, Stack, SvgIcon, Typography } from '@mui/material';

export const OverviewTotalMembers = (props) => {
     let claims = JSON.parse(localStorage.getItem('claims'))
  const { difference, positive = false, sx, value, title, color } = props;
 const [role, setRole] = useState('superAdmin')
  return (
    <Card sx={sx}>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Stack spacing={1}>
            <Typography
              color="text.secondary"
              variant="overline"
            >
              Total Members
            </Typography>
            <Typography variant="h4">
              {value}
            </Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: 'success.main',
              height: 56,
              width: 56
            }}
          >
            <SvgIcon>
              <UsersIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
        <Box sx={{ mt: 3 }}>
           <Typography variant="overline"  color="text.secondary" gutterBottom>
           {claims.role == "Zonal Admin" && 'accross the zone'}
              {claims.role == "Group Admin" && 'accross the group'}
            </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

OverviewTotalMembers.propTypes = {
  difference: PropTypes.number,
  positive: PropTypes.bool,
  value: PropTypes.string.isRequired,
  sx: PropTypes.object
};

