import { IonButton, IonContent, IonHeader, IonInput, IonPage, IonTitle, IonToolbar, IonLoading, IonBackButton, IonButtons } from '@ionic/react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ExploreContainer from '../../components/ExploreContainer';
import { toast } from '../../toast';
import './style.css';
import {registerUser} from '../../firebaseConfig'
import NGO_Register from '../Register/ngo_reg'

const Register: React.FC = () => {
  // const [busy, setBusy] = useState<boolean>(false)

  // const [username, setUsername] = useState('')
  // const [password, setPassword] = useState('') 
  // const [cpassword, setCPassword] = useState('') 
  
  // async function register(){
  //   setBusy(true)
  //   console.log(username, password, cpassword)
  //   if(password !== cpassword){
  //     toast('Passwords do not Match!!', 4000)
  //   }
  //   if(username.trim() === '' || password.trim() === ''){
  //     toast('Username and Password both are required!!')
  //   }
  //   if(password === cpassword){
  //     const res = await registerUser(username, password)
  //     if(res){
  //       toast('Registeration Successful')
  //     }
  //     if (!res){
  //       toast('Please Try again..')
  //     }
  //     setBusy(false)
  
  //   }
  // }

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
        <IonButton size="large"> <Link to="/ngo_reg" className="linktxt">NGO</Link></IonButton>
        <br></br>
        <IonButton size="large"> <Link to="/vol_reg" className="linktxt">Volunteer</Link> </IonButton>
        {/* <ExploreContainer /> */}
        <p>Already have an Account? <Link to="/login">Login</Link></p>
      </IonContent>
    </IonPage>
  );
};

export default Register;
