import { useQuery, useMutation, useQueryClient } from "react-query";
import { Request } from "./requests";

export const useCreateUser = () => {
     const queryClient = useQueryClient();
     return useMutation(
       ({ data }) =>
         Request.post(`/api/v1/`, data)
           .then((res) => res.data)
           .catch((err) => {
             throw err?.response?.data;
           }),
       {
         onSuccess: (data) => {
           if (data) {
             queryClient.invalidateQueries(["getUsers"]);
           }
         },
       }
     );
};

export const useGetUsers = ({zone, role,group,church}) => useQuery(
     ["getUsers", zone, role, group, church], () => {
          Request.get(`/api/v1/users?zone=${zone}&role=${role}&group=${group}&church=${church}`)
          .then((res) => {
               return res?.data?.data;
          })
          .catch((err) => {
               throw err?.response?.data;
          }),
         {
           refetchOnWindowFocus: false,
           retry: false,
         }
     }
)