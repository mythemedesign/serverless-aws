import { Button, Card, CardContent, Grid, Typography } from "@mui/material";
import NoteAltTwoToneIcon from '@mui/icons-material/NoteAltTwoTone';
import { useDispatch } from 'react-redux';
import { globalAction } from "../store";

const AddNote = () => {
   const dispatch =  useDispatch();
    return <Grid item xs={12} sm={12} md={6} lg={3} xl={3} >
        <Card 
            elevation={8}
            sx={{ minWidth: 320, minHeight: 175 }}
        >
            <CardContent>
                <Grid container
                    justifyContent={"center"}
                    alignItems="center"
                    sx={{
                        borderRadius: "10px",
                        padding: "8px",
                        width: "300px",
                        minWidth: 320,
                        minHeight: 165
                    }}
                >
                    <Button item container
                        justifyContent={"center"}
                        alignItems="center"
                        variant="contained"
                        sx={{
                            borderRadius: "30px",
                            padding: "8px",
                            width: "260px",
                        }}
                        onClick={() => dispatch(globalAction.isModalOpen())}
                    >
                        <Grid item
                        >
                            <NoteAltTwoToneIcon style={{ height: "40px", width: "40px", marginTop: "4px", color: "#FAFAFA" }} />
                        </Grid>
                        <Grid item>
                            <Typography
                                style={{
                                    fontFamily: "Nunito",
                                    fontWeight: 800,
                                    fontSize: "25px",
                                    lineHeight: "19px",
                                    width: "150px",
                                    color: "#282846",
                                    paddingTop: "2px",
                                    // color: "#FAFAFA"
                                }}>Add Note</Typography>
                        </Grid>

                    </Button>

                </Grid >

            </CardContent >
        </Card >

    </Grid >


}

export default AddNote;