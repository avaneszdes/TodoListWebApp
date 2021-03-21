import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Avatar from "@material-ui/core/Avatar";
import {useDispatch, useSelector} from "react-redux";
import {IRootState} from "../../redux/configureStore";
import {EDIT_USER_PHOTO, LOG_OUT} from "../../redux/constants";
import history from "../history";
import logoutImg from '../../img/logout.png'
import changePhotoImg from '../../img/open-folder.png'
import './LeftPanel.css'

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    avatar: {
        height: '100px',
        width: '100px',

    },
    profile: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        marginTop: '10px',
    },
    logoutContainer: {
        display: 'flex',
        justifyContent: 'spaceBetween',
        alignItems: 'center',
    },
    logoutImg: {
        margin: '8%',
        width: '20px',
        height: '20px',
        backgroundImage: `url(${logoutImg})`,
        backgroundRepeat: 'no-repeat',
    },
    changePhoto: {
        margin: '8%',
        width: '20px',
        height: '20px',
        backgroundImage: `url(${changePhotoImg})`,
        backgroundRepeat: 'no-repeat',
    }

});


export default function LeftPanel() {
    const classes = useStyles();
    const [state, setState] = React.useState(false);
    const profile = useSelector((x: IRootState) => x.auth)
    const dispatch = useDispatch()

    const logOut = () => {
        let token: string = ''
        localStorage.clear()
        dispatch({type: LOG_OUT, token})
        history.push("/")
    }

    const imageHandler = (target: any) => {
        let reader = new FileReader();

        reader.onload = (e: any) => {

            console.log(e.target.result, profile.id)
            dispatch({type: EDIT_USER_PHOTO, payload: {photo: e.target.result, id: profile.id}})
        };

        if (target.target.files[0]) {
            reader.readAsDataURL(target.target.files[0])
        }
    }

    const toggleDrawer = (open: boolean) => (
        event: React.KeyboardEvent | React.MouseEvent,
    ) => {
        if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }

        setState(open);
    };

    const list = () => (
        <div
            style={{width: '250px'}}
            role="presentation"
            onClick={toggleDrawer(true)}
            onKeyDown={toggleDrawer(false)}
        >
            <div className={classes.profile}>
                <Avatar
                    className={classes.avatar}
                    alt={`Avatar n°${profile.name}`}
                    src={profile.photo}
                />
                <h3>{profile.name}</h3>
            </div>
            <div className={classes.logoutContainer}>
                <div className={classes.changePhoto} style={{backgroundPosition: '0px 50%'}}/>
                <div className='change-photo_wrapper'>
                        <label className="custom-file-upload">
                        Change photo <input
                        accept="image/*"
                        onChange={imageHandler}
                        type="file"
                    />
                    </label>
                </div>


            </div>
            <Divider/>
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}</ListItemIcon>
                        <ListItemText primary={text}/>
                    </ListItem>
                ))}
            </List>
            <Divider/>
            <div hidden={!Boolean(profile.token)} className={classes.logoutContainer}>
                <div className={classes.logoutImg} style={{backgroundPosition: '0px 50%'}}/>
                <Button onClick={logOut} style={{width: '180px'}} variant="outlined" color="primary">
                    Log Out
                </Button>

            </div>
        </div>
    );

    return (
        <div>
            <React.Fragment key={'left'}>
                <Button onClick={toggleDrawer(!state)}>menu</Button>
                <Drawer anchor={'left'} open={state} onClose={toggleDrawer(!state)}>
                    {list()}
                </Drawer>
            </React.Fragment>
        </div>
    );
}