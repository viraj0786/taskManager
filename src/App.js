import * as React from 'react';
import './App.css';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Task from './component/task';

function App() {
  const [open, setOpen] = React.useState(false);
  const [SearchText, setSearchText] = React.useState("")
  const [addTitle, setaddTitle] = React.useState({
    title: "",
    data: ""
  })
  // to manage task
  const [taskList, settaskList] = React.useState({})

  const [searchList, setsearchList] = React.useState({})

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  const handleOpen = () => {
    setOpen(true)
    setsearchList({})
    setSearchText("")
  };

  const handleClose = () => {
    setOpen(false)
  };

  const handleSubmit = () => {
    setOpen(false)
    if (!taskList.firstSection) {
      settaskList({ ...taskList, "firstSection": [addTitle] })
    }
    else {
      settaskList({ ...taskList, "firstSection": [...taskList.firstSection, addTitle] })
    }
  }

  const deleteTask = (e) => {
    console.log("hello1", e.target.name);
  }

  const ClickonleftArrow = (e, i) => {
    setsearchList({})
    setSearchText("")
    let data = JSON.parse(JSON.stringify(taskList));
    if (e.target.name == "fourthSection") {
      data.fourthSection.splice(i, 1)
      if (!taskList.thirdSection) {
        settaskList({ ...data, "thirdSection": [taskList.fourthSection[i]] })
      } else {
        settaskList({ ...data, "thirdSection": [...taskList.thirdSection, taskList.fourthSection[i]] })
      }
    }
    else if (e.target.name == "thirdSection") {
      data.thirdSection.splice(i, 1)
      if (!taskList.secondSection) {
        settaskList({ ...data, "secondSection": [taskList.thirdSection[i]] })
      } else {
        settaskList({ ...data, "secondSection": [...taskList.secondSection, taskList.thirdSection[i]] })
      }
    }
    else if (e.target.name == "secondSection") {
      data.secondSection.splice(i, 1)
      if (!taskList.firstSection) {
        settaskList({ ...data, "firstSection": [taskList.secondSection[i]] })
      } else {
        settaskList({ ...data, "firstSection": [...taskList.firstSection, taskList.secondSection[i]] })
      }
    }
  }

  const ClickonrightArrow = (e, i) => {
    setsearchList({})
    setSearchText("")
    let data = JSON.parse(JSON.stringify(taskList));
    if (e.target.name == "firstSection") {
      data.firstSection.splice(i, 1)
      if (!taskList.secondSection) {
        settaskList({ ...data, "secondSection": [taskList.firstSection[i]] })
      } else {
        settaskList({ ...data, "secondSection": [...taskList.secondSection, taskList.firstSection[i]] })
      }
    }
    else if (e.target.name == "secondSection") {
      data.secondSection.splice(i, 1)
      if (!taskList.thirdSection) {
        settaskList({ ...data, "thirdSection": [taskList.secondSection[i]] })
      } else {
        settaskList({ ...data, "thirdSection": [...taskList.thirdSection, taskList.secondSection[i]] })
      }
    }
    else if (e.target.name == "thirdSection") {
      data.thirdSection.splice(i, 1)
      if (!taskList.fourthSection) {
        settaskList({ ...data, "fourthSection": [taskList.thirdSection[i]] })
      } else {
        settaskList({ ...data, "fourthSection": [...taskList.fourthSection, taskList.thirdSection[i]] })
      }
    }
  }

  const ClickonSearch = () => {
    if (Object.keys(taskList).length > 0) {
      var value = {}
      if (taskList.firstSection) {
        var first = taskList?.firstSection.filter((item, i) => item.title.includes(SearchText))
        value["firstSection"] = first
      }
      if (taskList.secondSection) {
        var second = taskList?.secondSection.filter((item, i) => item.title.includes(SearchText))
        value["secondSection"] = second
      }
      if (taskList.thirdSection) {
        var third = taskList?.secondSection.filter((item, i) => item.title.includes(SearchText))
        value["thirdSection"] = third
      } if (taskList.fourthSection) {
        var fourth = taskList?.fourthSection.filter((item, i) => item.title.includes(SearchText))
        value["fourthSection"] = fourth
      }
      setsearchList({ ...value })
    }
  }
  return (
    <>
      <div className="AppSection">
        <header className="App-header">
          <div className='search'>
            <TextField id="outlined-basic" label="Search Here" value={SearchText} variant="outlined" onChange={(e) => {
              setSearchText(e.target.value)
              ClickonSearch()
            }} />
            <SearchIcon />
          </div>
          <Button variant="contained" onClick={handleOpen}><AddIcon /> Add Task</Button>
        </header>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Task
              name="firstSection"
              value={Object.keys(searchList).length > 0 ? searchList.firstSection : taskList.firstSection}
              deleteTask={deleteTask}
              ClickonleftArrow={ClickonleftArrow}
              ClickonrightArrow={ClickonrightArrow}
              leftButton={false}
              rightButton={true}
              step={1}
            />
          </Grid>
          <Grid item xs={3}>
            <Task
              name="secondSection"
              value={Object.keys(searchList).length > 0 ? searchList.secondSection : taskList.secondSection}
              deleteTask={deleteTask}
              ClickonleftArrow={ClickonleftArrow}
              ClickonrightArrow={ClickonrightArrow}
              leftButton={true}
              rightButton={true}
              step={2}
            />
          </Grid><Grid item xs={3}>
            <Task
              name="thirdSection"
              value={Object.keys(searchList).length > 0 ? searchList.thirdSection : taskList.thirdSection}
              deleteTask={deleteTask}
              ClickonleftArrow={ClickonleftArrow}
              ClickonrightArrow={ClickonrightArrow}
              leftButton={true}
              rightButton={true}
              step={3}
            />
          </Grid><Grid item xs={3}>
            <Task
              name="fourthSection"
              value={Object.keys(searchList).length > 0 ? searchList.fourthSection : taskList.fourthSection}
              deleteTask={deleteTask}
              ClickonleftArrow={ClickonleftArrow}
              ClickonrightArrow={ClickonrightArrow}
              leftButton={true}
              rightButton={false}
              step={4}
            />
          </Grid>
        </Grid>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Task
          </Typography>
          <TextField fullWidth id="outlined-basic" onChange={(e) => setaddTitle({ ...addTitle, "title": e.target.value })} label="Add Title" variant="outlined" margin="dense" />
          <div>
            <br />
            <Button variant="contained" onClick={handleSubmit}><AddIcon /> Add Task</Button>
          </div>
        </Box>
      </Modal>
    </>
  );
}

export default App;
