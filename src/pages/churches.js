import Head from 'next/head';
import { useCallback, useMemo, useState, useEffect } from 'react';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import { useSelection } from 'src/hooks/use-selection';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import ChurchForm from 'src/components/ChurchForm';
import {
  Box,
  Button,
  Container,
  Pagination,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { ChurchesTable } from 'src/sections/churches/churches-table';
import { ChurchesSearch } from 'src/sections/churches/churches-search';
import { subDays, subHours } from 'date-fns';
import { applyPagination } from 'src/utils/apply-pagination';
const now = new Date();

const DEVBASEURL = "https://teens-church-report-api.onrender.com"


   const usemembers = (page, rowsPerPage, data) => {
     return useMemo(
       () => {
         return applyPagination(data, page, rowsPerPage);
       },
       [page, data, rowsPerPage]
     );
   };
   
   const usememberIds = (members) => {
     return useMemo(
       () => {
         return members.map((member) => member.id);
       },
       [members]
     );
   };


const Page = () => {
     let claims = JSON.parse(localStorage.getItem('claims'))
     const [page, setPage] = useState(0);
     const [open, setOpen] = useState(false);
     const [data, setData] =useState([])
    
        useEffect(() => {
             fetch(`${DEVBASEURL}/api/v1/churches?zone=${claims.zone}&role=${claims.role}&group=${claims.group}&church=${claims.church}`).then((response) =>  {return response.json()}).then((data) => {
                 setData(data?.data);
             })
        }, [])
        const [rowsPerPage, setRowsPerPage] = useState(5);
        const members = usemembers(page, rowsPerPage, data);
        const membersIds = usememberIds(members);
        const membersSelection = useSelection(membersIds);
     const handlePageChange = useCallback(
       (event, value) => {
         setPage(value);
       },
       []
     );
   
     const handleRowsPerPageChange = useCallback(
       (event) => {
         setRowsPerPage(event.target.value);
       },
       []
     );
 return ( <>
    <Head>
      <title>
        Churches | Teens Ministry
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="xl">
        <Stack spacing={3}>
          <Stack
            direction="row"
            justifyContent="space-between"
            spacing={4}
          >
            <Stack spacing={1}>
              <Typography variant="h4">
                Churches
              </Typography>
              <Stack
                alignItems="center"
                direction="row"
                spacing={1}
              >
                <Button
                  color="inherit"
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <ArrowUpOnSquareIcon />
                    </SvgIcon>
                  )}
                >
                  Import
                </Button>
                <Button
                  color="inherit"
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <ArrowDownOnSquareIcon />
                    </SvgIcon>
                  )}
                >
                  Export
                </Button>
              </Stack>
            </Stack>
            <div>
              <Button
                endIcon={(
                  <SvgIcon fontSize="small">
                    <PlusIcon />
                  </SvgIcon>
                )}
                variant="contained"
                onClick={() => {setOpen(true);}}
              >
                Add Church
              </Button>
            </div>
          </Stack>      
          <ChurchesTable  
              count={data?.length}
              items={members}
              data={data}
              onDeselectAll={membersSelection.handleDeselectAll}
              onDeselectOne={membersSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={membersSelection.handleSelectAll}
              onSelectOne={membersSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={membersSelection.selected} />
   
        </Stack>
      </Container>
    </Box>
    <ChurchForm open={open} setOpen= {setOpen}/>
  </>
)};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;