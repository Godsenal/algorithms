import React, { useState } from "react";
import { Select } from "antd";

const Option = Select.Option;

const data = ["zzzz", "gggg", "aaaa", "bbbb"];
const SelectTag = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [options, setOptions] = useState(data);
  const handleChange = (value: string[]) => {
    setSelectedItems(value);
  };
  const handleSearch = (value: string) => {
    setTimeout(() => {
      const reg = new RegExp(value);
      setOptions(data.filter(item => item.match(reg)));
    }, 1000);
  };
  return (
    <Select
      mode="multiple"
      value={selectedItems}
      style={{ width: "100%" }}
      placeholder="Select Tags"
      onChange={handleChange}
      onSearch={handleSearch}
    >
      {options.map((value, i) => (
        <Option key={i}>{value}</Option>
      ))}
    </Select>
  );
};

export default SelectTag;
