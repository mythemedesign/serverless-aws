import { Button, Grid, Typography } from '@mui/material';
import googleButton from "../google.png"
import { GoogleLogin } from 'react-google-login';
import  axios from 'axios';
import { gapi } from 'gapi-script';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { userAction, globalAction } from '../store';
import { GOOGLE_CLIENT_ID, BASE_URL, POSTFIX } from '../api';



const GoogleButton = () => {
    const dispatch  = useDispatch();
    const responseGoogle = async (response) => {
        try {
        const id_token = response.tokenId;  
        const authUrl =  BASE_URL + POSTFIX + "auth";
        
        const res = await axios.get(authUrl, {
            headers: {
                Authorization: id_token
            }
        })
        dispatch(userAction.setUser(res.data.userName));
        dispatch(userAction.setTokens(res.data));
        localStorage.setItem("tokenId" , res.data.IdentityId)
        } catch (error) {
            dispatch(globalAction.isError(response));
         }
        

    }
    const failureGoogle = async (response) => {
        dispatch(globalAction.isError(response));
    }

    useEffect(() => {
        function start() {
          gapi.client.init({
            clientId: GOOGLE_CLIENT_ID,
            scope: 'email',
          });
        }
        gapi.load('client:auth2', start);
      }, []);

    return <Grid item textAlign="center" sx={{ background: "#FFFFFF", boxShadow: "0px 10px 25px rgba(29, 52, 54, 0.08)", borderRadius: "10px" }}>
        <GoogleLogin
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Login with Google"
            onSuccess={async(res) => await responseGoogle(res)}
            onFailure={failureGoogle}
            cookiePolicy={'single_host_origin'}
            render={(renderProps) => <Button container
                justifyContent={"flex-start"}
                alignItems="center"
                sx={{
                    borderRadius: "10px",
                    boxShadow: "0px 10px 25px rgba(29, 52, 54, 0.08)",
                    padding: "16px"
                }}
                onClick={renderProps.onClick} disabled={renderProps.disabled}
            >
                <Grid item>
                    <img alt="google-logo" src={googleButton}
                        style={{ height: "40px", width: "40px", marginTop: "4px" }} />
                </Grid>
                <Grid item sx={{ width: "190px" }}>
                    <Typography
                        style={{
                            fontFamily: "Nunito",
                            fontWeight: 800,
                            fontSize: "16px",
                            marginLeft: "8px",
                            lineHeight: "19px",
                            width: "186px",
                            color: "#282846",
                            paddingTop: "2px",
                        }}>Login with Google</Typography>
                </Grid>

            </Button>

            }
        />
    </Grid >
}

export default GoogleButton;