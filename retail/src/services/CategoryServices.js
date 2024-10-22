import requests from "./httpServices";

const CategoryServices = {
  getShowingCategory: async () => {
    return requests.get("/category");
  },
};

export default CategoryServices;
