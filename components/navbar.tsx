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

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import "./navbartheme.css";

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
                height={50}
                src={"/lOGO SONAHA-04.jpg"}
                width={50}
                className="logo"
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
                aria-expanded={isProjectMenuOpen}
                aria-haspopup="true"
                className="cursor-pointer"
                type="button"
                onClick={toggleProjectMenu}
                onKeyDown={handleKeyPress}
              >
                DỰ ÁN
              </button>
              {isProjectMenuOpen && (
                <div
                  ref={projectMenuRef}
                  className="absolute bg-white shadow-md mt-2"
                  style={{ borderRadius: "5px" }}
                >
                  <Listbox
                    aria-label="Project List"
                    className="lisbox"
                    style={{ borderRadius: "5px" }}
                  >
                    {projectMenuItems.map((item) => (
                      <ListboxItem
                        key={item.href}
                        className="shietts"
                        href={item.href}
                        value={item.href}
                      >
                        <Link size="sm">
                          <div className="title-link">{item.label}</div>
                        </Link>
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
          <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>
        </NavbarContent>

        <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
          <Link isExternal aria-label="Github" href={siteConfig.links.github} />
          <ThemeSwitch />
          <NavbarMenuToggle />
        </NavbarContent>

        <NavbarMenu>
          {searchInput}
          <div className="mx-4 mt-2 flex flex-col gap-2">
            <Listbox aria-label="Project List" className="lisbox">
              {projectMenuItems.map((item, index) => (
                <ListboxItem key={item.href} value={item.href}>
                  <Link href={item.href} size="lg">
                    {item.label}
                  </Link>
                </ListboxItem>
              ))}
            </Listbox>
          </div>
        </NavbarMenu>
      </HeroUINavbar>
    </div>
  );
};
