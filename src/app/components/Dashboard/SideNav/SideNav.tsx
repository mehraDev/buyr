import SideNavWrapper, {AccountWrapper, SideNavAccountLabel, SideNavItemWrapper, SideNavLabel, SideNavListWrapper, ToggleButton} from './styles';

import { useEffect, useState } from 'react';
import Icon, { IconName, IconSidenav } from 'ui/Icon';
import { IconEnum } from 'ui/Icon/IconSidenav';
import LogoSideNav from 'ui/Logo';
import { PROFILE_FEATURE_NAME } from '../Dashboard';
import { getProfile } from 'app/components/DashboardHost/services';

interface ISideNav {
  navList: { name: string; icon: keyof typeof IconEnum }[];
  activeItem: string;
  onItemClick: (item: string) => void;
  show: boolean;
  hideSideNav: () => void;
  onProfileClick: () => void;
};

const SideNav: React.FC<ISideNav> = ({onProfileClick, navList, activeItem,onItemClick ,show,hideSideNav}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [shopName, setShopName] = useState<string>('');
  const itemClickHandler = (activeItem:string) => {
    onItemClick(activeItem);
    if(isExpanded){
      hideSideNav();
    }
  };

  const handleProfileClick = () => {
    onProfileClick();
    if(isExpanded){
      hideSideNav();
    }
  }

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await getProfile();
        if(profile){
          setShopName(profile.shopName );
        }
      } catch (error) {
        console.error("Error retrieving profile:", error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <SideNavWrapper show={show} expanded={isExpanded}>
      <LogoSideNav hideName={!isExpanded} sizeLarge={2}/>
      <SideNavListWrapper expanded={isExpanded}>
        {navList.map((item,index) => (
          <SideNavItemWrapper
            key={index}
            onClick={() => itemClickHandler(item.name)}
            className={activeItem === item.name ? 'active' : ''}
            // isOpen={isOpen}
          >
            <IconSidenav zoom={!isExpanded} iconName={item.icon} />
            <SideNavLabel show={isExpanded}>
              {item.name}
            </SideNavLabel>
          </SideNavItemWrapper>
        ))}
      </SideNavListWrapper>
      <AccountWrapper expanded={isExpanded} className='sidenav-account'>
      <SideNavItemWrapper
            key={'account'}
            onClick={handleProfileClick}
            className={activeItem === PROFILE_FEATURE_NAME ? 'active' : ''}
          >
            <IconSidenav zoom={!isExpanded} iconName={'Account'} />
            <SideNavAccountLabel show={isExpanded}>
            {shopName}
            </SideNavAccountLabel>
          </SideNavItemWrapper>
        </AccountWrapper>
      <ToggleButton onClick={() => setIsExpanded(!isExpanded)}>
        <Icon name={isExpanded ? IconName.LeftArrow : IconName.RightArrow} color='white'/>
      </ToggleButton>
     </SideNavWrapper>
  )
};

export default SideNav
