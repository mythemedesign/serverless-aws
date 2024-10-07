import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material"
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../store";

const Header = () => {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => { return { global : state.global, note: state.note, user:state.user }} )
    
    return <AppBar component="nav" position="relative">
        <Toolbar variant="dense">
            <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ display: { xs: 'none', sm: 'block' } }}
            >NOTES APP</Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                {user.IdentityId ? <IconButton
                    size="large"
                    edge="end"
                    aria-label="account of current user"
                    aria-haspopup="true"
                    onClick={() => {localStorage.clear(); dispatch(userAction.setTokens({awsCred: {},IdentityId: ""})); dispatch(userAction.setUser(""))}}
                    color="inherit"
                >
                    <LogoutIcon />
                </IconButton> : null}
            </Box>
        </Toolbar>
    </AppBar >

}

export default Header;