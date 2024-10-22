import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import Avatar from "../../assets/newVendor.png";
import { format } from "date-fns";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoPencilSharp, IoEyeOutline } from "react-icons/io5";
import { TbTrashXFilled } from "react-icons/tb";
import { XIcon } from "@heroicons/react/solid";
import { FiUploadCloud } from "react-icons/fi";
import { GoPlusCircle } from "react-icons/go";

const Categories = () => {
  const apiURL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const token = localStorage.getItem("adminToken");
  const { handleSubmit } = useForm();
  const [categories, setCategories] = useState([]);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [subCategory, setSubCategory] = useState([]);
  const [subCategoryFields, setSubCategoryFields] = useState([]);
  const [categoryDescription, setCategoryDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [featuredImage, setFeaturedImage] = useState(null);
  const [featuredImageFile, setFeaturedImageFile] = useState(null);
  const [showEditCategoryPreview, setShowEditCategoryPreview] = useState(false);

  const formatDate = (dateString) => {
    return format(new Date(dateString), "MMMM dd, yyyy");
  };

  const handleAddField = () => {
    if (subCategoryFields.length < 5) {
      setSubCategoryFields([...subCategoryFields, { value: "" }]);
    }
  };

  const handleCreateCategory = () => {
    setShowAddCategory(true);
    setCategoryName("");
    setCategoryDescription("");
    setSubCategoryFields([{ value: "" }]);
    setSelectedCategory(null);
  };
  // const handleImageChange = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const imageUrl = URL.createObjectURL(file);
  //     setFeaturedImage(imageUrl);
  //   }
  // };

  const fileUploadHandler = (e) => {
    console.log(e.target.files, "image");
    const image = e.target.files[0];
    setFeaturedImage(image);
  };

  const handleRemoveFeaturedImage = () => {
    setFeaturedImage(null);
    setFeaturedImageFile(null);
  };

  const handleAddCategory = () => {
    setLoading(true);
    const url = `${apiURL}/category`;
    const formData = new FormData();
    formData.append("name", categoryName);
    // formData.append(
    //   "subcategories",
    //   JSON.stringify(subCategoryFields.map((field) => field.value))
    // );
    subCategoryFields.forEach((field) => {
      formData.append("subcategories", field.value);
    });
    formData.append("description", categoryDescription);
    formData.append("image", featuredImage);

    axios
      .post(url, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response, "response from adding category");
        toast.success("Category added successfully!");
        setCategoryName("");
        setCategoryDescription("");
        setShowAddCategory(false);
      })
      // .catch((error) => {
      //   console.error("Error adding category:", error);
      // })
      .catch((error) => {
        if (error.response) {
          // Server responded with a status other than 200 range
          console.error("Error response data:", error.response.data);
          console.error("Error response status:", error.response.status);
          console.error("Error response headers:", error.response.headers);
        } else if (error.request) {
          // Request was made but no response was received
          console.error("Error request:", error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error("Error message:", error.message);
        }
      })

      .finally(() => {
        setLoading(false);
      });
  };

  const handleEditCategory = () => {
    if (!selectedCategory) return;

    setLoading(true);
    axios
      .put(
        `${apiURL}/category/${selectedCategory.id}`,
        {
          name: categoryName,
          description: categoryDescription,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      )
      .then((response) => {
        const updatedCategories = categories.map((category) =>
          category._id === selectedCategory._id ? response.data : category
        );
        setCategories(updatedCategories);
        setCategoryName("");
        setCategoryDescription("");
        setShowEditCategoryPreview(false);
        setSelectedCategory(null);
      })
      .catch((error) => {
        console.error("Error editing category:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDeleteCategory = (categoryId) => {
    setLoading(true);
    axios
      .delete(`${apiURL}/category/${categoryId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json; charset=UTF-8",
        },
      })
      .then(() => {
        const updatedCategories = categories.filter(
          (category) => category._id !== categoryId
        );
        setCategories(updatedCategories);
        toast.success("Category deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting category:", error);
        toast.error("Failed to delete category.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleEditPreview = (category) => {
    setSelectedCategory(category);
    setCategoryName(category.name);
    setCategoryDescription(category.description);
    setShowEditCategoryPreview(true);
    setShowAddCategory(false);
  };

  useEffect(() => {
    const getCategories = () => {
      axios
        .get(`${apiURL}/category`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json; charset=UTF-8",
          },
        })
        .then((response) => {
          console.log(response.data.data.items);
          setCategories(response.data.data.items);
        })
        .catch((error) => {
          console.error("Error fetching categories:", error);
        });
    };

    getCategories();
  }, [apiURL, token]);

  return (
    <>
      <ToastContainer />
      {(showAddCategory || showEditCategoryPreview) && (
        <div className="w-full h-screen bg-[#000000a8] z-50 fixed top-0 inset-0 flex flex-col items-center justify-center font-primaryRegular">
          <div className="w-[90%] max-w-[498px] bg-white rounded-xl flex flex-col items-center p-6 gap-6">
            <h2 className="text-lg font-primaryBold">
              {showAddCategory ? "Add Category" : "Edit Category"}
            </h2>
            <form
              onSubmit={handleSubmit(
                showAddCategory ? handleAddCategory : handleEditCategory
              )}
              className="w-full flex flex-col gap-4"
            >
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-primaryMedium">
                  Category Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  className="p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-primaryMedium">
                  Sub Categories
                </label>
                {subCategoryFields.map((field, index) => (
                  <input
                    key={index}
                    placeholder={`Sub Category ${index + 1}`}
                    type="text"
                    value={field.value}
                    onChange={(e) => {
                      const newFields = [...subCategoryFields];
                      newFields[index].value = e.target.value;
                      setSubCategoryFields(newFields);
                    }}
                    className="p-2 border border-gray-300 rounded-md mb-2"
                  />
                ))}
                <button
                  type="button"
                  className="w-[120px] bg-green-500 text-white px-4 py-2 rounded flex items-center gap-4"
                  onClick={handleAddField}
                >
                  <GoPlusCircle size={16} />
                  Add
                </button>
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="description"
                  className="text-sm font-primaryMedium"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  value={categoryDescription}
                  onChange={(e) => setCategoryDescription(e.target.value)}
                  className="p-2 border border-gray-300 rounded-md"
                  required
                ></textarea>
              </div>
              <div>
                <p className="text-sm font-primaryMedium">Featured Image</p>
                <p className="text-xs p-2 text-center">
                  Upload an image to properly represent the category. Image size
                  should not be more than 2 MB
                </p>
                <div className="w-full min-h-[150px] bg-white p-3 flex flex-col">
                  <div className="w-full h-[94px] border-[2px] border-dashed border-[#CFCBCB] flex flex-col items-center justify-center p-[10px]">
                    <FiUploadCloud size={24} />
                    <label
                      htmlFor="featuredFileInput"
                      className="text-[#359E52] cursor-pointer active:opacity-5"
                    >
                      Upload an Image
                      <input
                        disabled={featuredImage}
                        id="featuredFileInput"
                        type="file"
                        accept="image/png, image/jpeg"
                        onChange={fileUploadHandler}
                        style={{ display: "none" }}
                      />
                    </label>
                    <p className="max-w-[217px] text-xs">
                      or drag and drop PNG, JPG
                    </p>
                  </div>
                  <br />
                  <div className="w-full flex flex-row flex-wrap gap-5">
                    {featuredImage && (
                      <div
                        className="w-[71px] h-[56px] border-[0.94px] border-[#359E52] relative"
                        style={{
                          backgroundImage: `url(${featuredImage})`,
                          backgroundSize: "cover",
                        }}
                      >
                        <div className="w-[20px] h-[20px] bg-[#eaeaea] cursor-pointer active:opacity-5 rounded-[100px] flex items-center justify-center absolute right-[-5px] top-[-5px]">
                          <button onClick={() => handleRemoveFeaturedImage()}>
                            <XIcon width={12} height={12} color="red" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-10">
                <button
                  type="submit"
                  className="w-full h-10 rounded-md bg-[#4CBD6B] text-white flex items-center justify-center"
                  disabled={loading}
                >
                  {loading ? (
                    <svg
                      className="animate-spin h-5 w-5 text-gray-700"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.963 7.963 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : showAddCategory ? (
                    "Add Category"
                  ) : (
                    "Save Changes"
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddCategory(false);
                    setShowEditCategoryPreview(false);
                  }}
                  className="w-full h-10 rounded-md bg-red-500 text-white"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {categories.length > 0 ? (
        <div className="w-full flex flex-col">
          <div className="w-full h-16 bg-white border border-[#CFCBCB] border-l-8 border-l-[#359E52] rounded-xl flex items-center justify-between p-4 md:text-xl font-primarySemibold">
            <p className=""> Categories</p>
            <div
              onClick={handleCreateCategory}
              className="text-white bg-[#359E52] text-sm p-3 rounded-xl cursor-pointer"
            >
              Add Category
            </div>
          </div>
          <div className="my-8 w-full bg-white p-3">
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white font-primaryRegular">
                <thead className="bg-[#F1F4F2] font-primaryBold text-sm">
                  <tr>
                    <th className="p-3 text-left">Parent Category</th>
                    <th className="p-3 text-left">Sub Category</th>
                    <th className="p-3 text-left">Description</th>
                    <th className="p-3 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category) => (
                    <tr
                      key={category._id}
                      className="border-b text-xs font-primaryMedium mb-4"
                    >
                      <td className="p-4 text-left">
                        <div className="flex gap-2">
                          <img
                            src={`${category.image}`}
                            alt=""
                            width={50}
                            height={40}
                            // className="rounded-full"
                          />
                          <p className="p-4">{category.name}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        {Array.isArray(category?.subcategories) &&
                        category.subcategories.length > 0 ? (
                          category.subcategories.map((sub, index) => (
                            <span key={index}>
                              {sub}
                              {index < category.subcategories.length - 1 &&
                                ", "}
                            </span>
                          ))
                        ) : (
                          <span>No Subcategories</span>
                        )}
                      </td>
                      {/* <td className="p-4">
                        {category?.subcategories.map((sub, index) => (
                          <span key={index}>
                            {sub}
                            {index < category.subcategories.length - 1 && ", "}
                          </span>
                        ))}
                      </td> */}
                      <td className="p-4">
                        {category.description.length > 50
                          ? `${category.description.substring(0, 50)}...`
                          : category.description}
                      </td>
                      <td>
                        <div className="flex items-center gap-4">
                          <button
                            className="text-[#359E52] w-8 h-8 rounded-full flex items-center justify-center border border-gray-200"
                            onClick={() => handleEditPreview(category)}
                          >
                            <IoPencilSharp size={16} />
                          </button>
                          <button className="text-[#359E52] w-8 h-8 rounded-full flex items-center justify-center border border-gray-200">
                            <IoEyeOutline size={16} />
                          </button>
                          <button
                            className="text-[#FB1010] w-8 h-8 rounded-full flex items-center justify-center border border-gray-200"
                            onClick={() => handleDeleteCategory(category._id)}
                          >
                            <TbTrashXFilled size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="w-full h-16 bg-white border border-[#CFCBCB] border-l-8 border-l-[#359E52] rounded-xl flex items-center justify-between p-4 md:text-xl font-primarySemibold">
            <p className="">Categories</p>
            <div
              onClick={handleCreateCategory}
              className="text-white bg-[#359E52] text-base p-3 rounded-xl cursor-pointer"
            >
              Add Category
            </div>
          </div>
          <div className="w-full h-full flex flex-col items-center justify-center p-6">
            <div className="text-xl font-primaryRegular">No Categories</div>
            <div className="my-10 md:p-10">
              <img src={Avatar} alt="no-new-vendor" className="w-full h-full" />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Categories;
