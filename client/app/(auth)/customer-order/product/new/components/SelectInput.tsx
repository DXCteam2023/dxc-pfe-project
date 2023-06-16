import React from "react";

import Select from "react-select";

type OptionType = { value: string; label: string };

type PropsType = {
  options: Array<OptionType>;
  selected: Array<OptionType>;
  onChange: (options: any) => void;
};

const SelectInput = ({ options, selected, onChange }: PropsType) => (
  <Select
    isMulti
    options={options}
    className="basic-multi-select"
    classNamePrefix="select"
    onChange={onChange}
    value={selected}
  />
);

export default SelectInput;
