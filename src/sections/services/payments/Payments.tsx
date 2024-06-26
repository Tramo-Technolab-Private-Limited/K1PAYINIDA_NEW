import React, { useEffect, useState } from "react";
import RoleBasedGuard from "src/auth/RoleBasedGuard";
import { useAuthContext } from "src/auth/useAuthContext";
import { productProps } from "./types";
import { Stack, Tab, Tabs } from "@mui/material";
import CreditCardPayment from "./CreditCardPayment";
import Scrollbar from "src/components/scrollbar/Scrollbar";
import useResponsive from "src/hooks/useResponsive";

function Payments() {
  const { Api } = useAuthContext();
  const isMobile = useResponsive("up", "sm");
  const ProductContext = React.createContext({} as productProps);
  const [productList, setProductList] = useState<productProps[]>([]);
  const [selectedProduct, setSelectedProduct] = useState({} as productProps);

  useEffect(() => getCategoryList(), []);

  const getCategoryList = () => {
    let token = localStorage.getItem("token");
    Api(`category/get_CategoryList`, "GET", "", token).then((Response: any) => {
      if (Response.status == 200) {
        if (Response.data.code == 200) {
          Response.data.data.filter(
            (item: any) =>
              item.category_name.toLowerCase() == "payments" &&
              getProductlist(item._id)
          );
        }
      }
    });
  };

  const getProductlist = (val: string) => {
    let token = localStorage.getItem("token");
    Api(`product/get_ProductList/${val}`, "GET", "", token).then(
      (Response: any) => {
        if (Response.status == 200) {
          if (Response.data.code == 200) {
            setProductList(Response.data.data);
            setSelectedProduct(Response.data.data[0]);
          }
        }
      }
    );
  };

  return (
    <RoleBasedGuard hasContent roles={["agent"]}>
      <ProductContext.Provider value={selectedProduct}>
        <Tabs
          value={selectedProduct.productName}
          aria-label="basic tabs example"
          sx={{ background: "#F4F6F8" }}
        >
          {productList?.map((item: any) => (
            <Tab
              key={item._id}
              sx={{ mx: 3 }}
              label={item.productName}
              value={item.productName}
              onClick={() => setSelectedProduct(item)}
            />
          ))}
        </Tabs>
        <Scrollbar
          sx={
            isMobile
              ? { maxHeight: window.innerHeight - 170 }
              : { maxHeight: window.innerHeight - 370 }
          }
        >
          {selectedProduct.productName?.toLowerCase() == "credit cards" && (
            <CreditCardPayment />
          )}
        </Scrollbar>
      </ProductContext.Provider>
    </RoleBasedGuard>
  );
}

export default Payments;
