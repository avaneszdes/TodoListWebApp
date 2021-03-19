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
import {useSelector} from "react-redux";
import {IRootState} from "../../redux/configureStore";

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    avatar:{    
        height: '80px',
        width: '80px',
        margin: '5px'
    },
    profile:{
        display: 'flex',
        alignItems: 'center',
    }
});


export default function LeftPanel() {
    const classes = useStyles();
    const [state, setState] = React.useState(false);
    const profile = useSelector((x:IRootState) => x.auth)
    
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
                    alt={`Avatar n°${1}`}
                    src={`/static/images/avatar/${1}.jpg`}
                />
                
                <h3 style={{marginLeft: '15px' }}>{profile.name}</h3>
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