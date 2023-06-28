import React, { ReactNode, Suspense } from 'react';
import LoadingAnimation from 'ui/LoadingAnimation/LoadingAnimation';
import BodyWrapper, { ActiveComponentWrapper } from './styles';

interface DashboardBodyProps {
  activeComponent: React.ComponentType<any> | undefined;
}


const DashboardBody: React.FC<DashboardBodyProps> = ({ activeComponent: ActiveComponent }) => {
  return (
    <BodyWrapper className='dashboard-body'>
      {ActiveComponent ? (
        <LazyComponentWrapper>
          <ActiveComponentWrapper>
          <ActiveComponent/>
          </ActiveComponentWrapper>
            
        </LazyComponentWrapper>
       
      ) : (
        <div>No component found for the active feature.</div>
      )}
    </BodyWrapper>
  );
};

const LazyComponentWrapper: React.FC<LazyComponentWrapperProps> = ({ children }) => (
  <Suspense fallback={<LoadingAnimation />}>{children}</Suspense>
);
  
type LazyComponentWrapperProps = {
  children: ReactNode;
};
export default DashboardBody;

