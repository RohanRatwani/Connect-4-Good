import { IonButton, IonContent,IonCard, IonHeader, IonLoading, IonPage, IonTitle, IonToolbar, IonItem, IonIcon, IonCardContent, IonLabel, IonList, IonSelect, IonSelectOption, IonInput } from '@ionic/react';
import { pin, wifi, wine, warning, walk } from 'ionicons/icons';
import ExploreContainer from '../../components/ExploreContainer';
import './style.css';
import {displayCurrentUser, regforngo} from '../../firebaseConfig'
import { useSelector } from 'react-redux';
import {logoutUser} from '../../firebaseConfig'
import { useHistory, useParams } from 'react-router';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import names from '../../wordlist'
import './style.css'
import { render } from 'react-dom';
import Vol_Dashboard from './index';
import { toast } from '../../toast';

const ViewNgo: React.FC = (props) => {
  const history = useHistory()
  const final = []
  const user: any[] = []
  const ngodetails = JSON.stringify(props)
  const items = JSON.parse(ngodetails).location.state
  
  // const data  = useParams();
  console.log("inside view")
  console.log(items,"INSIDE_VIEW")
  const [voldays, setVoldays] = useState<string[]>([]);
  const [volstarttime, setVolStartTime] = useState<string[]>([]);
  const [volendtime, setVolEndTime] = useState<string[]>([]);
  // const [voldetails, setVolunteer] = useState()
  const [updatesuccess, setSuccess] = useState(false)
  const [ curruser, setCurruser] = useState<any>()

  // const [data, setData] = useState<any | null>()
  // let listofngo: any[] = []
  const [userdata, setUserdata] = useState(false);
  useEffect(() => {

    if(!userdata){
      user_data()
    }

  },[]);

  const user_data = async() =>{
    const data_user = await displayCurrentUser("volunteer")
    console.log(data_user)
    // if (data_user){
      setUserdata(true)
      setCurruser(data_user)
      // listofngo.push(...datango.map(obj => copy(obj)));
    // }
    
  }

  console.log(curruser)
  
  
  
  async function regngo(ngoemail: any){
    console.log(voldays, volstarttime, volendtime)
    if(curruser){
  
    let objdata = {vol_name: curruser[0].fname +" "+ curruser[0].lname, vol_email:curruser[0].username, days: voldays, starttime:volstarttime, endtime:volendtime}
    
    regforngo(ngoemail,objdata)
    setSuccess(true)
    if (updatesuccess){
      toast("You've Registered for the NGO, someone will contact you soon.")
    }
  }
    // window.location.reload()
    

  }
  
// if (userdata){
//   user.push(<p>{curruser}</p>)
// }

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
          Available Days: <br></br> {items.days}
        </IonLabel>
      </IonItem>

      <IonItem>
        <IonLabel>
          Available Time: <br></br>Start Time: {items.starttime} <br></br>End Time: {items.endtime}
        </IonLabel>
      </IonItem>

      <IonItem>
            <IonLabel>Choose Your Available Days</IonLabel>
            <IonSelect multiple={true} value={voldays} onIonChange={e => setVoldays(e.detail.value)}> 
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
            <IonLabel>Choose Your Available Time</IonLabel>
            <IonInput type="time" onIonChange={(e:any) => setVolStartTime(e.target.value)}></IonInput>
            <IonInput type="time" onIonChange={(e:any) => setVolEndTime(e.target.value)}></IonInput>
      </IonItem>

      <IonButton type = "submit" onClick={() => regngo(items.username)}> Register for this NGO </IonButton>
    
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
        
        
        <p>Hi,  <br></br>Welcome to Volunteer Dashboard</p>
        {/* <ExploreContainer /> */}
        {/* {user} <br></br><br></br> */}
        {final}
              
        {/* {names.map(name => (
          <span className="names">{name}</span>
        ))} */}
        {/* <IonButton> Register for this NGO </IonButton> */}
        <IonButton onClick={ngo_home}> Home</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default ViewNgo;
