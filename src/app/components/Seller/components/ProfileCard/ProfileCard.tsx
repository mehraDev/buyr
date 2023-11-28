import { Col, Row, Text } from "ui/basic";
import { useTheme } from "styled-components";
import Icon, { IconName } from "ui/Icon";
import placeholderProfileImage from "../../../../../assets/shop/profile-placeholder.png";

import { ISellerProfile } from "app/interfaces"; // Import ISellerProfile interface
import React, { useState } from "react";
import { ImageWithFallback } from "ui/ImageWithFallback";
import ContactBar from "./ContactBar/ContactBar";
import { ISellerContacts } from "app/interfaces/Shop/Contacts";
import { useAuth } from "app/hooks/useAuth";

interface IProfileCard {
  profile: ISellerProfile;
  logo: string;
  contacts: ISellerContacts | null;
}

const ProfileCard: React.FC<IProfileCard> = ({ contacts, logo, profile }) => {
  const theme = useTheme();
  const { name, about, address }: ISellerProfile = profile;
  // const [like, setLike] = useState(false);
  // const { requireAuth } = useAuth();
  // const toggleLike = () => {
  //   requireAuth(() => {
  //     setLike(true);
  //   });
  // };
  const profileBasic = (
    <>
      {/* <Row>
        <Icon
          color={like ? "red" : "blue"}
          name={IconName.Diamond}
          onClick={toggleLike}
        />
      </Row> */}
      <Row w="initial">
        <ImageWithFallback
          src={logo}
          h="8rem"
          w="8rem"
          fallbackImage={placeholderProfileImage}
          alt="Logo"
        />
      </Row>
      <Col
        a="center"
        style={{
          gap: "1rem",
        }}
      >
        <Text tt="cap" s="20" w={7} c={theme.neutralColor.text}>
          {name}
        </Text>
        <About tags={about} />
        {address && (
          <Row
            a="center"
            w="initial"
            p="0.5rem 1rem"
            style={{
              gap: "0.5rem",
              border: "1px solid #d9d9e3",
            }}
            br="0.75rem"
          >
            <Icon
              name={IconName.Location}
              width={1}
              height={1}
              padding="0"
              color={"#e91e63"}
            />
            <Text tt="cap" c={theme.neutralColor.textSecondary} s="12" w={5}>
              {address}
            </Text>
          </Row>
        )}
        <Col
          w="initial"
          style={{
            gap: "12px",
          }}
        >
          <ContactBar contacts={contacts} />
        </Col>
      </Col>
    </>
  );

  return <>{profileBasic}</>;
};

export default ProfileCard;

const About: React.FC<{ tags: string[] }> = ({ tags }) => {
  const theme = useTheme();
  const shouldDisplayLeafIcon = tags.some((tag) =>
    "Pure-Veg".toLowerCase().includes(tag.toLowerCase())
  );
  return (
    <>
      {tags.length > 0 && (
        <Row j="center" a="center">
          {shouldDisplayLeafIcon && (
            <Icon
              name={IconName.Leaf}
              width={1}
              height={1}
              padding="0"
              color={"#43A047"}
              style={{ marginRight: "2px" }}
            />
          )}
          {tags.map((item, index) => (
            <React.Fragment key={index}>
              <Text tt="cap" c={theme.neutralColor.textSecondary} s="14" w={6}>
                {item}
              </Text>
              {index < tags.length - 1 && (
                <Icon
                  name={IconName.Diamond}
                  width={0.2}
                  height={0.2}
                  color={theme.neutralColor.textTertiary}
                />
              )}
            </React.Fragment>
          ))}
        </Row>
      )}
    </>
  );
};
