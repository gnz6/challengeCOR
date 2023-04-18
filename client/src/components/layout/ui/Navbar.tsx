import { AppBar, Button, Grid, Toolbar, Typography } from '@mui/material'
import React from 'react'

export const Navbar = () => {

    const user = { status:"online", name:"Gonzalo" }

  return (
    <AppBar>
        <Toolbar>
            <Grid container>
            <Typography component={"h1"} variant='h5'>
                TaskApp
            </Typography>

            </Grid>
            <Grid>

            {
                user
                ?  <Grid>
                    <Typography>
                        {user.name}
                    </Typography>
                    <Button>
                        Logout
                    </Button>
                </Grid>
                :<Grid>
                    <Button>
                        Login with Google
                    </Button>
                </Grid>
            }
            </Grid>
        </Toolbar>
    </AppBar>
  )
}
