import { IonButton, IonContent, IonHeader, IonLoading, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../../components/ExploreContainer';
import './style.css';
import {displayCurrentUser} from '../../firebaseConfig'
import { useSelector } from 'react-redux';
import {logoutUser} from '../../firebaseConfig'
import { useHistory } from 'react-router';
import { useState } from 'react';
import names from '../../wordlist'
import './style.css'


const Dashboard: React.FC = () => {
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
        
        
        <p>Hi, {username}  <br></br>Welcome to Dashboard</p>
        {/* <ExploreContainer /> */}
        

        {names.map(name => (
          <span className="names">{name}</span>
        ))}

        <IonButton onClick={logout}> Logout</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
