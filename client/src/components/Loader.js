import { Backdrop, CircularProgress, Grid, Paper } from "@mui/material"

const Loader = ({open}) => {
    return <Grid container justifyContent="center" alignItems="center">
        <Paper>
        <Backdrop
  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
  open={open}
>
  <CircularProgress color="inherit" />
</Backdrop>
</Paper>
    </Grid>
}

export default Loader