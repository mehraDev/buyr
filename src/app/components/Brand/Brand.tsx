import styled from 'styled-components'
import Logo from './Logo'
import BrandName from './BrandName'

interface BrandProps {
  
}

const Brand: React.FC<BrandProps> = () => {
  return (
    <BrandWrapper>
      <Logo />
      <BrandName>DigiBhoomi</BrandName>
    </BrandWrapper>
  )
}

const BrandWrapper = styled.span`
  display: flex;
  align-items: center;
`

export default Brand;
