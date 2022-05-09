import React, {useState,useEffect} from "react";
import {Routes,Route, Navigate, useNavigate } from "react-router-dom";
import Rating from './rating/Rating';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import Collapse from '@mui/material/Collapse';
import ListSubheader from '@mui/material/ListSubheader';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import AboutForm from './AboutForm';
import "../../assets/css/dash.css";

import Contactus from "./Contact/Contactus";
import Testimonialsdash from "./Testimonials/testimonialsdash";
import Training from "./Services/Training";
import Business from "./Services/Business";
import Formative from "./Services/Formative";
import Investment from "./Services/Investment";
import Ourteam from "./Ourteam/Ourteam";
import Aboutustable from "./AboutusTable";
import Feedback from "./Feedback/Feedback";
import Notification from "./Notification/Notification";
import DashboardContainer from "./dashobard/Dashboard";
import {EmailOutlined, Google, LogoutOutlined, NotificationAdd, PersonSearchOutlined, SettingsOutlined, ThumbUpOutlined} from "@mui/icons-material"
import { FlashOnTwoTone, Person, PersonAddOutlined, PersonOutlined } from "@material-ui/icons";
import GAnalytics from "./analytics/G-analytics";
import User from "./Users/user";
import Clients from "./Clients/clients";
const drawerWidth = 240;
const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );
  const Input = styled('input')({
    display: 'none',
  });
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);
;
// data table
const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

