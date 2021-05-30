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
  
//   const [busy, setBusy] = useState(false)
//   const [username, setUsername] = useState('')
//   const [password, setPassword] = useState('') 
//   const dispatch = useDispatch()
//   const history = useHistory()
  
//   async function login(){
//     console.log(username, password)
//     setBusy(true)
//     const res = await loginUser(username, password)
//     console.log(res)
//     if (res){
//       console.log(res)
//       dispatch(setUserState(res.user?.email))
//       // dispatch(setUserState(res.user.email))
//       history.replace('/dashboard')
//       toast('You have logged in!')
      
//     }
//     setBusy(false)
//   }

  return (
    <IonPage>
      <IonHeader>
        
        <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref="home" />
        </IonButtons>
          <IonTitle className="logo">Connect 4 Good</IonTitle>
        </IonToolbar>
      </IonHeader>
      {/* <IonLoading message="Registering.." duration={0} isOpen={busy}></IonLoading> */}

      <IonContent className="ion-padding ion-text-center">
        <h1> I'm a </h1>
        <IonButton size="large"> <Link to="/ngo_login" className="linktxt">NGO</Link></IonButton>
        <br></br>
        <IonButton size="large"> <Link to="/vol_login" className="linktxt">Volunteer</Link> </IonButton>
        {/* <ExploreContainer /> */}
        <br></br>
        <p>New here? <Link to="/register">Register</Link></p>
      </IonContent>
    </IonPage>
  );

};

export default Login;
