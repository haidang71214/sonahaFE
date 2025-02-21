"use client";
import { Listbox, ListboxItem } from "@heroui/listbox";
import { Link } from "@heroui/link";
import { useState, useRef, useEffect } from "react";
import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
} from "@heroui/navbar";
import { Input } from "@heroui/input";
import { Kbd } from "@heroui/kbd";
import NextLink from "next/link";
import Image from "next/image";
import React from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  useDisclosure,
  Autocomplete,
  AutocompleteItem,
  ModalHeader,
} from "@heroui/react";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import "./navbartheme.css";
import { fetchDistricts, fetchProvince } from "@/utils/fetchFormApi";

interface District {
  id: number;
  name: string;
}
interface Province {
  id: number;
  name: string;
}

export const Navbar = () => {
  const [isProjectMenuOpen, setProjectMenuOpen] = useState(false); // State cho menu dự án
  const projectMenuRef = useRef(null); // Tham chiếu đến menu con

  const toggleProjectMenu = () => setProjectMenuOpen((prev) => !prev); // Hàm mở/đóng menu dự án

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter" || event.key === " ") {
      // Kiểm tra phím Enter hoặc Space
      toggleProjectMenu();
    }
  };

  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      type="search"
    />
  );

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

  const projectMenuItems = [
    {
      label: type_properties_typePropertiesName.Apartment,
      href: "/duan/Apartment",
    },
    {
      label: type_properties_typePropertiesName.OfficeBuilding,
      href: "/duan/OfficeBuilding",
    },
    {
      label: type_properties_typePropertiesName.ShoppingCenter,
      href: "/duan/ShoppingCenter",
    },
    {
      label: type_properties_typePropertiesName.NewUrbanArea,
      href: "/duan/NewUrbanArea",
    },
    {
      label: type_properties_typePropertiesName.MixedUseDevelopment,
      href: "/duan/MixedUseDevelopment",
    },
    {
      label: type_properties_typePropertiesName.SocialHousing,
      href: "/duan/SocialHousing",
    },
    {
      label: type_properties_typePropertiesName.EcoResort,
      href: "/duan/EcoResort",
    },
    {
      label: type_properties_typePropertiesName.IndustrialPark,
      href: "/duan/IndustrialPark",
    },
    {
      label: type_properties_typePropertiesName.SemiDetachedVilla,
      href: "/duan/SemiDetachedVilla",
    },
    {
      label: type_properties_typePropertiesName.Shophouse,
      href: "/duan/Shophouse",
    },
    {
      label: type_properties_typePropertiesName.Townhouse,
      href: "/duan/Townhouse",
    },
    {
      label: type_properties_typePropertiesName.OtherProject,
      href: "/duan/OtherProject",
    },
    {
      label: type_properties_typePropertiesName.BeachLand,
      href: "/duan/BeachLand",
    },
    {
      label: type_properties_typePropertiesName.PerennialCropLand,
      href: "/duan/PerennialCropLand",
    },
    { label: type_properties_typePropertiesName.Villa, href: "/duan/Villa" },
    {
      label: type_properties_typePropertiesName.ResidentialPlot,
      href: "/duan/ResidentialPlot",
    },
    {
      label: type_properties_typePropertiesName.StreetHouse,
      href: "/duan/StreetHouse",
    },
    {
      label: type_properties_typePropertiesName.LuxuryApartment,
      href: "/duan/LuxuryApartment",
    },
  ];
  const [key, setValue] = React.useState<string | null>("");
  const [isValid, setIsValid] = useState(true); // Example state to manage validatio
  const [touched, setTouched] = React.useState(false);

  const [provinceData, setProvinceData] = useState<any>(""); // Dữ liệu tỉnh
  const [districtData, setDistrictData] = useState<any>(""); // Dữ liệu quận huyện
  const [selectedProvince, setSelectedProvince] = useState<any>(""); // Tỉnh đã chọn
  const [selectedDistrict, setSelectedDistrict] = useState<any>("");
  const [loadingProvince, setLoadingProvince] = useState(false);
  const [loadingDistrict, setLoadingDistrict] = useState(false);
  const [errorProvince, setErrorProvince] = useState<string | null>(null);
  const [errorDistrict, setErrorDistrict] = useState<string | null>(null);

  useEffect(() => {
    setLoadingProvince(true); // Bắt đầu loading
    fetchProvince()
      .then((response) => {
        console.log(response);
        setProvinceData(response.data);
        setLoadingProvince(false); // Kết thúc loading
        setErrorProvince(null); // Reset lỗi
      })
      .catch((error) => {
        setErrorProvince("Không thể tải dữ liệu tỉnh. Vui lòng thử lại.");
        setLoadingProvince(false); // Kết thúc loading
        console.log(error);
      });
  }, []);

  // Fetch quận huyện khi tỉnh thay đổi
  useEffect(() => {
    console.log("province",selectedProvince);
    console.log("distric",selectedDistrict);
    
    if (!selectedProvince) return; // Không fetch nếu chưa chọn tỉnh

    setLoadingDistrict(true); // Bắt đầu loading quận huyện
    fetchDistricts(selectedProvince.data)
      .then((results) => {
        setDistrictData(results.data);
        setLoadingDistrict(false); // Kết thúc loading
        setErrorDistrict(null); // Reset lỗi
      })
      .catch((error) => {
        setErrorDistrict("Không thể tải dữ liệu quận huyện. Vui lòng thử lại.");
        setLoadingDistrict(false); // Kết thúc loading
        console.log(error);
      });
  }, [selectedProvince]);

  // Dùng useEffect để thêm sự kiện click bên ngoài để đóng menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        projectMenuRef.current &&
        !(projectMenuRef.current as any).contains(event.target as Node)
      ) {
        setProjectMenuOpen(false); // Đóng menu nếu click ngoài
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = React.useState("md");

  const sizes = [
    "xs",
    "sm",
    "md",
    "lg",
    "xl",
    "2xl",
    "3xl",
    "4xl",
    "5xl",
    "full",
  ];

  const handleOpen = (size: any) => {
    setSize(size);
    onOpen();
  };

  return (
    <div>
      <div className="container">
        <div className="hotline">Hotline: 0853012002</div>
        <div className="separator">|</div>
        <div className="brand-name">SONAHA NHÀ ĐẤT</div>
      </div>

      <HeroUINavbar className="fixed" maxWidth="xl" position="sticky">
        <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
          <NavbarBrand as="li" className="gap-3 max-w-fit">
            <NextLink
              className="flex justify-start items-center gap-1"
              href="/"
            >
              <Image
                alt="logo"
                className="logo"
                height={50}
                src={"/lOGO SONAHA-04.jpg"}
                width={50}
              />
              <p className="font-bold text-inherit">SONAHA</p>
            </NextLink>
          </NavbarBrand>
          <ul className="hidden lg:flex gap-4 justify-start ml-2">
            <li className="navbar-item">
              <NextLink passHref className="navbar-item" href="/gioithieu">
                GIỚI THIỆU
              </NextLink>
            </li>
            <li className="navbar-item">
              <button
                aria-controls="project-menu"
                aria-expanded={isProjectMenuOpen ? "true" : "false"}
                className="p-0 bg-transparent"
                onClick={toggleProjectMenu}
                onKeyDown={handleKeyPress}
              >
                DỰ ÁN
              </button>
              {isProjectMenuOpen && (
                <div
                  ref={projectMenuRef}
                  className="absolute bg-white shadow-md mt-2 rounded-md"
                >
                  <Listbox aria-label="Project List">
                    {projectMenuItems.map((item) => (
                      <ListboxItem
                        key={item.href}
                        className="listbox-item"
                        href={item.href}
                      >
                        {item.label}
                      </ListboxItem>
                    ))}
                  </Listbox>
                </div>
              )}
            </li>
            <li className="navbar-item">
              <NextLink passHref href="/tintuc">
                TIN TỨC
              </NextLink>
            </li>
          </ul>
        </NavbarContent>

        <NavbarContent
          className="hidden sm:flex basis-1/5 sm:basis-full"
          justify="end"
        >
          <NavbarItem
            className="hidden lg:flex bg-slate-50 w-12 h-12 items-center justify-center"
            style={{ borderRadius: "20px" }}
            onClick={() => handleOpen("4xl")} // Open modal when icon is clicked
          >
            <svg
              aria-hidden="true"
              className="w-[26px] h-[26px] text-gray-800 dark:text-white"
              fill="none"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
              />
            </svg>
          </NavbarItem>
        </NavbarContent>

        {/* search bắt đầu từ loại, tỉnh thành, cho tới khoảng giá, còn page với limit chắc quẳng vô page */}
        <Modal
          isDismissable={false}
          isOpen={isOpen}
          size={"4xl"}
          onClose={onClose}
        >
          <ModalContent>
            <ModalBody className="modal-css">
              <ModalHeader>Loại bất động sản</ModalHeader>
              <Autocomplete
                className="max-w-xs"
                defaultItems={projectMenuItems}
                selectedKey={key}
                variant="bordered"
                onSelectionChange={(newKey) => {
                  if (newKey !== null) {
                    setValue(newKey.toString());
                  }
                }} // Chỉ cập nhật giá trị khi chọn mục
                onClose={() => {
                  // Không gọi setTouched hoặc đóng khi chọn
                }}
              >
                {(item) => (
                  <AutocompleteItem
                    key={item.href}
                    className=""
                    onClick={(e) => e.stopPropagation()}
                  >
                    {item.label}
                  </AutocompleteItem>
                )}
              </Autocomplete>
              <Autocomplete
                className="max-w-xs"
                defaultItems={provinceData} // Hiển thị các tỉnh lấy từ API
                selectedKey={selectedProvince} // Tỉnh đã chọn
                onSelectionChange={(newKey) => {
                  if (newKey !== null) {
                    setSelectedProvince(newKey); // Cập nhật tỉnh đã chọn
                  }
                }}
              >
                {provinceData &&
                  provinceData?.map((province: any) => (
                    <AutocompleteItem
                      key={province.code}
                      data-value={province.id}
                    >
                      {province.name} {/* Hiển thị tên tỉnh */}
                    </AutocompleteItem>
                  ))}
              </Autocomplete>

              {/* Autocomplete cho quận huyện (chỉ hiện khi đã chọn tỉnh) */}
              {selectedProvince && (
                <Autocomplete
                  className="max-w-xs"
                  defaultItems={districtData} // Hiển thị các quận huyện theo tỉnh đã chọn
                  selectedKey={selectedDistrict} // Quận huyện đã chọn
                  onSelectionChange={(newKey) => {
                    if (newKey !== null) {
                      setSelectedDistrict(newKey); // Cập nhật quận huyện đã chọn
                    }
                  }}
                >
                  {districtData &&
                    districtData?.map((district: any) => (
                      <AutocompleteItem
                        key={district.code}
                        data-value={district.code}
                      >
                        {district.name} {/* Hiển thị tên quận huyện */}
                      </AutocompleteItem>
                    ))}
                </Autocomplete>
              )}
            </ModalBody>
          </ModalContent>
        </Modal>

        <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
          <Link isExternal aria-label="Github" href={siteConfig.links.github} />
          <ThemeSwitch />
          <NavbarMenuToggle />
        </NavbarContent>

        <NavbarMenu>
          {searchInput}
          <div className="mx-4 mt-2 flex flex-col gap-2">
            <Listbox aria-label="Project List" className="lisbox">
              {projectMenuItems.map((item) => (
                <ListboxItem key={item.href} href={item.href} value={item.href}>
                  {item.label}
                </ListboxItem>
              ))}
            </Listbox>
          </div>
        </NavbarMenu>
      </HeroUINavbar>
    </div>
  );
};
