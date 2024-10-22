import React, { useState } from "react";
import Select, { components } from "react-select";

// Define the color options
const options = [
  { value: "red", label: "Red", color: "#FF0000" },
  { value: "blue", label: "Blue", color: "#0000FF" },
  { value: "green", label: "Green", color: "#008000" },
  { value: "yellow", label: "Yellow", color: "#FFFF00" },
  { value: "orange", label: "Orange", color: "#FFA500" },
  { value: "purple", label: "Purple", color: "#800080" },
  { value: "pink", label: "Pink", color: "#FFC0CB" },
  { value: "brown", label: "Brown", color: "#A52A2A" },
  { value: "black", label: "Black", color: "#000000" },
  { value: "white", label: "White", color: "#FFFFFF" },
  { value: "gray", label: "Gray", color: "#808080" },
  { value: "cyan", label: "Cyan", color: "#00FFFF" },
  { value: "magenta", label: "Magenta", color: "#FF00FF" },
  { value: "maroon", label: "Maroon", color: "#800000" },
  { value: "navy", label: "Navy", color: "#000080" },
  { value: "olive", label: "Olive", color: "#808000" },
  { value: "teal", label: "Teal", color: "#008080" },
  { value: "beige", label: "Beige", color: "#F5F5DC" },
  { value: "coral", label: "Coral", color: "#FF7F50" },
  { value: "turquoise", label: "Turquoise", color: "#40E0D0" },
  { value: "none", label: "None", color: "#FFFFFF" },
];

// Custom styles for the color indicator
const customStyles = {
  option: (styles, { data }) => ({
    ...styles,
    display: "flex",
    alignItems: "center",
    color: "black",
  }),
  singleValue: (styles) => ({
    ...styles,
    color: "black",
  }),
  multiValue: (styles) => ({
    ...styles,
    display: "flex",
    alignItems: "center",
  }),
  multiValueLabel: (styles) => ({
    ...styles,
    color: "black",
  }),
  multiValueRemove: (styles) => ({
    ...styles,
    color: "black",
    ":hover": {
      backgroundColor: "red",
      color: "white",
    },
  }),
};

// Custom component for displaying color indicator
const ColourOption = (props) => (
  <components.Option {...props}>
    <div style={{ display: "flex", alignItems: "center" }}>
      <div
        style={{
          width: 20,
          height: 20,
          backgroundColor: props.data.color,
          marginRight: 10,
        }}
      ></div>
      {props.data.label}
    </div>
  </components.Option>
);

const ColorSelect = ({ onForm }) => {
  const [inputValue, setValue] = useState("");
  const [selectedValue, setSelectedValue] = useState(null);
  const [colors, setColors] = useState([]);

  // handle input change event
  const handleInputChange = (value) => {
    // onMessage(value);
    setValue(value);
  };

  const handleChange = (value) => {
    console.log(value, "values");
    onForm(value);
    setSelectedValue(value);
  };

  return (
    <div className="mb-4">
      {/* <label className="text-base">Color</label> */}
      <Select
        options={options}
        // isMulti
        styles={customStyles}
        components={{ Option: ColourOption }}
        placeholder="Select colors"
        onChange={handleChange}
        onInputChange={handleInputChange}
      />
    </div>
  );
};

export default ColorSelect;
