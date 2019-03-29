import React from "react";
import { Select } from "antd";
import { observer } from "mobx-react-lite";
import { MODES } from "../constants/codemirror";
import { IMode } from "../models/codemirror";
import { SelectProps } from "antd/lib/select";

const Option = Select.Option;

interface ISelectModeProps extends SelectProps {
  mode: IMode;
  handleChange: (mode: IMode) => void;
}
const SelectMode: React.SFC<ISelectModeProps> = observer(
  ({ mode, handleChange, ...props }) => {
    return (
      <Select
        value={mode}
        style={{ width: 200 }}
        onChange={value => handleChange && handleChange(value as IMode)}
        {...props}
      >
        {MODES.map(mode => (
          <Option value={mode} key={mode}>
            {mode}
          </Option>
        ))}
      </Select>
    );
  }
);

export default SelectMode;
