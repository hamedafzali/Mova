import * as React from "react";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
const ButtonGroup = ({ data, selected, setSelected }) => {
  const handleChange = (event, size) => {
    setSelected(size);
  };
  const control = {
    value: selected,
    onChange: handleChange,
    exclusive: true,
  };
  return (
    <ToggleButtonGroup size="medium" {...control}>
      {data.map((i) => (
        <ToggleButton value={i} key={i}>
          {i}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export default ButtonGroup;
