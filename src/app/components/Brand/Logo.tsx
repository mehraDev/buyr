import React from 'react'
import styled from 'styled-components'
import logo from 'assets/Logo/logo.png'
interface LogoProps {
  height?: string
  width?: string
}

const LogoImage = styled.img<LogoProps>`
  height: ${(props) => props.height || '24px'};
  width: ${(props) => props.width || '24px'};
`

const Logo: React.FC<LogoProps> = ({height, width}) => {
  return <LogoImage src={logo} alt="Logo" height={height} width={width} />
}

export default Logo;
