import React from "react";
import { Link } from "react-router-dom";

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";

function BreadCrumb() {
  return (
    <Breadcrumb pl="18%" pt="3%">
      <BreadcrumbItem>
        <BreadcrumbLink as={Link} to="/user/admin">
          Dashboard
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink as={Link} to="/user/admin/users">
          Usuarios
        </BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  );
}

export default BreadCrumb;
