import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
import Header from './components/Header';
import styled from 'styled-components';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import Login from './components/Login';
import Spinner from 'react-spinkit';

function App() {

  const [user, loading] = useAuthState(auth);

  if (loading) {                                // if user not logged in it will show auth page
    return ( 
      <AppLoading>
        <AppLoadingContents>
          <img
            src='https://yt3.ggpht.com/ytc/AKedOLS2OOXtmIHu0Tf1TmWITVrHNktn-MVXK3XRjwf4YA=s900-c-k-c0x00ffffff-no-rj'
            alt='slack logo' />
          <Spinner
            name='ball-spin-fade-loader'
            color='purple'
            fadeIn='none'
          />
        </AppLoadingContents>
      </AppLoading>
    )
  }

  return (
    <div className="app">
      <Router>
        {/* if user is logged in it will show slack page  */}
        {!user ? (<Login />) : (
          <>
            <Header />
            <AppBody>
              <Sidebar />
              <Switch>
                <Route path="/" exact>
                  <Chat />
                </Route>
              </Switch>
            </AppBody>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;

const AppLoading = styled.div`
display: grid;
place-items: center;
height: 100vh;
width: 100%;
`;

const AppLoadingContents = styled.div`
text-align: center;
padding-bottom: 100px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;

> img {
  height: 100px;
  padding: 20px;
  margin-bottom: 40px;
}
`;

const AppBody = styled.div`
display: flex;
height: 100vh;
`;
