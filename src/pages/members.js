import { useCallback, useMemo, useState, useEffect } from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PaperAirPlaneIcon from '@heroicons/react/24/solid/PaperAirPlaneIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { MembersTable } from 'src/sections/member/members-table';
import { MembersSearch } from 'src/sections/member/members-search';
import { applyPagination } from 'src/utils/apply-pagination';
import InviteForm from 'src/components/InviteForm';
import { useAuth } from 'src/hooks/use-auth';
import { set } from 'nprogress';
const now = new Date();
import { useGetUsers } from 'api/users';

// const data = [
//   {
//     id: '5e887ac47eed253091be10cb',
//     address: {
//       city: 'Cleveland',
//       country: 'USA',
//       state: 'Ohio',
//       street: '2849 Fulton Street'
//     },
//     avatar: '/assets/avatars/avatar-carson-darrin.png',
//     createdAt: subDays(subHours(now, 7), 1).getTime(),
//     email: 'carson.darrin@devias.io',
//     name: 'Carson Darrin',
//     church: 'CE Fifth Town'
//   },
//   {
//     id: '5e887b209c28ac3dd97f6db5',
//     address: {
//       city: 'Atlanta',
//       country: 'USA',
//       state: 'Georgia',
//       street: '1865  Pleasant Hill Road'
//     },
//     avatar: '/assets/avatars/avatar-fran-perez.png',
//     createdAt: subDays(subHours(now, 1), 2).getTime(),
//     email: 'fran.perez@devias.io',
//     name: 'Fran Perez',
//     church: 'CE Magnitude Road'
//   },
//   {
//     id: '5e887b7602bdbc4dbb234b27',
//     address: {
//       city: 'North Canton',
//       country: 'USA',
//       state: 'Ohio',
//       street: '4894  Lakeland Park Drive'
//     },
//     avatar: '/assets/avatars/avatar-jie-yan-song.png',
//     createdAt: subDays(subHours(now, 4), 2).getTime(),
//     email: 'jie.yan.song@devias.io',
//     name: 'Jie Yan Song',
//     church: 'CE Unending Grace'
//   },
//   {
//     id: '5e86809283e28b96d2d38537',
//     address: {
//       city: 'Madrid',
//       country: 'Spain',
//       name: 'Anika Visser',
//       street: '4158  Hedge Street'
//     },
//     avatar: '/assets/avatars/avatar-anika-visser.png',
//     createdAt: subDays(subHours(now, 11), 2).getTime(),
//     email: 'anika.visser@devias.io',
//     name: 'Anika Visser',
//     church: 'CE Pleasant Town'
//   },
//   {
//     id: '5e86805e2bafd54f66cc95c3',
//     address: {
//       city: 'San Diego',
//       country: 'USA',
//       state: 'California',
//       street: '75247'
//     },
//     avatar: '/assets/avatars/avatar-miron-vitold.png',
//     createdAt: subDays(subHours(now, 7), 3).getTime(),
//     email: 'miron.vitold@devias.io',
//     name: 'Miron Vitold',
//     church: 'CE Charis Road'
//   },
//   {
//     id: '5e887a1fbefd7938eea9c981',
//     address: {
//       city: 'Berkeley',
//       country: 'USA',
//       state: 'California',
//       street: '317 Angus Road'
//     },
//     avatar: '/assets/avatars/avatar-penjani-inyene.png',
//     createdAt: subDays(subHours(now, 5), 4).getTime(),
//     email: 'penjani.inyene@devias.io',
//     name: 'Penjani Inyene',
//     church: 'CE Fifth Town'
//   },
//   {
//     id: '5e887d0b3d090c1b8f162003',
//     address: {
//       city: 'Carson City',
//       country: 'USA',
//       state: 'Nevada',
//       street: '2188  Armbrester Drive'
//     },
//     avatar: '/assets/avatars/avatar-omar-darboe.png',
//     createdAt: subDays(subHours(now, 15), 4).getTime(),
//     email: 'omar.darobe@devias.io',
//     name: 'Omar Darobe',
//     church: 'CE Waytruth Villa'
//   },
//   {
//     id: '5e88792be2d4cfb4bf0971d9',
//     address: {
//       city: 'Los Angeles',
//       country: 'USA',
//       state: 'California',
//       street: '1798  Hickory Ridge Drive'
//     },
//     avatar: '/assets/avatars/avatar-siegbert-gottfried.png',
//     createdAt: subDays(subHours(now, 2), 5).getTime(),
//     email: 'siegbert.gottfried@devias.io',
//     name: 'Siegbert Gottfried',
//     church: 'CE First Flight'
//   },
//   {
//     id: '5e8877da9a65442b11551975',
//     address: {
//       city: 'Murray',
//       country: 'USA',
//       state: 'Utah',
//       street: '3934  Wildrose Lane'
//     },
//     avatar: '/assets/avatars/avatar-iulia-albu.png',
//     createdAt: subDays(subHours(now, 8), 6).getTime(),
//     email: 'iulia.albu@devias.io',
//     name: 'Iulia Albu',
//     church: 'CE Oregun Road'
//   },
//   {
//     id: '5e8680e60cba5019c5ca6fda',
//     address: {
//       city: 'Salt Lake City',
//       country: 'USA',
//       state: 'Utah',
//       street: '368 Lamberts Branch Road'
//     },
//     avatar: '/assets/avatars/avatar-nasimiyu-danai.png',
//     createdAt: subDays(subHours(now, 1), 9).getTime(),
//     email: 'nasimiyu.danai@devias.io',
//     name: 'Nasimiyu Danai',
//     church: 'CE Gold City'
//   }
// ];

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
      return members?.map((member) => member.id);
    },
    [members]
  );
};
const DEVBASEURL = "https://teens-church-report-api.onrender.com"
const Page = () => {

     let claims = JSON.parse(localStorage.getItem('claims'))
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [openAdmin, setOpenAdmin] = useState(false);
  const [data, setData] =useState([])

//   const { data: Users, isLoading } = useGetUsers({zone: claims?.zone, role:claims?.role, group: claims?.group, church:claims?.church});
//   console.log(Users)
 
     useEffect(() => {
          fetch(`${DEVBASEURL}/api/v1/users?zone=${claims?.zone}&role=${claims?.role}&group=${claims?.group}&church=${claims?.church}`).then((response) =>  {return response.json()}).then((data) => {
              setData(data.data)
          })
          // setData(Users?.data)
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

  return (
    <>
      <Head>
        <title>
          Members | Teens Ministry
        </title>
      </Head>
      <Box component="main"sx={{flexGrow: 1,py: 8}}>
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row"justifyContent="space-between"spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">
                  Members
                </Typography>
                <Stack alignItems="center"direction="row"spacing={1}>
                  <Button color="inherit"startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowUpOnSquareIcon />
                      </SvgIcon>
                    )}
                  >
                    Import
                  </Button>
                  <Button color="inherit"startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowDownOnSquareIcon />
                      </SvgIcon>
                    )}
                  >
                    Export
                  </Button>
                </Stack>
              </Stack>
              <Stack alignItems="center" direction="row" spacing={1}>
                <Button endIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                    
                  )}
                  onClick={() => {setOpen(true)}}
                  variant="contained"
                  
                >
                  Add Members
                </Button>

                {claims.role === 'Zonal Admin'&&<Button endIcon={(
                    <SvgIcon fontSize="small">
                      <PaperAirPlaneIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                  onClick={() => {setOpenAdmin(true)}}
                >
                  Invite Admin
                </Button>}
              </Stack>
            </Stack>
            <MembersTable
              count={data.length}
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
              selected={membersSelection.selected}
            />
           
          </Stack>
          
        </Container>
      </Box>
      <InviteForm open={open} setOpen={setOpen} />
      <InviteForm open={openAdmin} setOpen={setOpenAdmin} isAdmin />
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
