import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThLarge, faThList } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const ViewWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const IconWrapper = styled.div<{ isActive: boolean }>`
  margin-right: 10px;
  color: ${props => props.isActive ? 'blue' : '#333'};
  cursor: pointer;

  &:hover {
    color: blue;
  }
`;

const View: React.FC = () => {
  const [activeView, setActiveView] = useState<'tile-view' | 'list-view'>('tile-view');

  const handleViewChange = (view: 'tile-view' | 'list-view') => {
    setActiveView(view);
  };

  return (
    <ViewWrapper>
      <IconWrapper isActive={activeView === 'tile-view'} onClick={() => handleViewChange('tile-view')}>
        <FontAwesomeIcon icon={faThLarge} />
      </IconWrapper>
      <IconWrapper isActive={activeView === 'list-view'} onClick={() => handleViewChange('list-view')}>
        <FontAwesomeIcon icon={faThList} />
      </IconWrapper>
    </ViewWrapper>
  );
};


export default View;