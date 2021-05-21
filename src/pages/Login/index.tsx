import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonImg, IonInput, IonItem, IonLabel, IonLoading, IonPage, IonSpinner, IonTitle, IonToolbar } from '@ionic/react';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import ExploreContainer from '../../components/ExploreContainer';
import './style.css';
import {loginUser} from '../../firebaseConfig'
import { toast } from '../../toast';
import { Route } from 'workbox-routing';
import { render } from '@testing-library/react';
import { setUserState } from '../../redux/action';
import { useDispatch } from 'react-redux';



const Login: React.FC = () => {
  
  const [busy, setBusy] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('') 
  const dispatch = useDispatch()
  const history = useHistory()
  
  async function login(){
    console.log(username, password)
    setBusy(true)
    const res = await loginUser(username, password)
    console.log(res)
    if (res){
      console.log(res)
      dispatch(setUserState(res.user?.email))
      // dispatch(setUserState(res.user.email))
      history.replace('/dashboard')
      toast('You have logged in!')
      
    }
    setBusy(false)
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton  color="light"></IonBackButton>
          </IonButtons>
          <IonTitle>Log In</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonLoading message = "Logging In..." duration={0} isOpen={busy}></IonLoading>
      <IonContent className="ion-padding">
        <IonItem className="item-input">
          <IonLabel position="stacked" padding-bottom color="medium">EMAIL</IonLabel>
          <IonInput type="email" placeholder="Username:" onIonChange={(e:any) => setUsername(e.target.value)}/>
        </IonItem>
        <br></br>
        <IonItem >
          <IonLabel position="stacked" padding-bottom color="medium">PASSWORD</IonLabel>
          <IonInput type="password" placeholder="Password:"onIonChange={(e:any) => setPassword(e.target.value)}/>      
        </IonItem>    

        <IonButton expand="full" type="submit"  className="submit-button ion-padding" padding-vertical onClick={login}>Log In
    {/* <span >
      <IonSpinner name="lines"></IonSpinner>
    </span> */}
        </IonButton>
        <br></br>
        <p>New here? <Link to="/register">Register</Link></p>

      </IonContent>


      

    </IonPage>
  );
};

export default Login;
