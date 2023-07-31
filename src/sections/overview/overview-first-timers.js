import PropTypes from 'prop-types';
import UserGroupIcon from '@heroicons/react/24/solid/UserGroupIcon';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  LinearProgress,
  Stack,
  SvgIcon,
  Typography
} from '@mui/material';

export const OverviewFirstTimers = (props) => {
  const { value, sx } = props;

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
              gutterBottom
              variant="overline"
            >
             Total First Timers
            </Typography>
            <Typography variant="h4">
              {value}
            </Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: 'blue',
              height: 56,
              width: 56
            }}
          >
            <SvgIcon>
              <UserGroupIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
        <Box sx={{ mt: 3 }}>
           <Typography variant="overline"  color="text.secondary" gutterBottom>
              This Month
            </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

OverviewFirstTimers.propTypes = {
  value: PropTypes.number.isRequired,
  sx: PropTypes.object
};
