import React, { useState, useEffect, useCallback, useRef } from 'react';
import Niv from '../components/Niv';
// import axios from 'axios';
// import {
//   Avatar,
//   Grid,
//   Badge,
//   Box,
//   List,
//   ListItem,
//   ListItemText,
//   TextField,
//   Button,
//   Divider,
//   AppBar,
//   Toolbar,
//   IconButton,
//   Typography,
//   Paper,
// } from "@mui/material";
// import { HiReply } from "react-icons/hi";
// import styled from 'styled-components';
// import CircularProgress from '@mui/material/CircularProgress';



// const MessageWrapper = styled(Box)(({ isSentByCurrentUser }) => ({
//   display: 'flex',
//   flexDirection: isSentByCurrentUser ? 'row-reverse' : 'row',
//   alignItems: 'flex-end',
//   marginBottom: "16px",
// }));

// const MessageBubble = styled(Box)(({ isSentByCurrentUser }) => ({
//   maxWidth: '80%',
//   padding: "8px",
//   marginRight: isSentByCurrentUser ? "10px" : "0",
//   borderRadius: isSentByCurrentUser ? '20px 20px 0 20px' : '20px 20px 20px 0',
//   backgroundColor: isSentByCurrentUser ? '#0084ff' : '#f0f0f0',
//   color: isSentByCurrentUser ? '#fff' : '#333',
//   alignSelf: isSentByCurrentUser ? 'flex-end' : 'flex-start',
//   wordWrap: 'break-word',
//   boxShadow: '0 1px 2px rgba(0,0,0,0.15)',
// }));

// const MessageHeader = styled(Box)(({ }) => ({
//   display: 'flex',
//   justifyContent: 'space-between',
//   alignItems: 'center',
//   marginBottom: "5px",
// }));

// const MessageSender = styled(Typography)(({ }) => ({
//   fontSize: '0.8rem',
//   fontWeight: 'bold',
//   marginRight: "8px",
// }));

// const MessageTime = styled(Typography)(({ }) => ({
//   fontSize: '0.7rem',
//   color: '#666',
// }));



