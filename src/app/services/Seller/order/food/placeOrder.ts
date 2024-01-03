import { httpsCallable } from "firebase/functions";
import { functions } from "firebaseServices/firebase";

const placeOrder = async (): Promise<any> => {
  try {
    const createFoodOrderFn = httpsCallable<any>(functions, "food_placeOrder");

    const result = await createFoodOrderFn();
    console.log(result);
  } catch (error) {
    console.error("Error placing order:", error);
    throw error;
  }
};

export default placeOrder;
