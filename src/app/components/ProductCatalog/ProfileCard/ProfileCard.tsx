import React from "react";
import { Box, Col, Img, Row, Text } from "ui/basic";
import { useTheme } from "styled-components";
import PI from "../../../../assets/cb.jpeg";
import Icon, { IconName } from "ui/Icon";
import ContactCard from "../ContactCard/ContactCard";

// assuming you have an Icon component

interface IProfileCard {
  name: string;
  about: string;
  address: string;
  image?: string;

  onScroll?: () => void;
}

const ProfileCard: React.FC<IProfileCard> = ({
  name,
  about,
  address,
  image,
  onScroll,
}) => {
  const aboutItems = about.split(" ");
  const displayedItems = aboutItems.slice(0, 3);
  const theme = useTheme();
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
      <Row>
        <Box w="6rem" h="6rem">
          {"image" && <Img src={PI} alt={name} w="6rem" h="6rem" br="10px" />}
        </Box>
        <Col p="1rem" style={{ gap: "1rem" }}>
          <Col>
            <Text tt="cap" s="24" w={7} type="heading" c="#212121">
              {name}
            </Text>
            <About tags={displayedItems} />
          </Col>
          <Row
            a="end"
            w="initial"
            p="0 0 0.25rem"
            style={{
              borderBottom: "1px solid" + theme.neutralColor.borderSecondary,
            }}
          >
            <Icon
              name={IconName.Location}
              width={1}
              padding="0"
              color={"#e53935"}
              borderRadius={0.35}
              height={1}
            />
            <Text ml="8px" c={theme.neutralColor.textSecondary} s="16" w={5}>
              Sirsa Locality, Sirsa
            </Text>
          </Row>
        </Col>
      </Row>
      <Col w="initial" style={{ gap: "8px" }}>
        <ContactCard />
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
        <Row j="start" a="center">
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
