import PropTypes from 'prop-types';
import ArrowPathIcon from '@heroicons/react/24/solid/ArrowPathIcon';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  SvgIcon,
  Typography
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { Chart } from 'src/components/chart';

const useChartOptions = () => {
  const theme = useTheme();

  return {
    chart: {
      background: 'transparent',
      stacked: false,
      toolbar: {
        show: false
      }
    },
    colors: [theme.palette.primary.main, alpha(theme.palette.primary.main, 0.25)],
    dataLabels: {
      enabled: false
    },
    fill: {
      opacity: 1,
      type: 'solid'
    },
    grid: {
      borderColor: theme.palette.divider,
      strokeDashArray: 2,
      xaxis: {
        lines: {
          show: false
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      }
    },
    legend: {
      show: false
    },
    plotOptions: {
      bar: {
        columnWidth: '40px'
      }
    },
    stroke: {
      colors: ['transparent'],
      show: true,
      width: 2
    },
    theme: {
      mode: theme.palette.mode
    },
    xaxis: {
      axisBorder: {
        color: theme.palette.divider,
        show: true
      },
      axisTicks: {
        color: theme.palette.divider,
        show: true
      },
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ],
      labels: {
        offsetY: 5,
        style: {
          colors: theme.palette.text.secondary
        }
      }
    },
    yaxis: {
      labels: {
        formatter: (value) => (`${value}`),
        offsetX: -10,
        style: {
          colors: theme.palette.text.secondary
        }
      }
    }
  };
};

export const OverviewMembershipGrowth = (props) => {
  const { chartSeries, sx } = props;
  const chartOptions = useChartOptions();

  return (
    <Card sx={sx}>
      <CardHeader
        action={(
          <Button color="inherit" size="small" startIcon={(
              <SvgIcon fontSize="small">
                <ArrowPathIcon />
              </SvgIcon>
            )}>
            Sync
          </Button>
        )}
        title="Zonal Membership Strength Growth"
      />
      <Box sx={{ mt: 3 }}>
        
            <Box sx={{m:3,p:0.5, width:104, height:"21",borderRadius:10, textAlign:"center", backgroundColor:"rgb(99, 102, 241)", fontSize:"10px", color:"white" }}>This Year </Box>
            <Box sx={{m:3, p:0.5, width:104, height:"21",borderRadius:10,textAlign:"center",  backgroundColor:"rgba(99, 102, 241, 0.25)", fontSize:"10px"}}>Last Year </Box>
        </Box>
      <CardContent>
        <Chart
          height={350}
          options={chartOptions}
          series={chartSeries}
          type="bar"
          width="100%"
        />
      </CardContent>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        {/* <Button
          color="inherit"
          endIcon={(
            <SvgIcon fontSize="small">
              <ArrowRightIcon />
            </SvgIcon>
          )}
          size="small"
        >
          Overview
        </Button> */}
      </CardActions>
    </Card>
  );
};

OverviewMembershipGrowth.protoTypes = {
  chartSeries: PropTypes.array.isRequired,
  sx: PropTypes.object
};
