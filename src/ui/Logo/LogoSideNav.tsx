import styled from 'styled-components'
import Logo from './Logo'

interface LogoSideNavProps {
  hideName?: boolean,
  sizeSmall?: number,
  sizeLarge?: number
}

const LogoSideNav: React.FC<LogoSideNavProps> = ({hideName,sizeSmall = 1.5,sizeLarge = 1.5}) => {
  return (
    <NameLogoWrapper>
      <Logo height={hideName ? `${sizeLarge}rem`: `${sizeSmall}rem`} width={hideName ? `${sizeLarge}rem`: `${sizeSmall}rem`} />
      {!hideName && <div>DigiBhoomi</div>}
    </NameLogoWrapper>
  )
}

const NameLogoWrapper = styled.div`
  display: flex;
  align-items: center;
  color: white;
  font-weight: 600;
  font-size: 1.25rem;
  
  font-family: 'Raleway', sans-serif;
  & > div {
    margin-left: 1rem;
  }
`

export default LogoSideNav;
