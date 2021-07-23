import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../../components/ExploreContainer';
import './style.css';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        
        <p>New here? <Link to="/register">Register</Link></p>
        <br></br>
        <p>Already have an Account? <Link to="/login">Login</Link></p>
      </IonContent>
    </IonPage>
  );
};

export default Home;
