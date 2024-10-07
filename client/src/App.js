import './App.css';
import { Container, Grid, Modal, Paper } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react';
import { thunks } from './store';
import AddNote from './components/AddNote';
import Header from './components/Header';
import NoteModal from './components/NoteModal';
import Loader from './components/Loader';
import NoteCard from './components/NoteCard';
import { signApi } from './api';
import GoogleButton from './components/GoogleButton';


function App() {

  const dispatch = useDispatch()
  const { global, note, user } = useSelector((state) => { return { global : state.global, note: state.note, user:state.user }} )
  const [counter , setCounter ] = useState(-1)

  useEffect(() => {
    if(user.IdentityId) {
      if(counter) {signApi(user.awsCred); setCounter(1)}
      dispatch(thunks.notes.fetchNotes())
    }
  }, [counter, note.notes, user.IdentityId, user.awsCred,dispatch])

  return (
    <Container maxWidth="xl" minHeight="xl">
      <Loader open={global.loading}/> 
      <Header />
      <Container maxWidth="xl"  sx={{ minHeight:"95vh" }}>
        <Paper elevation={10}>
          <Grid container gap="10px" justifyContent="center" alignContent="center" alignItems="center" minHeight="95vh" >
       {  user.IdentityId ? <>
        <AddNote />
        { note.notes.map((note) => <NoteCard key={note.noteId} note={note}/>) }
       </>
        : <GoogleButton />
        }
      </Grid>
      {global.isModalOpen && <Modal
        open={global.isModalOpen}
        style={{display:'flex',alignItems:'center',justifyContent:'center'}}
        >
          <NoteModal
          noteId={note.noteToUpdate.noteId} 
          />
      </Modal>}
        </Paper>
      </Container>
    </Container>
  );
}

export default App;
