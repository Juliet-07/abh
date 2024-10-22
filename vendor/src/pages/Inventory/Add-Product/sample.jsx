import React, { useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FiUploadCloud } from "react-icons/fi";
import Categories from "../../../components/Categories";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ColorSelect from "../../../components/Colors";

const AddSampleProduct = () => {
  const apiURL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const token = localStorage.getItem("vendorToken");
  const navigate = useNavigate();
  const { handleSubmit } = useForm();
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [featuredImage, setFeaturedImage] = useState(null);
  const [featuredImageFile, setFeaturedImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");
  const [selectSize, setSize] = useState("");
  const [footSize, setFootSize] = useState("");
  const [showFootSizes, setShowFootSizes] = useState(false);
  const [selectUnit, setUnit] = useState("");

  const initialValue = {
    name: "",
    quantity: "",
    size: "",
    unit: "",
    description: "",
    price: "",
    currency: "",
    manufacturer: "",
    product_images: "",
  };

  const [addProductData, setAddProductData] = useState(initialValue);

  const {
    name,
    quantity,
    size,
    unit,
    description,
    price,
    currency,
    manufacturer,
    product_images,
  } = addProductData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddProductData({ ...addProductData, [name]: value });
  };

  const handleSizeChange = (e) => {
    const value = e.target.value;
    setSize(value);
    if (value === "foot") {
      setShowFootSizes(true);
    } else {
      setShowFootSizes(false);
      setFootSize("");
    }
  };

  const handleFootSizeChange = (e) => {
    setFootSize(e.target.value);
  };

  const handleUnitChange = (e) => {
    const { name, value } = e.target;
    setUnit(value);
  };

  const handleCategoryInfo = useCallback((data, type) => {
    console.log({ data, type });
    if (type === "category") {
      setCategoryId(data.value);
      console.log(categoryId, "category id check");
    } else if (type === "subcategory") {
      setSubCategoryId(data.value);
    }
  }, []);

  const handleImageUpload = (e) => {
    console.log(e.target.files, "image");
    const file = e.target.files[0];
    setGalleryFiles((prevFiles) => [...prevFiles, file]);
    const reader = new FileReader();
    reader.onload = () => {
      const imageDataUrl = reader.result;
      setImages((prevImages) => [...prevImages, imageDataUrl]);
    };
    reader.readAsDataURL(file);
    // setFile(image);
  };

  const handleFeaturedImageUpload = (e) => {
    const file = e.target.files[0];
    setFeaturedImageFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      const imageDataUrl = reader.result;
      setFeaturedImage(imageDataUrl);
    };
    reader.readAsDataURL(file);
    // setFile(image);
  };

  const handleRemoveImage = (indexToRemove) => {
    setImages((prevImages) =>
      prevImages.filter((image, index) => index !== indexToRemove)
    );
    setGalleryFiles((prevImages) =>
      prevImages.filter((image, index) => index !== indexToRemove)
    );
  };

  const handleRemoveFeaturedImage = () => {
    setFeaturedImage(null);
    setFeaturedImageFile(null);
  };

  const addProduct = () => {
    setLoading(true);
    const url = `${apiURL}/products`;
    const formData = new FormData();
    let finalSize = selectSize;
    if (selectSize === "foot" && footSize) {
      finalSize = `${selectSize}-${footSize}`;
    }
    formData.append("name", name);
    formData.append("quantity", quantity);
    formData.append("size", finalSize);
    // formData.append("unit", selectUnit);
    formData.append("categoryId", categoryId);
    formData.append("subCategoryId", subCategoryId);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("currency", "NGN");
    formData.append("manufacturer", manufacturer);
    galleryFiles.forEach((image) => {
      formData.append("product_images", image);
    });
    formData.append("featured_image", featuredImageFile);
    setTimeout(() => {
      setLoading(false);
      axios
        .post(url, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response, "response from adding products");
          if (response.status === 201) {
            setPreview(true);
            setAddProductData(initialValue);
            setFeaturedImage(null);
            setFeaturedImageFile(null);
            setImages([]);
            setGalleryFiles([]);
          }
        });
    }, 2000);
  };
  return (
    <>
      <div className="mt-3 bg-[#EF4444]/[12%] p-3 font-primaryMedium text-xs leading-5">
        Showcase quality your product quality and build trust with potential
        buyers by offering a sample product for evaluation!
      </div>
      <form
        onSubmit={handleSubmit(addProduct)}
        className="w-full flex flex-col overflow-y-scroll my-4 md:my-6 font-primaryRegular"
      >
        <div className="w-full flex flex-col md:flex-row items-stretch justify-between gap-5 md:gap-20">
          {/* form one */}
          <div
            className="w-full p-[20px] min-h-[100vh] md:rounded-[10px]
         border-[1px] border-[#CFCBCB] md:max-w-[426px]"
          >
            <b className="text-[16px]">Featured Image</b>
            <p className="text-[16px]">
              Upload your product featured image here. Image size should not be
              more than 2 MB
            </p>
            <br />
            {/* Featured Images */}
            <div className="w-full min-h-[300px] bg-white p-[20px] flex flex-col">
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
                    onChange={handleFeaturedImageUpload}
                    style={{ display: "none" }}
                  />
                </label>
                <p className="max-w-[217px]">or drag and drop PNG, JPG</p>
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
            <br />
            <b className="text-[16px]">Gallery</b>
            <p className="text-[16px]">
              Upload your product image gallery here. Image size should not be
              more than  2 MB
            </p>
            <br />
            <div className="w-full min-h-[221px] bg-white p-[20px] flex flex-col">
              <div className="w-full h-[94px] border-[2px] border-dashed border-[#CFCBCB] flex flex-col items-center justify-center p-[10px]">
                <FiUploadCloud size={24} />
                <label
                  htmlFor="fileInput"
                  className="text-[#359E52] cursor-pointer active:opacity-5"
                >
                  Upload an Image
                  <input
                    id="fileInput"
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={handleImageUpload}
                    style={{ display: "none" }}
                    multiple
                  />
                </label>
                <p className="max-w-[217px]">or drag and drop PNG, JPG</p>
              </div>
              <br />
              <div className="w-full flex flex-row flex-wrap gap-5">
                {images.map((imageDataUrl, index) => (
                  <div
                    key={index}
                    className="w-[71px] h-[56px] border-[0.94px] border-[#359E52] relative"
                    style={{
                      backgroundImage: `url(${imageDataUrl})`,
                      backgroundSize: "cover",
                    }}
                  >
                    <div className="w-[20px] h-[20px] bg-[#eaeaea] cursor-pointer active:opacity-5 rounded-[100px] flex items-center justify-center absolute right-[-5px] top-[-5px]">
                      <button onClick={() => handleRemoveImage(index)}>
                        <XIcon width={12} height={12} color="red" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* form two */}
          <div className="w-full p-5 min-h-[100vh] md:rounded-xl border bg-white grid">
            <div>
              <label className="text-base">Product Type</label>
              <input
                type="text"
                className="w-full border border-[#CFCBCB] p-3 my-2"
                placeholder="Name of item"
                name="name"
                value={name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="text-base">Product Name</label>
              <input
                type="text"
                className="w-full border border-[#CFCBCB] p-3 my-2"
                placeholder="Name of item"
                name="name"
                value={name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="text-base">Category</label>
              <Categories onForm={handleCategoryInfo} />
            </div>
            <div>
              <label className="text-base">Quantity (in units)</label>
              <input
                type="number"
                className="w-full border border-[#CFCBCB] p-3 my-2"
                placeholder="Number of item"
                name="quantity"
                value={quantity}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="text-base">Size</label>
              <select
                className="w-full border border-[#CFCBCB] p-3 my-2"
                name="size"
                value={selectSize}
                onChange={handleSizeChange}
              >
                <option value="">Select Size</option>
                <option value="gm">Gram</option>
                <option value="kg">Kilogram</option>
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
                <option value="xtraLarge">Xtra Large</option>
                <option value="foot">Foot</option>
              </select>

              {showFootSizes && (
                <select
                  className="w-full border border-[#CFCBCB] p-3 my-2"
                  name="footSize"
                  value={footSize}
                  onChange={handleFootSizeChange}
                >
                  <option value="">Select Foot Size</option>
                  <option value="36">Size 36</option>
                  <option value="38">Size 38</option>
                  <option value="39">Size 39</option>
                  <option value="40">Size 40</option>
                  <option value="41">Size 41</option>
                  <option value="42">Size 42</option>
                  <option value="43">Size 43</option>
                  <option value="44">Size 44</option>
                  <option value="45">Size 45</option>
                  <option value="46">Size 46</option>
                </select>
              )}
            </div>
            <div className="mb-4">
              <label className="text-base">Color</label>
              <ColorSelect />
            </div>
            {/* <div>
          <label className="text-base">Unit</label>
          <select
            className="w-full border border-[#CFCBCB] p-3 my-2"
            name="selectUnit"
            value={selectUnit}
            onChange={handleUnitChange}
          >
            <option value="">Select Unit</option>
            <option value="units">Units</option>
            <option value="cartons">Cartons</option>
          </select>
        </div> */}
            <div>
              <label className="text-base">Manufacturer</label>
              <input
                type="text"
                className="w-full border border-[#CFCBCB] p-3 my-2"
                placeholder="Input Brand Name"
                name="manufacturer"
                value={manufacturer}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="text-base">Price</label>
              <input
                type="number"
                className="w-full border border-[#CFCBCB] p-3 my-2"
                placeholder="Price per item"
                name="price"
                value={price}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="text-base">Product Description</label>
              <textarea
                className="w-full border border-[#CFCBCB] p-3 my-2"
                placeholder="Enter product description"
                name="description"
                value={description}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>
        </div>
        <div className="w-full flex items-center justify-between my-10">
          <div></div>
          {/* <button
            onClick={(e) => {
              e.preventDefault();
              // Add your logic to save as draft here
            }}
            className="w-[168px] md:w-[221px] h-[46px] border border-[#CFCBCB] bg-white font-primarySemibold text-black rounded-md"
          >
            Save as draft
          </button> */}
          <button
            type="submit"
            // onClick={() => setPreview(true)}
            className="w-[168px] md:w-[221px] h-[46px] bg-white rounded-md border border-[#359E52] text-[#359E52] flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <svg
                className="animate-spin h-6 w-6 text-black"
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
            ) : (
              "Publish"
            )}
          </button>
        </div>
      </form>
    </>
  );
};

export default AddSampleProduct;
