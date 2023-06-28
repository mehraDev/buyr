import styled from 'styled-components'

interface BrandNameProps {}

export const BRAND_NAME = 'DigiBhoomi';

const BrandName: React.FC<BrandNameProps> = () => {
  return (
   <BrandNameWrapper>
        {BRAND_NAME}
   </BrandNameWrapper>
  )
}

const BrandNameWrapper = styled.p`
  padding: 0px 10px;
  font-size: larger;
  font-weight: 600;
  font-family: 'Raleway', sans-serif;
`

export default BrandName
