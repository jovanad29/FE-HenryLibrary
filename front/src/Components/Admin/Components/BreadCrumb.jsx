import React from "react";
import { Link, useLocation } from "react-router-dom";

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";

function BreadCrumb() {
  const location = useLocation();
  const pathName = location.pathname;

  return (
    <Breadcrumb fontWeight="bold" fontSize="larger" color="#01A86C">
      <BreadcrumbItem>
        <BreadcrumbLink as={Link} to="/user/admin">
          Dashboard
        </BreadcrumbLink>
      </BreadcrumbItem>
      {pathName === "/user/admin/catalogue" ? (
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} to="/user/admin/catalogue">
            Libreria
          </BreadcrumbLink>
        </BreadcrumbItem>
      ) : pathName === "/user/admin/users" ? (
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} to="/user/admin/users">
            Usuarios
          </BreadcrumbLink>
        </BreadcrumbItem>
      ) : pathName === "/user/admin/payments" ? (
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} to="/user/admin/payments">
            Ordenes de Compra
          </BreadcrumbLink>
        </BreadcrumbItem>
      ) : pathName.includes(`/user/admin/payments/`) ? (
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} to="/user/admin/payments">
            Orden de Compra
          </BreadcrumbLink>
        </BreadcrumbItem>
      ) : null}
      {pathName.includes(`/user/admin/payments/`) ? (
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} to={pathName}>
            {pathName.split("/").pop()}
          </BreadcrumbLink>
        </BreadcrumbItem>
      ) : null}
    </Breadcrumb>
  );
}

export default BreadCrumb;
