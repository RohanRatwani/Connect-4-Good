import { IonButton, IonContent, IonHeader, IonInput, IonPage, IonTitle, IonToolbar, IonLoading, IonBackButton, IonButtons } from '@ionic/react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ExploreContainer from '../../components/ExploreContainer';
import { toast } from '../../toast';
import './style.css';
import {registerUser} from '../../firebaseConfig'
const NGO_Register: React.FC = () => {
  const [busy, setBusy] = useState<boolean>(false)
  const flag = "ngo"
  const [ngo_name, setngoname] = useState('')
  const [contact, setContact] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
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
        ngo_name: ngo_name,
        username: username,
        contact: contact,
        address: address,
        city:city,
        state: state
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
        <IonInput placeholder="NGO name:" onIonChange={(e:any) => setngoname(e.target.value)}/>
        <IonInput placeholder="Username:" onIonChange={(e:any) => setUsername(e.target.value)}/>
        <IonInput type="password" placeholder="Password:"onIonChange={(e:any) => setPassword(e.target.value)}/>
        <IonInput type="password" placeholder="Confirm Password:"onIonChange={(e:any) => setCPassword(e.target.value)}/>
        <IonInput placeholder="Contact Number"onIonChange={(e:any) => setContact(e.target.value)}/>
        <IonInput placeholder="Please enter address"onIonChange={(e:any) => setAddress(e.target.value)}/>
        <IonInput placeholder="City"onIonChange={(e:any) => setCity(e.target.value)}/>
        <IonInput placeholder="State"onIonChange={(e:any) => setState(e.target.value)}/>
        
        
        <IonButton onClick={register}>Register</IonButton>
        {/* <ExploreContainer /> */}
        <p>Already have an Account? <Link to="/login">Login</Link></p>
      </IonContent>
    </IonPage>
  );
};

export default NGO_Register;
