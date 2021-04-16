import React, { useEffect, useState } from 'react';
import './App.css';
import MyVideoGrid from './VideoGrid'
import {Meeting, User} from './context'
import Menu from './Menu';
import { ThemeProvider } from 'styled-components';
import { darkTheme, MeetingProvider } from 'amazon-chime-sdk-component-library-react';
import { AmplifyAuthenticator, withAuthenticator } from '@aws-amplify/ui-react';
import {onAuthUIStateChange } from '@aws-amplify/ui-components';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

function App (props){
  const [meeting, setMeeting] = useState('')
  const [userData, setUserData] = useState({_id:''})
  const [, setAuthState] = useState();

  async function uptadeState(data){
      if (data.Meeting){
        setMeeting(data.Meeting)
      }
    }

  useEffect(() => {
      return onAuthUIStateChange((nextAuthState, authData) => {
          setAuthState(nextAuthState);
          // console.log(authState)
      });
  }, []);

  useEffect(()=>{
    Auth.currentSession({
            bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
          }).then((data)=>{setUserData({_id: data.accessToken.payload.username})}).catch(err => console.log(err));
        },[userData._id])

  return (
      <div className="App">
       <AmplifyAuthenticator/>
       <ThemeProvider theme = {darkTheme}>
          <Meeting.Provider value = {meeting}>
            <User.Provider value = {userData}>
              
                <div className='App-content'>
                  <MeetingProvider>
                     <MyVideoGrid />
                     <Menu update={uptadeState}>{meeting.MeetingId}</Menu>
                  </MeetingProvider>
                  
                </div>
              
            </User.Provider> 
          </Meeting.Provider>
       </ThemeProvider>
      </div>

    ); 
}

export default withAuthenticator(App);

// function Title(){
//   const user = useContext(User)

//   // useEffect(()=>{
//   //   {console.log(user)}
//   //   document.title= `Hi, ${user.name}` 
//   // })
//   return <></>
// }