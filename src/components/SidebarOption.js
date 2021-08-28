import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { enterRoom, enterName } from '../features/appSlice';
import { db } from '../firebase';

function SidebarOptions({ Icon, title, addChannelOption, id, addDirectMessage }) {           

    const dispatch = useDispatch();                   //doing dispatch to the redux store

    const addChannel = () => {
        const channelName = prompt('Please enter the channel name');       // provides a prompt to add channel
        if (channelName) {
            db.collection('rooms').add({
                name: channelName,
            })
        }
    }
 
    const selectChannel = () => {                                              //allows you to select a channel
        if (id) {
            dispatch(enterRoom({
                roomId: id
            }))
        }
        if (title) {                                         
            dispatch(enterName({
                directName: title,
            }))
        }

    }

    const addDirect = () => {                                              //provides a prompt to enter email of contact
        const user = addDirectMessage
        const directName = prompt('Enter email-id for direct message');
        // console.log('value', directName)
        if (directName) {
            db.collection(user).add({
                contact: directName,
            })
        }
    }

    return (
        <SidebarOptionContainer
            onClick={addChannelOption ? addChannel : addDirectMessage ? addDirect : selectChannel}
        >
            {Icon && <Icon fontSize='small' style={{ padding: 10 }} />}
            {Icon ? (<h3>{title}</h3>) : (
                <SidebarOptionChannel>
                    <span>#</span>{title}
                </SidebarOptionChannel>)}
        </SidebarOptionContainer>
    );
}

export default SidebarOptions;

const SidebarOptionContainer = styled.div`
display: flex;
font-size: 12px;
align-items: center;
padding-left: 2px;
cursor: pointer;
:hover {
    opacity: 0.9;
    background-color: #340e36;
}

>h3 > span {
    padding: 15px;
}
`;

const SidebarOptionChannel = styled.h3`
padding: 10px 0;
font-weight: 300;
`;

