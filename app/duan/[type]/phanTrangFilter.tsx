"use client";
import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, Image } from "@heroui/react";
import { useSearchParams } from "next/navigation";

import { fetchPhanTrangTheoType } from "../../../utils/fetchFormApi"; // Adjust the import as per your project

interface PhanTrangFilterProps {
  type: string; // Expecting type as a prop
}

// Enum with Vietnamese translation for property types
enum type_properties_typePropertiesName {
  Apartment = "Căn hộ",
  OfficeBuilding = "Tòa nhà văn phòng",
  ShoppingCenter = "Trung tâm mua sắm",
  NewUrbanArea = "Khu đô thị mới",
  MixedUseDevelopment = "Phát triển đa chức năng",
  SocialHousing = "Nhà ở xã hội",
  EcoResort = "Khu nghỉ dưỡng sinh thái",
  IndustrialPark = "Khu công nghiệp",
  SemiDetachedVilla = "Biệt thự song lập",
  Shophouse = "Nhà phố thương mại",
  Townhouse = "Nhà phố",
  OtherProject = "Dự án khác",
  BeachLand = "Đất ven biển",
  PerennialCropLand = "Đất trồng cây lâu năm",
  Villa = "Biệt thự",
  ResidentialPlot = "Đất ở",
  StreetHouse = "Nhà mặt phố",
  LuxuryApartment = "Căn hộ cao cấp",
}

export default function PhanTrangFilter({ type }: PhanTrangFilterProps) {
  const param = useSearchParams();
  const province = param.get("province");
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1); // Current page state
  const [totalPages, setTotalPages] = useState<number>(1); // Total pages from response

  const limit = 12; //set số phần tử tối đa

  console.log(type);

  useEffect(() => {
    // Fetch filtered data based on the `type` prop and `currentPage`
    const fetchData = async () => {
      try {
        const result = await fetchPhanTrangTheoType(type, currentPage, limit);
        console.log(result);
        setData(result.result); // Set the fetched data to state
        setTotalPages(result.pagination.totalPages); // Set total pages
      } catch (error) {
        setError("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type, currentPage]); // Re-run effect if `type` or `currentPage` changes

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page); // Update current page
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.map((item: any) => (
          <Card key={item.propertyId} className="py-4">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <p className="text-tiny uppercase font-bold">
                {item.properties.name}
              </p>
              <p className="text-tiny uppercase font-bold">
                Loại:
                {
                  type_properties_typePropertiesName[
                    type as keyof typeof type_properties_typePropertiesName
                  ]
                }
              </p>
              <small className="text-default-500">
                Tỉnh/Thành phố: {item.properties.province}
              </small>
              <h4 className="font-bold text-medium">
                Giá: {item.properties.public_price.toLocaleString()} vnđ
              </h4>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
              <Image
                alt={item.properties.name}
                className="object-cover rounded-xl"
                height={180}
                src={item.properties.thumbnail_url}
                width={270}
              />
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-center space-x-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-400"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-400"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
