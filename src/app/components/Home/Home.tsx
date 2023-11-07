import {
  IShop,
  getShopsNearby,
} from "app/services/Home/Location/getShopsNearby";
import { useEffect, useState } from "react";
import { useTheme } from "styled-components";
import { Col, Row, Text } from "ui/basic";

interface Location {
  latitude: number;
  longitude: number;
}

const Home: React.FC = () => {
  const theme = useTheme();
  const [shops, setShops] = useState<IShop[]>([]);
  const [location, setLocation] = useState<Location | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          // fetchNearbyShops(latitude, longitude);
        },
        (error) => {
          console.error("Error fetching location", error);
        }
      );
    }
  }, []);
  console.log("location ", location);
  const fetchNearbyShops = async (latitude: number, longitude: number) => {
    try {
      const nearbyShops = await getShopsNearby(latitude, longitude);
      setShops(nearbyShops);
    } catch (error) {
      console.error("Error fetching nearby shops", error);
    }
  };

  return (
    <>
      <Col h="100vh" j="center" a="center">
        <Col h="100%">
          <Row p={"1.5rem"}>
            <Text s="36" c="#003366" w={4}>
              Discover <br />
              Shops & Services
            </Text>
          </Row>
          <Row h="calc(100% - 2.5rem)" p={"1rem"}>
            {location ? (
              <MapView shops={shops} />
            ) : (
              <Text>
                Unable to fetch location. Please ensure you've allowed location
                access.
              </Text>
            )}
          </Row>
        </Col>
      </Col>
    </>
  );
};

export default Home;

interface IMap {
  shops: IShop[];
}

const MapView: React.FC<IMap> = ({ shops }) => {
  const theme = useTheme();
  return (
    <>
      <Row
        p="2rem"
        style={{
          // Using deepBlue color from your palette for the background
          boxShadow: theme.shadow.boxShadow, // Adding shadow for depth
          borderRadius: "8px", // Optional: Adding border-radius for rounded corners
          margin: "1rem", // Optional: Adding margin to separate it from other elements
          alignItems: "center", // Align items vertically
        }}
      >
        <Text
          s="24px"
          w={5} // Using offWhite color for text, adjusted the weight
          style={{
            textShadow: "1px 1px 2px rgba(0, 0, 0, 0.1)", // Optional: Adding text shadow for better readability
          }}
        >
          Shops near you
        </Text>
      </Row>

      {shops.map((shop) => (
        <div key={shop.id}>{shop.name}</div>
      ))}
    </>
  );
};
