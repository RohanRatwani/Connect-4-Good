import { IonButton, IonContent,IonCard, IonHeader, IonLoading, IonPage, IonTitle, IonToolbar, IonItem, IonIcon, IonCardContent, IonLabel, IonMenu, IonList, IonNav, IonTab, IonTabsContext, IonTabBar } from '@ionic/react';
import { pin, wifi, wine, warning, walk } from 'ionicons/icons';
import ExploreContainer from '../../components/ExploreContainer';
import './style.css';
import {displayCurrentUser} from '../../firebaseConfig'
import { useSelector } from 'react-redux';
import {logoutUser, getngolist} from '../../firebaseConfig'
import { useHistory } from 'react-router';
import React, { useState } from 'react';
import names from '../../wordlist'
import './style.css'


const Vol_Dashboard: React.FC = () => {
  const [busy,setBusy] = useState(false)
  const username = useSelector((state:any) => state.user.username)
  const history = useHistory()
  async function logout(){
    setBusy(true)
    await logoutUser()
    setBusy(false)
    history.replace('/')
  }
  


  return (
    <IonPage>
      <IonHeader>
        
        <IonToolbar>
          <IonTitle>Dashboard</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonLoading message= "Logging Out.." duration={0} isOpen={busy}/>
        
        {/* <IonTab>
          <IonTabBar></IonTabBar>
        </IonTab> */}
        {/* <IonMenu side="start" contentId="main-content">

            <IonHeader>
            <IonToolbar>
              <IonTitle>Menu</IonTitle>
            </IonToolbar>
            </IonHeader>

            <IonContent>
              <IonList>
                <IonItem>
                  <IonIcon name="mail" slot="start"></IonIcon>
                  <IonLabel>Inbox</IonLabel>
                </IonItem>
              </IonList>
            </IonContent>

        </IonMenu>
         */}
        <p>Hi, {username}  <br></br>Welcome to Volunteer Dashboard</p>
        {/* <ExploreContainer /> */}
        
        <IonCard>
          <IonItem>
            <IonIcon icon={pin} slot="start" />
            <IonLabel>NGO 1 Name</IonLabel>
            <IonButton fill="outline" slot="end">View</IonButton>
          </IonItem>

          <IonCardContent>
            This is content, without any paragraph or header tags,
            within an ion-cardContent element.
          </IonCardContent>
        </IonCard>
        
        <IonCard>
          <IonItem>
            <IonIcon icon={pin} slot="start" />
            <IonLabel>NGO 2 Name</IonLabel>
            <IonButton fill="outline" slot="end">View</IonButton>
          </IonItem>

          <IonCardContent>
            This is content, without any paragraph or header tags,
            within an ion-cardContent element.
          </IonCardContent>
        </IonCard>
        {/* <p>{getngolist()}</p> */}
        {/* {names.map(name => (
          <span className="names">{name}</span>
        ))} */}

        <IonButton onClick={logout}> Logout</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Vol_Dashboard;