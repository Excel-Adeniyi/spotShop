// https://jsonplaceholder.typicode.com/users
// import React from "react";

// import axios from "axios";
import SalesService from "../../../../../services/dailysalesService.tsx";

// interface geo {
//   lat: string;
//   lng: string;
// }

// interface address {
//   street: string;
//   suite: string;
//   city: string;
//   zipcode: string;
//   geo: geo;
// }

export interface Sales {
  id: number;
  product: string;
  quantity: number;
  product_uuid: string;
  timeday: string;
  totalAmount: number;
}

export async function fetchData(date1: any, date2: any): Promise<Sales[]> {
  console.log("Calling fetchData");
  try {
    const date = {
      date1: date1,
      date2: date2,
    };
    // console.log("DDD", date);
    const response = await SalesService.dailyservice(date);
    const data: any = response.data.results;
    // console.log("LOOGGING", data);
    // Map the fetched data to the structure of your Person type
    const formattedData: Sales[] = data.map((items: any) => ({
      id: items.id,
      product: items.product,
      quantity: items.quantity,
      timeday: new Date(items.timeday),
      totalAmount: items.totalAmount,
      action: items.product_uuid,
    }));

    return formattedData;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
  // useEffect(())
}
