import { IonButton, IonContent,IonCard, IonHeader, IonLoading, IonPage, IonTitle, IonToolbar, IonItem, IonIcon, IonCardContent, IonLabel, IonList } from '@ionic/react';
import { pin, wifi, wine, warning, walk } from 'ionicons/icons';
import ExploreContainer from '../../components/ExploreContainer';
import './style.css';
import {displayCurrentUser} from '../../firebaseConfig'
import { useSelector } from 'react-redux';
import {logoutUser} from '../../firebaseConfig'
import { useHistory, useParams } from 'react-router';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import names from '../../wordlist'
import './style.css'
import { render } from 'react-dom';
import Vol_Dashboard from './index';

const ViewNgo: React.FC = (props) => {
  const history = useHistory()
  const final = []
  const ngodetails = JSON.stringify(props)
  const items = JSON.parse(ngodetails).location.state
  
  // const data  = useParams();
  console.log("inside view")
  console.log(items,"INSIDE_VIEW")

if(items){
  final.push(
      <IonList>
        <IonItem>
        <IonLabel>
          Ngo Name: {items.ngo_name}
        </IonLabel>
      </IonItem>

      <IonItem>
        <IonLabel>
          Username: {items.username}
        </IonLabel>
      </IonItem>


      <IonItem>
        <IonLabel>
          Cause: {items.cause}
        </IonLabel>
      </IonItem>


      <IonItem>
        <IonLabel>
          Contact: {items.contact}
        </IonLabel>
      </IonItem>

      <IonItem>
        <IonLabel>
          Address: {items.address}, {items.city}, {items.state}, {items.zip}
        </IonLabel>
      </IonItem>

      <IonItem>
        <IonLabel>
          Available Days: 
        </IonLabel>
      </IonItem>

      <IonItem>
        <IonLabel>
          Available Time:
        </IonLabel>
      </IonItem>
    </IonList>
  )
}

  function ngo_home(){
    history.replace('/vol_dashboard')
  }


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Dashboard</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {/* <IonLoading message= "Logging Out.." duration={0} /> */}
        
        
        <p>Hi,  <br></br>Welcome to View NGO Dashboard</p>
        {/* <ExploreContainer /> */}

        {final}

        
        {/* {names.map(name => (
          <span className="names">{name}</span>
        ))} */}

        <IonButton onClick={ngo_home}> Home</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default ViewNgo;
