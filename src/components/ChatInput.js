import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import { db, auth } from '../firebase';
import firebase from 'firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useSelector } from 'react-redux';
import { selectDirectName } from '../features/appSlice';   //redux store
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'

function ChatInput({ channelName, channelId, chatRef, query }) {   //query is  for name of group or direct msg
    const [input, setInput] = useState('');        // storing value of input                   
    const [user] = useAuthState(auth);

    const directName = useSelector(selectDirectName);           //getting name from state
    // console.log('direct name', directName)

    const [owner] = useCollection(db.collection(directName))     //who is logged in it will display theirs contacts
    // console.log('owner', owner?.docs[0].data().contact);
    const select = owner?.docs.filter((doc) => {                 //will get particular users message
        return doc.data().contact === query
    })

    const sendMessage = (e) => {
        e.preventDefault();

        if (!channelId) {                                        // if no channel id msg will not get stored in db
            return false;
        }

        db.collection(query).doc(channelId).collection('message').add({  //db collection stores the msg with all user details 
            message: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            user: user.displayName,
            userImage: user.photoURL,
        })

        if (query !== 'rooms') {
            db.collection(directName).doc(select[0]?.id).collection('message').add({       //for updating chat of direct msg
                message: input,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                user: user.displayName,
                userImage: user.photoURL,
            })
        }

        chatRef.current.scrollIntoView({                   //for scrolling sidebar
            behaviour: 'smooth',
        });
        setInput('')
    }

    const addEmoji = (e) => {
        let emoji = e.native
        // console.log(emoji);
        setInput(emoji + input)
    }
    
    return (
        <ChatInputContainer>
            <form>
                {/* updates input box */}
                {/* used to handle users input in real-time */}
                <input value={input} onChange={(e) => setInput(e.target.value)} placeholder={`Message ${channelName}`} />
                <Button hidden type='submit' onClick={sendMessage}>
                    SEND
                </Button>
                <Emoji>
                <Picker onSelect={addEmoji} />
                </Emoji>   
            </form>
        </ChatInputContainer>
    );
}

export default ChatInput;

const Emoji = styled.div`
margin-left:850px;
`;

const ChatInputContainer = styled.div`
border-radius: 20px;

> form {
    position: relative;
    display: flex;
    justify-content: center;
}

> form > input {
    position: fixed;
    bottom: 30px;
    width: 60%;
    border: 1px solid gray;
    border-radius: 3px;
    padding: 20px;
    outline: none;
}

 > form > button {
        display: none !important;
    }
`;