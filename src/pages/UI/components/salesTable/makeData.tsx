// https://jsonplaceholder.typicode.com/users
// import React from "react";

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

export interface Person {
  id: number;
  name: string;
  username: string;
  email: string;
  address: any;
  action: any;
}

export async function fetchData(): Promise<Person[]> {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data: any[] = await response.json();

    // Map the fetched data to the structure of your Person type
    const formattedData: Person[] = data.map((user) => ({
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      address: `${
        user.address.street +
        "" +
        user.address.suite +
        "" +
        user.address.city +
        "" +
        user.address.zipcode +
        "" +
        user.address.geo.lat +
        "" +
        user.address.geo.lng
      }`,
      action: user.id,
    }));

    return formattedData;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}
