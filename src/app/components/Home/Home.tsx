import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getShopsByLocation } from "./services";
import { useDispatch, useSelector } from "react-redux";
import { getLocation } from "ui/Utils";
import { setLocation } from "app/store/locationSlice";

// Styled Components
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

const Logo = styled.img`
  width: 100px;
  height: 100px;
`;

const Location = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
`;

const ShopCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const ShopImage = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const ShopName = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

const ShopSpeciality = styled.p`
  font-size: 0.9rem;
  color: #888;
`;

const LoadingMessage = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: #888;
  margin-top: 2rem;
`;

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [shops, setShops] = useState<any>([]);
  // const { latitude, longitude } = useSelector((state) => state.location);
  const dispatch = useDispatch();
  // const [currentPage, setCurrentPage] = useState(1);
  // const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const location = await getLocation();
        dispatch(setLocation(location));
        const fetchedShops = await getShopsByLocation(location);
        setShops(fetchedShops);
        setLoading(false);
      } catch (error) {
        console.log("Error:", error);
        // Handle the error
      }
    };

    fetchData();
  }, [dispatch]);

  //   const fetchShops = async (location, page) => {
  //     try {
  //       setLoading(true);
  //     //   const response = await getShops(location, page);
  //       setShops(response.shops);
  //       setTotalPages(response.totalPages);
  //       setLoading(false);
  //     } catch (error) {
  //       console.log(error);
  //       setLoading(false);
  //     }
  //   };

  // const handlePagination = (page: any) => {
  //   setCurrentPage(page);
  // };

  return (
    <>
      <Header>
        <Logo src="/path/to/logo.png" alt="Logo" />
      </Header>
      <Location>
        <p>Location: {shops}</p>
      </Location>
      {loading ? (
        <LoadingMessage>Loading...</LoadingMessage>
      ) : (
        <>
          {/* {shops.map((shop) => (
            <ShopCard key={shop.id}>
              <ShopImage src={shop.image} alt="Shop" />
              <ShopName>{shop.name}</ShopName>
              <ShopSpeciality>{shop.speciality}</ShopSpeciality>
            </ShopCard>
          ))} */}
          {/* <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePagination}
          /> */}
        </>
      )}
    </>
  );
};

export default Home;
