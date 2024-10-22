import requests from "./httpServices";

const ProductServices = {
  getShowingProducts: async () => {
    return requests.get("/products/show");
  },

  // on-render-endpoints
  // getShowingProducts: async () => {
  //   return requests.get("/products");
  // },

  getShowingStoreProducts: async ({ category = "", title = "", slug = "" }) => {
    return requests.get(
      `/products/store?category=${category}&title=${title}&slug=${slug}`
    );
  },
  // on-render-endpoints
  // getShowingStoreProducts: async ({ id }) => {
  //   return requests.get(`/products?id=${id}`);
  // },

  getDiscountedProducts: async () => {
    return requests.get("/products/discount");
  },

  getProductBySlug: async (slug) => {
    return requests.get(`/products/${slug}`);
  },
};

export default ProductServices;
