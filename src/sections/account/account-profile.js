import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@mui/material';


export const AccountProfile = () =>{
     let claims = JSON.parse(localStorage.getItem('claims'))
     const user = {
          avatar: '/assets/avatars/avatar-anika-visser.png',
          city: 'Los Angeles',
          country: 'USA',
          role: claims.role,
          name: claims.firstName + " " + claims.lastName,
          timezone: ''
        };
        
     return (
          <Card>
            <CardContent>
              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <Avatar
                  src={user.avatar}
                  sx={{
                    height: 80,
                    mb: 2,
                    width: 80
                  }}
                />
                <Typography
                  gutterBottom
                  variant="h5"
                >
                  {user.name}
                </Typography>
                <Typography
                  color="text.secondary"
                  variant="body2"
                >
                  {user.role}
                </Typography>
              </Box>
            </CardContent>
            <Divider />
            <CardActions>
              <Button
                fullWidth
                variant="text"
              >
                Upload picture
              </Button>
            </CardActions>
          </Card>
        )
}