const Chat = () => {

  // const [message, setmessage] = useState('');
  // const [selectedChat, setSelectedChat] = React.useState(null);
  // const [receiverId, setReceiverId] = useState(null);
  // const currentUser = '652a38dc4f301a0427f1e7e3'
  // const name = "You"

  // const chatContainerRef = useRef(null);

  // useEffect(() => {
  //   if (chatContainerRef.current) {
  //     chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  //   }
  // }, [selectedChat]);

  // const handleSelectChat = async (sender) => {
  //   console.log('selected chat:', sender);
  //   setSelectedChat(sender);
  //   setReceiverId(sender)

  //   console.log('current user:', currentUser);

  //   // Update the read status of all the messages where sender is `selectedChat` and receiver is the current user
  //   try {
  //     const response = await axios.put('http://localhost:8070/chat/update', {
  //       sender: selectedChat,
  //       reply: currentUser,
  //     });
  //     console.log('update response:', response.data);

  //     // Remove the dot for the selected chat
  //     setMessages((messages) =>
  //       messages.map((message) => {
  //         if (
  //           message.sender === selectedChat &&
  //           message.reply === currentUser &&
  //           !message.read
  //         ) {
  //           return { ...message, read: true };
  //         }
  //         return message;
  //       })
  //     );

  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const [messages, setMessages] = useState([]);

  // const fetchMessages = useCallback(() => {
  //   axios.get('http://localhost:8070/chat/')
  //     .then(res => {
  //       setMessages(res.data);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }, []);

  // useEffect(() => {
  //   fetchMessages();
  //   const interval = setInterval(fetchMessages, 20000); // request to server every 2 seconds
  //   return () => clearInterval(interval);
  // }, [fetchMessages]);

  // const [isSending, setIsSending] = useState(false);

  // const handleSubmit = (event) => {
  //   event.preventDefault();

  //   if (!message) {
  //     // If message is empty, do not send
  //     return;
  //   }

  //   setIsSending(true);

  //   const newMessage = {

  //     message: message,
  //     sender: currentUser,
  //     reply: receiverId,
  //     createdAt: new Date()
  //   };



  //   axios.post('http://localhost:8070/chat/', newMessage)
  //     .then(() => {
  //       //window.location.reload(false);
  //       setMessages((messages) => [...messages, newMessage]);
  //       setmessage('')
  //       setIsSending(false)
  //     }).catch(error => {
  //       console.log(error);
  //     });
  // };

  // const uniqueSenders = Array.from(
  //   new Set(
  //     messages
  //       .filter((m) => m.sender !== currentUser)
  //       .map((m) => m.sender)
  //   ));

  // const [senderNames, setSenderNames] = useState([]);

  // useEffect(() => {
  //   const fetchSenderNames = async () => {
  //     const names = await Promise.all(uniqueSenders.map(async (sender) => {
  //       try {
  //         const response = await fetch(`http://localhost:8070/supplier/${encodeURIComponent(sender)}`);
  //         if (response.ok) {
  //           const senderData = await response.json();
  //           return { id: sender, name: senderData.company };
  //         } else {
  //           // Handle case where user doesn't exist or request fails
  //           return { id: sender, name: "Davidsron" };
  //         }
  //       } catch (error) {
  //         console.log(error);
  //         // Handle error condition and set the name to "Unknown"
  //         return { id: sender, name: "Unknown" };
  //       }
  //     })
  //   );
  //     setSenderNames(names);
  //   };
  //   fetchSenderNames();
  // }, [uniqueSenders]);


  // const senderObjects = uniqueSenders.map((sender, index) => {
  //   const senderName = senderNames[index]?.name || '';
  //   const messagesForSender = messages.filter(
  //     (message) => (message.sender === sender && message.reply === currentUser) || (message.sender === currentUser && message.reply === sender)
  //   );
  //   const latestTimestamp = messagesForSender.reduce(
  //     (latestTimestamp, message) => {
  //       const messageTimestamp = new Date(message.createdAt).getTime();
  //       return messageTimestamp > latestTimestamp ? messageTimestamp : latestTimestamp;
  //     },
  //     0
  //   );
  //   return {
  //     id: sender,
  //     name: senderName,
  //     latestTimestamp: latestTimestamp,
  //   };
  // });

  // // Sorting the chat list
  // const sortedSenders = senderObjects.sort(
  //   (senderObjA, senderObjB) => senderObjB.latestTimestamp - senderObjA.latestTimestamp
  // );


  return (
    <div>
      <Niv name='Supplier Messages' />

      <div className='data'>

        {/* <Box sx={{
          flexGrow: 1,
          margin: "10px 30px 0 10px",
          backgroundColor: "#ffffff",
          padding: "20px",
          color: "#ffff",
          borderRadius: "20px",
        }}>


          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Box sx={{ height: "70vh", overflowY: "scroll" }}>
                <List>
                  {sortedSenders.map((senderObj) => (


                    <Paper variant="outlined"
                      key={senderObj.id}
                      square elevation={0}
                      sx={{
                        padding: "10px",
                        backgroundColor: selectedChat === senderObj.id ? "#506de0" : "#2f0048",
                        margin: "5px",
                        borderRadius: "10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",

                      }}

                      onClick={() => handleSelectChat(senderObj.id)}>
                      <ListItem key={senderObj.id}
                      >

                        <Avatar
                          alt={senderObj.name}
                          src="/static/images/avatar/1.jpg"
                          sx={{ width: 40, height: 40, marginRight: "10px" }}
                        />

                        <ListItemText primary={senderObj.name} sx={{ color: "#ffff" }} />

                        {messages.some(
                          (message) =>
                            message.sender === senderObj.id &&
                            message.reply === currentUser &&
                            !message.read
                        ) && selectedChat !== senderObj.id && (
                            <span style={{ color: "red" }}>●</span>
                          )}

                      </ListItem>
                    </Paper>
                  ))}
                </List>
              </Box>
            </Grid>
            <Grid item xs={8}>
              <Box ref={chatContainerRef} sx={{ height: "calc(70vh - 64px)", overflowY: "scroll" }}>
                {selectedChat && (

                  <div>
                    {messages.filter((m) => m.sender === selectedChat || m.reply === selectedChat)
                      .map((messages) => (
                        <>

                          <MessageWrapper
                            key={messages._id}
                            isSentByCurrentUser={messages.sender === currentUser}
                          >
                            <MessageBubble
                              isSentByCurrentUser={messages.sender === currentUser}
                            >
                              <MessageHeader>
                                <MessageSender></MessageSender>
                                <MessageTime>
                                  {new Date(messages.createdAt).toLocaleString()}
                                </MessageTime>
                              </MessageHeader>
                              {messages.message}
                            </MessageBubble>
                            <HiReply />
                          </MessageWrapper>
                        </>
                      ))}

                  </div>

                )}
              </Box>
              <Box sx={{ display: "flex", mt: 2, }}>
                <TextField
                  fullWidth
                  // placeholder={user.user._id}
                  variant="outlined"
                  label="Type your message here"
                  value={message}
                  onChange={(e) => setmessage(e.target.value)}
                  sx={{ mr: 2, }}
                  error={message.trim().length === 0 && isSending}
                  helperText={message.trim().length === 0 && isSending && "Message cannot be empty"}
                  disabled={!selectedChat}
                />
                <Button variant="contained"
                  onClick={handleSubmit}
                  sx={{ backgroundColor: "#2f0048" }}
                  disabled={message.trim().length === 0 || isSending}
                >
                  {isSending ? <CircularProgress size={24} /> : "Send"}
                </Button>
              </Box>
            </Grid>
          </Grid>



        </Box> */}




      </div>
    </div>
  );
};

export default Chat;