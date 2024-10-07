import { Card, CardContent, CardHeader, Grid, IconButton, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditOutlineTwoToneIcon from '@mui/icons-material/ModeEditOutlineTwoTone';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';
import { useDispatch } from 'react-redux';
import { thunks, globalAction } from '../store';

const NoteCard = ({ note }) => {

    const dispatch = useDispatch()

    return <Grid item
    xs={12} sm={12} md={6} lg={3} xl={3}
        >
        <Card
            elevation={8}
            sx={{ minWidth: 320, minHeight: 175 }}>
            <Grid item>
                <CardHeader
                    title={
                        <Typography
                            style={{
                                fontFamily: "Nunito",
                                fontWeight: 600,
                                fontSize: "30px",
                                lineHeight: "19px",
                                height: "19px",
                                color: "#29A19C",
                                textOverflow: 'ellipsis',
                                width:"100%"
                            }}>{note.title}</Typography>
                    }
                    subheader={
                        <Grid container alignItems={"center"} sx={{ marginTop: "14px", height: 32 }} spacing={"2px"}>
                            <Grid item container>
                                <Grid item>
                                    < AccessTimeIcon sx={{
                                        height: 22,
                                        width: 22
                                    }} />
                                </Grid>
                                <Grid item>
                                    <Typography
                                        style={{
                                            fontFamily: "Nunito",
                                            fontWeight: 400,
                                            fontSize: "18px",
                                            lineHeight: "19px",
                                            width: "72px",
                                            color: "#282846",
                                            paddingTop: "2px",
                                            marginLeft: "5px"
                                        }}>{note.time}</Typography>
                                </Grid>
                                <Grid item sx={{ marginLeft: "-10px" }}>
                                    < CalendarTodayIcon sx={{
                                        height: 20,
                                        width: 20
                                    }} />
                                </Grid>
                                <Grid item>
                                    <Typography
                                        style={{
                                            fontFamily: "Nunito",
                                            fontWeight: 400,
                                            fontSize: "18px",
                                            lineHeight: "19px",
                                            width: "72px",
                                            color: "#282846",
                                            paddingTop: "2px",
                                            marginLeft: "5px"
                                        }}>{note.date}</Typography>
                                </Grid>

                            </Grid>
                            <Grid item container>
                                <Grid item  sx={{
                                            height: 20,
                                            width: 20}} > 
                                    <IconButton
                                        sx={{
                                            height: 20,
                                            width: 20,
                                            color: true ? "green" : "red"
                                        }}>
                                        < CheckCircleTwoToneIcon sx={{
                                            height: 20,
                                            width: 20,
                                            color: true ? "green" : "red"
                                        }} />
                                    </IconButton>
                                </Grid>
                                <Grid item sx={{ marginLeft: "2px" }}>
                                    <Typography
                                        style={{
                                            fontFamily: "Nunito",
                                            fontWeight: 400,
                                            fontSize: "20px",
                                            marginLeft:"10px",
                                            lineHeight: "19px",
                                            width: "72px",
                                            color: "#282846",
                                            paddingTop: "2px",
                                        }}>{note.category}</Typography>
                                </Grid>

                            </Grid>

                        </Grid>
                    }
                    action={
                        <Grid container>
                            <Grid item>
                                <IconButton sx={{ color: "#282846" }} onClick={() => { dispatch(thunks.notes.getNoteById(note.noteId)); dispatch(globalAction.isModalOpen(true)) }}><ModeEditOutlineTwoToneIcon /> </IconButton>
                            </Grid>
                            <Grid item>
                                <IconButton sx={{ color: "#F05454" }} onClick={() => dispatch(thunks.notes.deleteNote(note.noteId))}><DeleteIcon /> </IconButton>
                            </Grid>
                        </Grid>
                    }>

                </CardHeader>
            </Grid>
            <Grid item>
                <CardContent sx={{ maxWidth: "375px", height: "70px" }}>
                    <Typography variant="body2" color="text.secondary" textAlign="center" textOverflow={"ellipsis"}>
                        {note.description}
                    </Typography>
                </CardContent>
            </Grid>

        </Card>

    </Grid >
}


export default NoteCard;