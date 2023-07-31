import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import { InputAdornment, OutlinedInput, SvgIcon } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { format } from 'date-fns';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { getInitials } from 'src/utils/get-initials';

export const ChurchesTable = (props) => {
     function myFunction() {
          console.log('keyup')
          var input, filter, table, tr, td, i, txtValue;
          input = document.getElementById("myInput");
          filter = input.value.toUpperCase();
          table = document.getElementById("myTable");
          tr = table.getElementsByTagName("tr");
          for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[0];
            if (td) {
              txtValue = td.textContent || td.innerText;
              if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
              } else {
                tr[i].style.display = "none";
              }
            }       
          }
     }
     const [admin, setAdmin] = useState(false)
     const [superAdmin, setSuperAdmin] = useState(true)
  const {
    count = 0,
    items = [],
    data=[],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = []
  } = props;
  console.log(items)

  const selectedSome = (selected.length > 0) && (selected.length < items.length);
  const selectedAll = (items.length > 0) && (selected.length === items.length);

  return (
          <div>
               <Card sx={{ p: 2 }}>
                    <OutlinedInput onKeyUp={() => {myFunction();}} id = "myInput" defaultValue="" fullWidth placeholder="Search church"
                         startAdornment={(
                         <InputAdornment position="start"  >
                              <SvgIcon
                              color="action"
                              fontSize="small"
                              >
                              <MagnifyingGlassIcon />
                              </SvgIcon>
                         </InputAdornment>
                         )}
                         sx={{ maxWidth: 500 }}
                    />
               </Card>
               { <Card>
                         <Scrollbar>
                         <Box sx={{ minWidth: 800 }}>
                              <Table id = "myTable">
                              <TableHead>
                              <TableRow>
                                   
                                   <TableCell> Church </TableCell>
                                   <TableCell> Group Church</TableCell>
                                   <TableCell>Pastor </TableCell>
                                   <TableCell> Address</TableCell>
                              </TableRow>
                              </TableHead>
                              <TableBody>
                              {items.map((member) => {
                                   const isSelected = selected.includes(member.ChurchId);
                                   // const createdAt = format(member.createdAt, 'dd/MM/yyyy');

                                   return (
                                   <TableRow
                                        hover
                                        key={member.ChurchId}
                                        selected={isSelected}
                                   >
                                        
                                        <TableCell>
                                             <Stack alignItems="center"  direction="row"spacing={2} >
                                             <Avatar src={member.avatar}>
                                                  {getInitials(member.Name)}
                                             </Avatar>
                                             <Typography variant="subtitle2">
                                                  {member.Name}
                                             </Typography>
                                             </Stack>
                                        </TableCell>
                                        <TableCell>{member.GroupChurch}</TableCell>
                                        <TableCell>
                                          {member.Pastor}
                                        </TableCell>
                                        <TableCell> {member.Address}</TableCell>
                                   </TableRow>
                                   );
                              })}
                              </TableBody>
                              </Table>
                         </Box>
                         </Scrollbar>
                         <TablePagination
                         component="div"
                         count={count}
                         onPageChange={onPageChange}
                         onRowsPerPageChange={onRowsPerPageChange}
                         page={page}
                         rowsPerPage={rowsPerPage}
                         rowsPerPageOptions={[5, 10, 25]}
                         />
                    </Card>
               }
             
            
          </div>
  
  );
};

ChurchesTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array
};
