import { IonDatetime, IonButton, IonContent, IonHeader, IonInput, IonPage, IonTitle, IonToolbar, IonLoading, IonButtons, IonBackButton, IonItem, IonLabel } from '@ionic/react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ExploreContainer from '../../components/ExploreContainer';
import { toast } from '../../toast';
import './style.css';
import {registerUser} from '../../firebaseConfig'
const Volunteer_Register: React.FC = () => {
  const flag = "volunteer"
  const [busy, setBusy] = useState<boolean>(false)
  const [fname, setfname] = useState('')
  const [lname, setlname] = useState('')
  const [interests, setUserinterests] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('') 
  const [cpassword, setCPassword] = useState('') 
  
  async function register(){
    setBusy(true)
    console.log(username, password, cpassword)
    if(password !== cpassword){
      toast('Passwords do not Match!!', 4000)
    }
    if(username.trim() === '' || password.trim() === ''){
      toast('Username and Password both are required!!')
    }
    if(password === cpassword){
      const data = {
        fname: fname,
        lname : lname,
        username: username,
        interests:interests 
      }
      const res = await registerUser(flag, username, password, data)
      if(res){
        toast('Registeration Successful')
      }
      if (!res){
        toast('Please Try again..')
      }
      setBusy(false)
  
    }
  }

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
      <IonLoading message="Registering.." duration={0} isOpen={busy}></IonLoading>

      <IonContent className="ion-padding ion-text-center">
        <IonInput placeholder="First Name:" onIonChange={(e:any) => setlname(e.target.value)}/>
        <IonInput placeholder="Last Name:" onIonChange={(e:any) => setfname(e.target.value)}/>
        <IonInput placeholder="Username:" onIonChange={(e:any) => setUsername(e.target.value)}/>
        <IonInput type="password" placeholder="Password:"onIonChange={(e:any) => setPassword(e.target.value)}/>
        <IonInput type="password" placeholder="Confirm Password:"onIonChange={(e:any) => setCPassword(e.target.value)}/>
        <IonItem>
        <IonLabel>Date of Birth</IonLabel>
          <IonDatetime value="1990-02-19" placeholder="Select Date"></IonDatetime>
        </IonItem>
        <IonButton onClick={register}>Register</IonButton>
        {/* <ExploreContainer /> */}
        <p>Already have an Account? <Link to="/login">Login</Link></p>
      </IonContent>
    </IonPage>
  );
};

export default Volunteer_Register;
