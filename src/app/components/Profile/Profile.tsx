import React from 'react';

interface IProfile {
}

const Profile: React.FC<IProfile> = () => {

  return (
    <div>
      <h2>{'sellerName'}</h2>
      <p>Location: {'location'}</p>
      <p>License Info: {'licenseInfo'}</p>
    </div>
  );
};

export default Profile;
