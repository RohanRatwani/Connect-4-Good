import { IonButton, IonContent,IonCard, IonHeader, IonLoading, IonPage, IonTitle, IonToolbar, IonItem, IonIcon, IonCardContent, IonLabel, IonMenu, IonList, IonNav, IonTab, IonTabsContext, IonTabBar, IonApp, IonTabs, IonTabButton, IonBadge, IonRouterOutlet, IonMenuButton, IonButtons, IonAlert, IonRouterLink } from '@ionic/react';
import { pin, wifi, wine, warning, walk, business, calendar, person } from 'ionicons/icons';
import {MenuComponent} from '../../components/Menu';
import './style.css';
import {displayCurrentUser, getngobyemail} from '../../firebaseConfig'
import { useSelector } from 'react-redux';
import {logoutUser, getregvollist} from '../../firebaseConfig'
import { Redirect, Route, useHistory } from 'react-router';
import React, { useEffect, useState } from 'react';
import names from '../../wordlist'
import './style.css'
import {Plugins} from '@capacitor/core'
import { render } from '@testing-library/react';


const Viewvol_Dashboard: React.FC = () => {
  
  const [viewvol, setViewvol] = useState({})
  
  const [userdata, setUserdata] = useState<any | null>(null)
  useEffect(() => {

    if(!userdata){
      user_data()
    }

  },[]);
  
  const user_data = async() =>{
    const user = await displayCurrentUser("ngo")
    console.log(user)
    setUserdata(user)

  }

  const final:any = []
  const [data, setData] = useState<any | null>(null)
  // let listofngo: any[] = []
  const [voldata, setVoldata] = useState(false);
  useEffect(() => {

    if(!voldata){
      vol_data()
    }

  },[]);

  const vol_data = async() =>{
    if(userdata){
    console.log(userdata[0])
    const datango = await getregvollist(userdata[0].username)
    // console.log(datango)
    if (datango){
      setVoldata(true)
      setData(datango)
      // listofngo.push(...datango.map(obj => copy(obj)));
    }
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
  

  function ngo_home(){
    history.replace('/dashboard')
  }

  console.log(data,"AA")
  if (data){
  for (let dataset of data){
    // console.log(items,"ABCD")
    if(dataset){
    for (let items of dataset){
    final.push(<IonCard key={items.vol_name} >
      <IonItem>
        <IonIcon icon={person} slot="start" />
        <IonLabel>{items.vol_name}</IonLabel>
        {console.log(items[0],"ITEMS")}
        {/* <IonButton fill="outline" slot="end" onClick={ () => ngoviewroute(items)} >View</IonButton> */}
        {/* <form method="POST" action='/viewngo'>
          <input type="hidden" name="ngoid" value={items.username}></input>
          <IonButton fill="outline" slot="end" type="submit">View</IonButton>

        </form> */}
      </IonItem>

      <IonCardContent>
        Email: {items.vol_email}<br></br> Registered Days:  {items.days} <br></br> Registered Time: {items.starttime} to {items.endtime}
      </IonCardContent>
    </IonCard>)
    }
    }
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

        <p>Hi, <br></br>Welcome to Ngo Dashboard</p>
        {/* <ExploreContainer /> */}
        {/* {MenuComponent} */}
        {/* {user_data} */}
        

        {final}

        
        
        <IonButton onClick={logout}> Logout</IonButton>
        <IonButton onClick={ngo_home}> Home</IonButton>
        
      </IonContent>
  
    </IonPage>
  );
};

export default Viewvol_Dashboard;
