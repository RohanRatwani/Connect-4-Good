import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonSpinner } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import Login from './pages/Login/index';
import NGO_Login from './pages/Login/ngo_login';
import VOL_Login from './pages/Login/vol_login';
import Register from './pages/Register/index';
import Dashboard from './pages/Dashboard/index';
import Vol_Dashboard from './pages/Dashboard/vol_dash';
import NGO_Register from './pages/Register/ngo_reg';
import Volunteer_Register from './pages/Register/volunteer_reg';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { useEffect, useState } from 'react';
import {getCurrentUser} from './firebaseConfig'
import { useDispatch } from 'react-redux';
import {setUserState} from './redux/action';


const RoutingSystem: React.FC = () =>{
  return(
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/" component={Home}/>
				<Route exact path="/login" component={Login}/>
        <Route exact path="/ngo_login" component={NGO_Login}/>
        <Route exact path="/vol_login" component={VOL_Login}/>
				<Route exact path="/register" component={Register}/>
        <Route exact path="/ngo_reg" component={NGO_Register}/>
        <Route exact path="/vol_reg" component={Volunteer_Register}/>
				<Route exact path="/dashboard" component={Dashboard}/>
        <Route exact path="/vol_dashboard" component={Vol_Dashboard}/>
      </IonRouterOutlet>
    </IonReactRouter>
  ) 
}

const App: React.FC = () => {
  const [busy,setBusy] = useState(true) 
  const dispatch = useDispatch()


  useEffect(()=>{
    getCurrentUser().then((user:any) => {
      if (user){
        dispatch(setUserState(user.email))
        window.history.replaceState({},'','/dashboard')
      } else{
        window.history.replaceState({},'','/')
      }
      setBusy(false)
    })

  },[])

  return(
  <IonApp>
    {busy ? <IonSpinner/>:<RoutingSystem/>}
  </IonApp>
  )
};

export default App;
