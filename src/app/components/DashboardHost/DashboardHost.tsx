import { lazy, useEffect, useState } from 'react';
import {  getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from 'firebaseServices/firebase';
import HostWrapper from './styles';

import {  AuthenticationPage } from 'app/pages/Dashboard';

import { Feature } from './services/getComponentsFromFeatures';
import LoadingAnimation from 'ui/LoadingAnimation/LoadingAnimation';
import { getFeatureComponents } from './services';
import { USER_ID, getUserID } from './services/getUserID';

const Dashboard = lazy(() => import('app/components/Dashboard/Dashboard'));

function DashboardHost() {
  const [userId, setuserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [features, setFeatures] = useState<Feature[] | []>([]);
  const [dashboardHeight, setDashboardHeight] = useState(window.innerHeight);
  const [signingUp, setSigningUp] = useState(false);

    useEffect(() => {
      const handleResize = () => {
        setDashboardHeight(window.innerHeight);
      };
  
      const handleOrientationChange = () => {
        setDashboardHeight(window.innerHeight);
      };
  
      window.addEventListener('resize', handleResize);
      window.addEventListener('orientationchange', handleOrientationChange);
  
      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('orientationchange', handleOrientationChange);
      };
    }, []);

    useEffect(() => {
      const id = getUserID();
      if (id) {
        setuserId(id);
      } else {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
          if (user) {
            setuserId(user.uid);
            try {
              localStorage.setItem(USER_ID, JSON.stringify(user.uid));
            } catch (error) {
              console.error(error);
              setLoading(false);
            }
          } else {
            setSigningUp(true);
          }
        });
    
        return () => {
          unsubscribe();
        };
      }
    }, []);
    
    useEffect(() => {
      if (userId) {
        const loadFeatures = async () => {
          try {
            const updatedFeatureList = await getFeatureComponents();
              setFeatures(updatedFeatureList);
              setLoading(false);
          } catch (error) {
            setLoading(false);
          }
        };
        if(!signingUp){
          loadFeatures();
        }
      }
    }, [userId,signingUp]);
    
    // useEffect(() => {
    //   if(userId){
    //     const stopOnlineIndicator = onlineIndicator();
    
    //     return () => {
    //       stopOnlineIndicator(); 
    //     };
    //   }
      
    // }, [userId]); 

  const handleLogout = async () => {
    const auth = getAuth();
    await signOut(auth);
    setuserId(null);
  };

  const onSignUP = (flag: boolean) => {
    setSigningUp(flag)
  }
  return (
    <HostWrapper height={dashboardHeight}>
      {userId ? 
        <>
          {loading ? 
            <LoadingAnimation />
            : 
            <Dashboard features={features} onLogout={handleLogout} />}
        </>
      : 
      <AuthenticationPage onSignUp={onSignUP}/>
      }
    </HostWrapper>
  );
}

export default DashboardHost;

