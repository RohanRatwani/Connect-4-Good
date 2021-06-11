import { IonButton, IonContent,IonCard, IonHeader, IonLoading, IonPage, IonTitle, IonToolbar, IonItem, IonIcon, IonCardContent, IonLabel, IonMenu, IonList, IonNav, IonTab, IonTabsContext, IonTabBar, IonApp, IonTabs, IonTabButton, IonBadge, IonRouterOutlet, IonMenuButton, IonButtons, IonAlert, IonRouterLink } from '@ionic/react';
import { pin, wifi, wine, warning, walk, business, calendar, person } from 'ionicons/icons';
import {MenuComponent} from '../../components/Menu';
import './style.css';
import {displayCurrentUser, getngobyemail} from '../../firebaseConfig'
import { useSelector } from 'react-redux';
import {logoutUser, getngolist} from '../../firebaseConfig'
import { Redirect, Route, useHistory } from 'react-router';
import React, { useEffect, useState } from 'react';
import names from '../../wordlist'
import './style.css'
import {Plugins} from '@capacitor/core'
import { Link } from 'react-router-dom';
import ViewNgo from './viewngo';
import { render } from '@testing-library/react';
import ViewNGO from './viewngo'

const Vol_Dashboard: React.FC = () => {
  
  const [viewngo, setViewngo] = useState({})
  
  const [userdata, setUserdata] = useState<any | null>(null)
  useEffect(() => {

    if(!userdata){
      user_data()
    }

  },[]);
  
  const user_data = async() =>{
    const user = await displayCurrentUser("volunteer")
    console.log(user)
    setUserdata(user)

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
    const datango = await getngolist()
    // console.log(datango)
    if (datango){
      setNgodata(true)
      setData(datango)
      // listofngo.push(...datango.map(obj => copy(obj)));
    }
    
  }

  // console.log(listofngo)
  const [busy,setBusy] = useState(false)
  // const username = useSelector((state:any) => state.user.username)
  const history = useHistory()
  console.log(history,"History")
  async function logout(){
    setBusy(true)
    await logoutUser()
    setBusy(false)
    history.replace('/')
  }
  

  const ngoviewroute = (data:any) => {
   
    console.log(data,"ngo")
    // const res = getngobyemail(data)
    // setViewngo(res)
    
    history.push({
      pathname:'/viewngo',
      state: data
    })
    
  }


  console.log(data,"AA")
  if (data){
  for (let items of data){
    // console.log(items,"ABCD")
    final.push(<IonCard key={items.username} >
      <IonItem>
        <IonIcon icon={business} slot="start" />
        <IonLabel>{items.ngo_name}</IonLabel>
        {console.log(items,"ITEMS")}
        <IonButton fill="outline" slot="end" onClick={ () => ngoviewroute(items)} >View</IonButton>
        {/* <form method="POST" action='/viewngo'>
          <input type="hidden" name="ngoid" value={items.username}></input>
          <IonButton fill="outline" slot="end" type="submit">View</IonButton>

        </form> */}
      </IonItem>

      <IonCardContent>
        {items.address} {items.city}
      </IonCardContent>
    </IonCard>)

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

        
        {/* <IonTabs>

        <IonRouterOutlet>
              
          </IonRouterOutlet> 
        
          <IonTabBar slot="bottom">

            <IonTabButton tab="schedule">
              <IonIcon icon={calendar} />
              <IonLabel>Activity Calendar</IonLabel>
            </IonTabButton>

            <IonTabButton tab="profile">
              <IonIcon icon={person} />
              <IonLabel>Edit Profile</IonLabel>
            </IonTabButton>

            <IonTabButton tab="profile" onClick={logout}>
              <IonIcon name="log-out" />
              <IonLabel>Logout</IonLabel>
            </IonTabButton>

          </IonTabBar>
        </IonTabs> */}

        <p>Hi, <br></br>Welcome to Volunteer Dashboard</p>
        {/* <ExploreContainer /> */}
        {/* {MenuComponent} */}
        {user_data}
        

        {final}

        
        
        <IonButton onClick={logout}> Logout</IonButton>
      </IonContent>
  
    </IonPage>
  );
};

export default Vol_Dashboard;
function copy(obj: { id: any; data: () => any; }): any {
  throw new Error('Function not implemented.');
}

function props(props: any) {
  throw new Error('Function not implemented.');
}