//data table
const Dashboard =(props)=>{
    props.Nav(false);
    const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [serviceopen, setServiceopen] = useState(false);
  const [show, setShow] = useState(false);
  const [abtshow, setAbtshow] = useState(false);
  const [testishow, setTestishow] = useState(false);
  const [trainshow, setTrainshow] = useState(false);
  const [busishow, setBusishow] = useState(false);
  const [formatshow, setFormatshow] = useState(false);
  const [investshow, setInvestshow] = useState(false);
  const [contactshow, setContactshow] = useState(false);
  const [ourteamshow, setOurteamshow] = useState(false);
  const [abttableshow, setAbttableshow] = useState(false);
  const [usershow, setUsershow] = useState(false);
  const [feedbackshow, setFeedbackshow] = useState(false);
  const [notishow, setNotishow] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [clientsshow, setClientshow] = useState(false);
  const [dashshow,setDashshow]=useState(true);
  const [ratingShow,setRatingShow] = useState(false);
  const navigate = useNavigate();
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleClick = () => {
    setOpen(!open);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  }
  
  const logout = () => {
    window.localStorage.removeItem('accessToken');

  };
    return <>



 <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" color="success" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
          G-TWO INVESTMENT AND ENVIRONMENT 
CONSULTING PLC
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
     
        <List  className="list"
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
 
        </ListSubheader>
      }
    >
          <ListItemButton className="list-item  mt-1 mb-1" onClick={()=>{
            setDashshow(true)
            setRatingShow(false);
            setAbttableshow(false) 
            setOurteamshow(false)
            setNotishow(false)
              setTestishow(false)
              setAnalytics(false)
              setClientshow(false)
              setFeedbackshow(false)
              setTrainshow(false)
              setUsershow(false)
              setInvestshow(false)
              setFormatshow(false)
              setBusishow(false)
              setAbtshow(false)
          }} >
        <ListItemIcon>
          <SendIcon />
        </ListItemIcon>
        <ListItemText  primary="Dashboard" />
      </ListItemButton>
     <ListItemButton className="list-item mt-1 mb-1" onClick={()=>{ setAbttableshow(true) 
  setOurteamshow(false);
  setRatingShow(false)
  setDashshow(false)
  setNotishow(false)
    setTestishow(false)
    setAnalytics(false)
    setClientshow(false)
    setFeedbackshow(false)
    setTrainshow(false)
    setUsershow(false)
    setInvestshow(false)
    setFormatshow(false)
    setBusishow(false)
    setAbtshow(false)
    }}>
        <ListItemIcon>
          <PersonOutlined />
        </ListItemIcon>
        <ListItemText  primary="About Us" />
      </ListItemButton>
      <ListItemButton  className="list-item  mt-1 mb-1" onClick={()=>{ setTestishow(true) 
      setAbttableshow(false)
      setDashshow(false)
      setContactshow(false)
     setOurteamshow(false)
     setNotishow(false)
     setTrainshow(false)
     setInvestshow(false)
     setAnalytics(false)
     setFormatshow(false)
     setUsershow(false)
     setClientshow(false)
     setBusishow(false)
     setFeedbackshow(false)
     setRatingShow(false)
     setAbtshow(false) }}>
        <ListItemIcon>
          <ThumbUpOutlined />
        </ListItemIcon>
        <ListItemText primary="Testimonials" />
       
      </ListItemButton>
      <ListItemButton className="list-item  mt-1 mb-1"  onClick={()=>{
        setServiceopen(!serviceopen)
      }}>
        <ListItemIcon >
          <SettingsOutlined />
        </ListItemIcon>
        <ListItemText primary="Service" />
        {serviceopen ?  <ExpandLess />:<ExpandMore/>}
      </ListItemButton>
      <Collapse in={serviceopen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
        
          <ListItemButton className="list-item  mt-1 mb-1"  sx={{ pl: 4 }} onClick={()=>{ setTrainshow(true)
           setTestishow(false)
           setDashshow(false)
           setNotishow(false)
           setOurteamshow(false)
           setContactshow(false)
           setAbtshow(false)
           setUsershow(false)
           setAbttableshow(false) 
           setInvestshow(false)
           setRatingShow(false)
           setAnalytics(false)
           setFeedbackshow(false)
           setClientshow(false)
           setFormatshow(false)
           setBusishow(false) }}>
            <ListItemIcon>
              <SettingsOutlined />
            </ListItemIcon>
            <ListItemText primary="Training" />
           
          </ListItemButton>
          <ListItemButton className="list-item  mt-1 mb-1"  sx={{ pl: 4 }} onClick={()=>{ setInvestshow(true) 
            setTestishow(false)
            setDashshow(false)
            setClientshow(false)
            setNotishow(false)
            setContactshow(false)
            setAbtshow(false)
            setTrainshow(false)
            setRatingShow(false)
            setFormatshow(false)
            setAnalytics(false)
            setFeedbackshow(false)
            setUsershow(false)
            setBusishow(false)}}>
            <ListItemIcon>
              <SettingsOutlined />
            </ListItemIcon>
            <ListItemText primary="Investment" />
           
          </ListItemButton>
          <ListItemButton className="list-item  mt-1 mb-1"  sx={{ pl: 4 }} onClick={()=>{ setFormatshow(true) 
            setTestishow(false)
            setDashshow(false)
            setNotishow(false)
            setClientshow(false)
            setContactshow(false)
            setUsershow(false)
            setAbtshow(false)
            setAnalytics(false)
            setInvestshow(false)
            setRatingShow(false)
            setTrainshow(false)
            setBusishow(false)}}>
            <ListItemIcon>
              <SettingsOutlined />
            </ListItemIcon>
            <ListItemText primary="Formative" />
           
          </ListItemButton>
          <ListItemButton className="list-item  mt-1 mb-1"  sx={{ pl: 4 }} onClick={()=>{ setBusishow(true) 
            setTestishow(false)
            setClientshow(false)
            setDashshow(false)
            setNotishow(false)
            setContactshow(false)
            setAbtshow(false)
            setOurteamshow(false)
            setInvestshow(false)
            setFeedbackshow(false)
            setRatingShow(false)
            setUsershow(false)
            setAnalytics(false)
            setFormatshow(false)
            setTrainshow(false)}}>
            
            <ListItemIcon>
              <SettingsOutlined />
            </ListItemIcon>
            <ListItemText primary="Business" />
           
          </ListItemButton>
        </List>
        <Divider/>
      </Collapse>
      <ListItemButton className="list-item  mt-1 mb-1"  onClick={()=>{ setContactshow(true)
        setTestishow(false)
        setClientshow(false)
        setDashshow(false)
        setNotishow(false)
        setOurteamshow(false)
        setRatingShow(false)
        setAbtshow(false)
        setAbttableshow(false) 
        setAbtshow(false)
        setInvestshow(false)
        setFormatshow(false)
        setUsershow(false)
        setAnalytics(false)
        setBusishow(false)
        setTrainshow(false)}}> 
        <ListItemIcon>
          <EmailOutlined />
        </ListItemIcon>
        <ListItemText primary="Contact Us" />
        
      </ListItemButton>
      <ListItemButton className="list-item  mt-1 mb-1"  onClick={()=>{ setOurteamshow(true)
        setTestishow(false)
        setClientshow(false)
        setDashshow(false)
        setNotishow(false)
        setContactshow(false)
        setAbttableshow(false) 
        setAbtshow(false)
        setInvestshow(false)
        setRatingShow(false)
        setFormatshow(false)
        setAnalytics(false)
        setUsershow(false)
        setBusishow(false)
        setFeedbackshow(false)
        setTrainshow(false)}}>
        <ListItemIcon>
          <PersonAddOutlined/>
        </ListItemIcon>
        <ListItemText primary="Our Team" />
      </ListItemButton>
      <ListItemButton className="list-item  mt-1 mb-1"  onClick={()=>{ setClientshow(true)
        setTestishow(false)
        setOurteamshow(false)
        setDashshow(false)
        setNotishow(false)
        setContactshow(false)
        setAbttableshow(false) 
        setAbtshow(false)
        setInvestshow(false)
        setFormatshow(false)
        setRatingShow(false)
        setAnalytics(false)
        setUsershow(false)
        setBusishow(false)
        setFeedbackshow(false)
        setTrainshow(false)}}>
        <ListItemIcon>
          <PersonAddOutlined/>
        </ListItemIcon>
        <ListItemText primary="Our Clients" />
      </ListItemButton>
      <ListItemButton  className="list-item  mt-1 mb-1"   onClick={()=>{ setNotishow(true)
        setTestishow(false)
        setDashshow(false)
        setClientshow(false)
        setOurteamshow(false)
        setContactshow(false)
        setAbttableshow(false) 
        setAbtshow(false)
        setInvestshow(false)
        setFormatshow(false)
        setBusishow(false)
        setFeedbackshow(false)
        setRatingShow(false)
        setAnalytics(false)
        setUsershow(false)
        setTrainshow(false)}}>
        <ListItemIcon>
          <NotificationAdd />
        </ListItemIcon>
        <ListItemText primary="Notification" />
      </ListItemButton>
      <ListItemButton className="list-item  mt-1 mb-1"  onClick={()=>{ setFeedbackshow(true)
        setTestishow(false)
        setDashshow(false)
        setNotishow(false)
        setAbttableshow(false) 
        setClientshow(false)
        setOurteamshow(false)
        setContactshow(false)
        setAbtshow(false)
        setInvestshow(false)
        setRatingShow(false)
        setFormatshow(false)
        setBusishow(false)
        setUsershow(false)
        setAnalytics(false)
        setTrainshow(false)}}>
        <ListItemIcon>
          <EmailOutlined />
        </ListItemIcon>
        <ListItemText primary="Feedback" />
      </ListItemButton>
      <ListItemButton className="list-item  mt-1 mb-1"  onClick={()=>{ setAnalytics(true)
        setTestishow(false)
        setDashshow(false)
        setClientshow(false)
        setUsershow(false)
        setFeedbackshow(false)
        setAbttableshow(false) 
        setOurteamshow(false)
        setContactshow(false)
        setAbtshow(false)
       setRatingShow(false)
        setNotishow(false)
        setInvestshow(false)
        setFormatshow(false)
        setBusishow(false)
        setTrainshow(false)}}>
        <ListItemIcon>
          <Google />
        </ListItemIcon>
        <ListItemText primary="Analytics" />
      </ListItemButton>
      <ListItemButton className="list-item  mt-1 mb-1" onClick={()=>{ 
        setUsershow(false) 
      setAbttableshow(false)
     setOurteamshow(false)
     setClientshow(false)
     setDashshow(false)
     setAnalytics(false)
     setRatingShow(true)
     setNotishow(false)
     setTrainshow(false)
     setInvestshow(false)
     setFormatshow(false)
     setBusishow(false)
     setFeedbackshow(false)
     setAbtshow(false) }}>
        <ListItemIcon>
          <Person />
        </ListItemIcon>
        <ListItemText primary="Rating" />
       
      </ListItemButton>
      <ListItemButton className="list-item  mt-1 mb-1" onClick={()=>{ setUsershow(true) 
      setAbttableshow(false)
     setOurteamshow(false)
     setClientshow(false)
     setDashshow(false)
     setAnalytics(false)
     setRatingShow(false)
     setNotishow(false)
     setTrainshow(false)
     setInvestshow(false)
     setFormatshow(false)
     setBusishow(false)
     setFeedbackshow(false)
     setAbtshow(false) }}>
        <ListItemIcon>
          <Person />
        </ListItemIcon>
        <ListItemText primary="Users" />
       
      </ListItemButton>
      <ListItemButton className="list-item mt-1 mb-1"  onClick={()=>{
        localStorage.removeItem(['accessToken'])
        navigate('/login')
      }}>
        <ListItemIcon>
        <LogoutOutlined/>
        </ListItemIcon>
        <ListItemText>Log out</ListItemText>
      </ListItemButton>
     
    </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
      
        {show ?   <Card sx={{ maxWidth: 210 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
      testimonials
        </Typography>
        <Typography variant="h5" component="div">
          be{bull}nev{bull}o{bull}lent
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
        testimonials
        </Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>: null}
    {investshow ?
    <div className="investment">
     <Investment/>
    
    </div>
    : null}
    {formatshow ? 
    <div className="formative">
    <Formative/>
    </div>
    : null}
    {busishow ?
    <div className="bussiness">
       <Business/>
    </div>
    : null}
      {trainshow ?
    <div className="training">
    <Training/>
    </div>
    : null}
    {testishow ?
    <div className="testimonials">
     <Testimonialsdash/>
    </div>
     : null}
       {abtshow ? 
    <div className="aboutus">
   <AboutForm/>
    </div>
     : null}
    {contactshow ? 
    <div className="contactus">
      <Contactus/>
    </div>
    :null}
     {abttableshow ? 
    <div className="AboutusTable">
      <Aboutustable/>
    </div>
    :null}
      {ourteamshow ? 
    <div className="contactus">
   <Ourteam/>
    </div>
    :null}
      {feedbackshow ? 
    <div className="contactus">
   <Feedback/>
    </div>
    :null}
      {notishow ? 
    <div className="notification">
   <Notification/>
    </div>
    :null}
       {analytics ? 
    <div className="analytics">
   <GAnalytics/>
    </div>
    :null}
    {dashshow ? 
    <div className="analytics">
   <DashboardContainer/>
    </div>
    :null}
     {usershow ? 
    <div className="users">
   <User/>
    </div>
    :null}
     {clientsshow ? 
    <div className="users">
   <Clients/>
    </div>
    :null}
    {ratingShow?<Rating/>:''}
      </Box>
    </Box>
    </>
}
export default Dashboard;