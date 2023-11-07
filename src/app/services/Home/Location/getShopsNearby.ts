interface IShop {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}

interface ShopsApiResponse {
  data: IShop[];
}

async function getShopsNearby(latitude: number, longitude: number): Promise<IShop[]> {
  const apiUrl = `https://yourapi.com/shops?lat=${latitude}&long=${longitude}`;

  const response = await fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  const json: ShopsApiResponse = await response.json();
  return json.data;
}

export { getShopsNearby };
export type { IShop };
