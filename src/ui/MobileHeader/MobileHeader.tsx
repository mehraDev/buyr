import Brand from 'app/components/Brand';
import MobileHeaderWrapper, { HeadingMain } from './styles';
import Icon, { IconName } from 'ui/Icon';
interface IMobileHeader{
    toggleSideNav: () => void;
    showLogo?: boolean;
    heading?: string;
}

const MobileHeader: React.FC<IMobileHeader> = ({heading,toggleSideNav,showLogo = true}) => {
  return (
    <MobileHeaderWrapper>
        <div><Icon name={IconName.Bars} width={1.5} height={1.5} onClick={toggleSideNav}/> </div>
        <div>{heading ? <HeadingMain>{heading}</HeadingMain> : showLogo && <Brand/> }</div>
        <div></div>
    </MobileHeaderWrapper>
    )
};

export default MobileHeader;

