import React from "react";
import { Box, Col, Img, Row, Text } from "ui/basic";
import { useTheme } from "styled-components";
import PI from "../../../../assets/cb.jpeg";
import Icon, { IconName } from "ui/Icon";
import ContactCard from "../ContactCard/ContactCard";
import { ISellerProfile } from "app/interfaces";

interface IProfileCard {
  image?: string;
  profile: ISellerProfile;
}

const ProfileCard: React.FC<IProfileCard> = ({ profile, image }) => {
  const theme = useTheme();
  const { shopName, address, about, wa, fb, phone, insta } = profile;
  const aboutItems = about.split(" ");
  const displayedItems = aboutItems.slice(0, 3);

  return (
    <Row
      a="center"
      p="1rem "
      m={"0 0 1rem"}
      style={{
        background: theme.neutralColor.bgContainer,
        borderBottom: "1px dashed" + theme.neutralColor.border,
      }}
      j="between"
    >
      <Col a="center">
        <Box w="9rem" h="9rem">
          {"image" && (
            <Img
              src={image}
              alt={shopName}
              w="9rem"
              h="9rem"
              br="10px"
              style={{ boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)" }}
            />
          )}
        </Box>
        <Col a="center" p="0.5rem 0 " style={{ gap: "1rem" }}>
          <Col a="center">
            <Text
              tt="cap"
              s="24"
              w={7}
              type="heading"
              c="#212121"
              style={{ textShadow: "0 2px 4px rgba(0, 0, 0, 0.2)" }}
            >
              {shopName}
            </Text>
            <About tags={displayedItems} />
          </Col>
          <Row
            a="center"
            w="initial"
            p="6px"
            style={{
              border: " 1px solid #ca1a193d",
              borderLeft: "0px",
              borderRight: "0px",
            }}
          >
            <Icon
              name={IconName.Location}
              width={1}
              padding="0"
              color={"#CA1919"}
              borderRadius={0.35}
              height={1}
            />
            <Text ml="8px" c={theme.neutralColor.textSecondary} s="14" w={4}>
              {address}
            </Text>
          </Row>
        </Col>
      </Col>
      <Col
        w="initial"
        style={{ gap: "8px", position: "absolute", right: "1rem" }}
      >
        <ContactCard
          phone={phone || []}
          wa={wa || []}
          fb={fb || []}
          insta={insta || []}
        />
      </Col>
    </Row>
  );
};

const About: React.FC<{ tags: string[] }> = ({ tags }) => {
  const theme = useTheme();
  console.log(tags);
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
              <Text c={theme.neutralColor.textSecondary} s="14">
                {item}
              </Text>
              {index < tags.length - 1 && (
                <Icon
                  name={IconName.Diamond}
                  width={0.3}
                  height={0.3}
                  color={"#FFA000"}
                />
              )}
            </React.Fragment>
          ))}
        </Row>
      )}
    </>
  );
};

export default ProfileCard;
