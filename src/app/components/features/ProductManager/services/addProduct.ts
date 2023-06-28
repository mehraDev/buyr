
const addProduct = async (itemName: string, price: number): Promise<boolean> => {
    try {
      const response = await fetch("https://api.example.com/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemName, price }),
      });
  
      if (response.ok) {
        // Product added successfully
        return true;
      } else {
        // Handle error case
        return false;
      }
    } catch (error) {
      console.error("Error adding product:", error);
      return false;
    }
};

export default addProduct;