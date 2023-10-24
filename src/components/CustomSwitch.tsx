import React from 'react';
import Switch from 'react-switch';

function CustomSwitch({
  onChange,
  checked,
}: {
  onChange: () => void;
  checked: boolean;
}) {
  return (
    <Switch
      onChange={onChange}
      checked={checked}
      checkedIcon={false}
      uncheckedIcon={false}
      width={42}
      height={25}
      onColor="#8D4BF6"
      offColor="#d2d2d2"
    />
  );
}

export default CustomSwitch;
