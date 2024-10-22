import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";

const Categories = ({ onForm, className }) => {
  const apiURL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const token = localStorage.getItem("vendorToken");
  const [inputValue, setValue] = useState("");
  const [selectedValue, setSelectedValue] = useState(null);
  const [Categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  //   handle input change event
  const handleInputChange = (value) => {
    // onMessage(value);
    setValue(value);
  };

  //   handle selection
  const handleChange = (selectedOption) => {
    console.log(selectedOption, "values");
    onForm(selectedOption, "category");
    setSelectedValue(selectedOption);

    const category = Categories.find(
      (cat) => cat.value === selectedOption.value
    );

    if (category && category.subcategories.length) {
      const subCategoriesOptions = category.subcategories.map(
        (subCat, index) => ({
          value: `${selectedOption.value}-${index}`,
          label: subCat,
        })
      );
      setSubCategories(subCategoriesOptions);
    } else {
      setSubCategories([]);
    }
  };

  const handleSubCategoryChange = (selectedOption) => {
    console.log("Selected subcategory:", selectedOption);
    onForm(selectedOption, "subcategory");
  };

  useEffect(() => {
    let info;
    let categories;
    const getCategories = () => {
      axios
        .get(`${apiURL}/category`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json; charset=UTF-8",
          },
        })
        .then((response) => {
          console.log(response.data.data.items, "categories");
          info = response.data.data.items;
          categories = info.map((category) => {
            return {
              value: category._id,
              label: category.name,
              subcategories: category.subcategories,
            };
          });
          setCategories(categories);
        })
        .catch((error) => {
          console.error("Error fetching vendors:", error);
        });
    };

    getCategories();
  }, []);
  return (
    <div className="w-full">
      <Select
        options={Categories}
        defaultValue={selectedValue}
        onChange={handleChange}
        onInputChange={handleInputChange}
        isSearchable
      />
      {subCategories.length > 0 && (
        <div className="mt-4">
          <label className="text-base">Sub Category</label>
          <Select
            options={subCategories}
            onChange={handleSubCategoryChange}
            isSearchable
            className="mt-4"
          />
        </div>
      )}
    </div>
  );
};

export default Categories;
