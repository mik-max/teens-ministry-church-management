import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import CogIcon from '@heroicons/react/24/solid/CogIcon';
import LockClosedIcon from '@heroicons/react/24/solid/LockClosedIcon';
import BuildingOfficeIcon from '@heroicons/react/24/solid/BuildingOfficeIcon';
import UserIcon from '@heroicons/react/24/solid/UserIcon';
import UserPlusIcon from '@heroicons/react/24/solid/UserPlusIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import XCircleIcon from '@heroicons/react/24/solid/XCircleIcon';
import { SvgIcon } from '@mui/material';

export const items = [
  {
    title: 'Dashboard',
    path: '/',
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Members',
    path: '/members',
    icon: (
      <SvgIcon fontSize="small">
        <UsersIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Churches',
    path: '/churches',
    icon: (
      <SvgIcon fontSize="small">
        <BuildingOfficeIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Account',
    path: '/account',
    icon: (
      <SvgIcon fontSize="small">
        <UserIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Settings',
    path: '/settings',
    icon: (
      <SvgIcon fontSize="small">
        <CogIcon />
      </SvgIcon>
    )
  },
];
export const items2 = [
     {
       title: 'Dashboard',
       path: '/',
       icon: (
         <SvgIcon fontSize="small">
           <ChartBarIcon />
         </SvgIcon>
       )
     },
     {
       title: 'Members',
       path: '/members',
       icon: (
         <SvgIcon fontSize="small">
           <UsersIcon />
         </SvgIcon>
       )
     },
     {
       title: 'Account',
       path: '/account',
       icon: (
         <SvgIcon fontSize="small">
           <UserIcon />
         </SvgIcon>
       )
     },
     {
       title: 'Settings',
       path: '/settings',
       icon: (
         <SvgIcon fontSize="small">
           <CogIcon />
         </SvgIcon>
       )
     },
   ];
