"use client";
import React, { useEffect, useState } from "react";
import { Autocomplete, AutocompleteItem } from "@heroui/react";
import { Sidebar } from "flowbite-react";
import { useParams, useRouter } from "next/navigation";

import { fetchProvince } from "@/utils/fetchFormApi";
// Define the Province interface
interface Province {
  code: string;
  name: string;
  full_name: string;
  full_name_en: string;
  code_name: string;
}

export default function SidebarNav() {
  const params = useParams();
  const router = useRouter();

  const [dataProvince, setDataProvince] = useState<Province[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // useEffect to fetch the data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchProvince(); // Fetch data
        const provinces = response.data; // Extract the 'data' from the Axios response
        setDataProvince(provinces); // Set the data to state
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.error("Error fetching provinces:", error);
        setLoading(false);
      }
    };

    fetchData(); // Call the fetchData function
  }, []); // Empty dependency array to run only once when the component mounts

  const handleChangeProvince = (province: string) => {
    console.log(province);
    router.push(`/duan/${params.type}?province=${province}`);
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading indicator while data is being fetched
  }

  return (
    <Sidebar aria-label="Sidebar with provinces">
      <Autocomplete
        className="max-w-xs"
        defaultItems={dataProvince}
        placeholder="LỌC THEO TỈNH"
        onInputChange={(e) => handleChangeProvince(e)}
      >
        {(item: any) => (
          <AutocompleteItem key={item.code}>{item.name}</AutocompleteItem>
        )}
      </Autocomplete>
    </Sidebar>
  );
}
