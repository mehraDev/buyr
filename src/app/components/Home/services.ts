import { ICoordinates } from "ui/Utils";

interface Shop {
    id: number;
    name: string;
    image: string;
    speciality: string;
  }
  
  interface GetShopsResponse {
    shops: Shop[];
  }
  
  async function getShopsByLocation(coordinates: ICoordinates ): Promise<Shop[]> {
    try {
      // Extract latitude and longitude from the coordinates object
      const { latitude, longitude } = coordinates;
  
      // Perform the API call or database query to fetch the shops based on the location
      const response = await fetch(`your-api-endpoint?latitude=${latitude}&longitude=${longitude}`);
      const data: GetShopsResponse = await response.json();
  
      // Return the fetched shops
      return data.shops;
    } catch (error) {
      console.log("Error fetching shops:", error);
      throw error;
    }
  }
  
  export { getShopsByLocation };
  