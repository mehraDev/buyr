import React, {  lazy, useEffect, useState } from 'react';
import SideNav from './SideNav/SideNav';
import DashboardBody from './Body/DashboardBody';
import { DashboardWrapper } from './styles';
import MobileHeader from 'ui/MobileHeader';
import { Feature } from '../DashboardHost/services/getComponentsFromFeatures';

const SellerProfile = lazy(() => import('../Profile/Profile'));
export const PROFILE_FEATURE_NAME = 'Profile';
interface DashboardProps {
    features: Feature[];
    onLogout: () => void;
  }

  const Dashboard: React.FC<DashboardProps> = ({ features }) =>  {
    const [dashboardHeight, setDashboardHeight] = useState(window.innerHeight);
    const [activeFeature, setActiveFeature] = useState<string>(features[0].name); 
    const [isSideNavVisible, setIsSideNavVisible] = useState(false);
    const [isActiveFeatureProfile,setIsActiveFeatureProfile] = useState(false);
    
    const handleSideNavProfileClick = () => {
      setIsActiveFeatureProfile(true);
      setActiveFeature(PROFILE_FEATURE_NAME);
    }
    const handleFeatureChange = (feature: string) => {
      setActiveFeature(feature);
      setIsActiveFeatureProfile(false)
    };

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

    const sideNavList = features.map((feature) => {
      return {
        name: feature.name,
        icon: feature.icon,
      };
    });

    let activeComponent;
    if(isActiveFeatureProfile){
      activeComponent = SellerProfile;
    }else{
      activeComponent = features.find(feature => feature.name === activeFeature)?.component;
    }
    const showMobileHeading = activeFeature !== features[0].name ? activeFeature.toUpperCase() : '';

    return (
      <DashboardWrapper height={dashboardHeight}>
        <SideNav
            navList={sideNavList}
            activeItem={activeFeature}
            onItemClick={handleFeatureChange}
            show={isSideNavVisible}
            hideSideNav={() => setIsSideNavVisible(false)}
            onProfileClick={() => handleSideNavProfileClick()}
        />
        <MobileHeader heading={showMobileHeading} toggleSideNav={() => setIsSideNavVisible(!isSideNavVisible)}/>
        <DashboardBody activeComponent={activeComponent} />
      </DashboardWrapper>
    );
  };
  
  export default Dashboard;

