import { IonButton, IonContent,IonCard, IonHeader, IonLoading, IonPage, IonTitle, IonToolbar, IonItem, IonIcon, IonCardContent, IonLabel, IonList, IonInput, IonSelect, IonSelectOption } from '@ionic/react';
import { pin, wifi, wine, warning, walk } from 'ionicons/icons';
import ExploreContainer from '../../components/ExploreContainer';
import './style.css';
import {displayCurrentUser} from '../../firebaseConfig'
import { useSelector } from 'react-redux';
import {logoutUser, updateavailability} from '../../firebaseConfig'
import { useHistory } from 'react-router';
import React, { useEffect, useState } from 'react';
import names from '../../wordlist'
import './style.css'


const Dashboard: React.FC = () => {
  const [busy,setBusy] = useState(false)
  const username = useSelector((state:any) => state.user.username)

  const [days, setDays] = useState<string[]>([]);
  const [starttime, setStartTime] = useState<string[]>([]);
  const [endtime, setEndTime] = useState<string[]>([]);

  const history = useHistory()
  async function logout(){
    setBusy(true)
    await logoutUser()
    setBusy(false)
    history.replace('/')
  }
  const final:any = []
  const [data, setData] = useState<any | null>(null)
  // let listofngo: any[] = []
  const [ngodata, setNgodata] = useState(false);
  useEffect(() => {

    if(!ngodata){
      ngo_data()
    }

  },[]);

  const ngo_data = async() =>{
    const datango = await displayCurrentUser("ngo")
    // console.log(datango)
    if (datango){
      setNgodata(true)
      setData(datango)
      // listofngo.push(...datango.map(obj => copy(obj)));
    }
    
  }

  async function updateavail(ngoemail: any){
    console.log(days, starttime, endtime)
    let objdata = {days: days, starttime:starttime, endtime:endtime}

    updateavailability(ngoemail,objdata)

  }
  
  console.log(data)
  if (data){
    for (let items of data){
      // console.log(items,"ABCD")
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
        
        

        
        <IonItem>
            <IonLabel>Edit Availability Days</IonLabel>
            <IonSelect multiple={true} value={days} onIonChange={e => setDays(e.detail.value)}>
              <IonSelectOption value="Monday">Monday</IonSelectOption>
              <IonSelectOption value="Tuesday">Tuesday</IonSelectOption>
              <IonSelectOption value="Wednesday">Wednesday</IonSelectOption>
              <IonSelectOption value="Thursday">Thursday</IonSelectOption>
              <IonSelectOption value="Firday">Friday</IonSelectOption>
              <IonSelectOption value="Saturday">Saturday</IonSelectOption>
              <IonSelectOption value="Sunday">Sunday</IonSelectOption>
            </IonSelect>
        </IonItem>


        <IonItem>
            <IonLabel>Edit Availability Time</IonLabel>
            <IonInput type="time" onIonChange={(e:any) => setStartTime(e.target.value)}></IonInput>
            <IonInput type="time" onIonChange={(e:any) => setEndTime(e.target.value)}></IonInput>
        </IonItem>
        
        <IonButton type='submit' onClick={() => updateavail(items.username)}>Update Availability</IonButton>
        

        </IonList>


        
        

      )
  
    }}



  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Dashboard</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonLoading message= "Logging Out.." duration={0} isOpen={busy}/>
        
        
        <p>Hi, {ngodata}  <br></br>Welcome to NGO Dashboard</p>
        {/* <ExploreContainer /> */}
        
        {final}
        <br></br>

        <IonButton onClick={logout} > Logout</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;

