interface InventoryItem {
    id: number;
    name: string;
  }
  
  interface InventoryData {
    items: InventoryItem[];
  }
  
  export const getInventoryData = async (): Promise<InventoryData> => {
    try {
  
      const dummyData: InventoryData = {
        items: [
          { id: 1, name: 'Item 1' },
          { id: 2, name: 'Item 2' },
          { id: 3, name: 'Item 3' },
        ],
      };
  
      return dummyData;
    } catch (error) {
      throw new Error('Failed to fetch inventory data');
    }
  };
  