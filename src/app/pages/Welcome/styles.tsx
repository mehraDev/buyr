import styled from "styled-components";

export const WelcomePageWrapper = styled.div`
  display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    align-items: center;
    justify-content: space-around;
    height: 100vh;
    padding-bottom: 10%;
    background  : #f0f2f5;
`;

export const BrandWrapper = styled.div`
     h1{
        font-size: 5rem;
        margin: 0;
        font-weight: 700;
        color: #007aea;
    }
    h2 {
      
       margin: 0;
    margin-left: 3rem;
    opacity: 0.8;
    font-weight: 500;
    
    }
`;

export const TitleWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 1rem;
`;
export const LoginWrapper = styled.div`
  background: rgba(255, 255, 255, 0.15);
  border-radius: 8px;
`;