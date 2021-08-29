import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Avatar from "@material-ui/core/Avatar";
import {useDispatch, useSelector} from "react-redux";
import {IRootState} from "../../redux/configureStore";
import {EDIT_USER_PHOTO, GET_USER_PHOTO, LOG_OUT} from "../../redux/constants";
import history from "../history";
import logoutImg from '../../img/logout.png'
import changePhotoImg from '../../img/open-folder.png'
import './LeftPanel.css'
import {IconButton} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import LeftPanelDialog from "../DialogLeftPanel/DialogLeftPanel";

const useStyles = makeStyles((theme) => ({
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
        backgroundPosition: '0px 50%'
    },
    changePhoto: {
        margin: '8%',
        width: '20px',
        height: '20px',
        backgroundImage: `url(${changePhotoImg})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '0px 50%'
    },
    menuButton: {
        marginRight: theme.spacing(2),
        marginBottom: theme.spacing(1.5),
    },


}));


export default function LeftPanel() {
    const classes = useStyles();
    const [state, setState] = React.useState(false);
    let profile = useSelector((x: IRootState) => x.auth)
    const dispatch = useDispatch()

    const logOut = () => {
        let token: string = ''
        localStorage.clear()
        dispatch({type: LOG_OUT, token})
        history.push("/")
    }

    useEffect(() => {
        dispatch({type: GET_USER_PHOTO, payload: ""})
    }, [])// eslint-disable-line react-hooks/exhaustive-deps

    const imageHandler = (target: any) => {
        let reader = new FileReader();

        reader.onload = (e: any) => {
            dispatch({type: EDIT_USER_PHOTO, payload: {photo: e.target.result, id: profile.id}})
        };

        if (target.target.files[0]) {
            reader.readAsDataURL(target.target.files[0])
        }
    }

    const toggleDrawer = (open: boolean) => (
        event: React.KeyboardEvent | React.MouseEvent) => {
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
                    alt={`${profile.name}`}
                    src={profile.photo}
                />
                <h3>{profile.name}</h3>
            </div>
            <div className={classes.logoutContainer}>
                <div className={classes.changePhoto}/>
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
            <div hidden={!Boolean(profile.token)} className={classes.logoutContainer}>
                <div className={classes.logoutImg} />
                <Button onClick={logOut} style={{width: '180px'}} variant="outlined" color="primary">
                    Log Out
                </Button>
            </div>
        </div>
    );

    return (
        <div>
            <React.Fragment key={'left'}>
                <IconButton onClick={toggleDrawer(!state)} edge="start" className={classes.menuButton} color="inherit"
                            aria-label="menu">
                    <MenuIcon/>
                </IconButton>
                <Drawer anchor={'left'} open={state} onClose={toggleDrawer(!state)}>
                    {list()}
                    <LeftPanelDialog/>
                </Drawer>
               
            </React.Fragment>
        </div>
    );
}