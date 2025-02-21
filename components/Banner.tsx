"use client";

import React from "react";
import { Carousel } from "flowbite-react";

import { useGetAllBannersQuery } from "@/service/Banner";
import "./navbartheme.css";
const BannerComponent = () => {
  // Gọi API và lấy dữ liệu banner
  const { data, error, isLoading } = useGetAllBannersQuery({}); // Không cần truyền đối số nếu không cần

  console.log(data);

  // Kiểm tra trạng thái loading
  if (isLoading) return <div>Loading banners...</div>;

  // Kiểm tra nếu có lỗi
  if (error) return <div>Error loading banners</div>;

  const renderBanner = () => {
    return data.map((item: any, index: number) => {
      return (
        <div key={index}>
          <img alt={item.title} src={item.image_url} />
        </div>
      );
    });
  };

  return (
    <div className="h-[100vh] w-full relative" >
      <Carousel className="bannerhehe" style={{ top: "-50px" }}>
        {renderBanner()}
      </Carousel>
    </div>
  );
};

export default BannerComponent;
