/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Container } from './style';
import ReactSelect, { SingleValue } from 'react-select';

const customStyles: any = {
  control: (provided: any) => ({
    ...provided,
    border: '1px solid var(--gray3, #DDD)',
    color: '#FFF',
    borderRadius: '0.2rem',
    boxShadow: 'none',
    fontSize: '0.875rem',
  }),
  option: (provided: any, { isSelected }: { isSelected: boolean }) => ({
    ...provided,
    padding: '0.6rem',
    cursor: 'pointer',
    fontSize: '0.875rem',
    borderRadius: '0.1875rem',
    fontWeight: isSelected ? '500' : ' 400',
    background: isSelected ? 'var(--color-primary)' : ' #FFF',
    color: isSelected ? '#FFF' : ' var(--gray1, #333)',
    ':hover': {
      ...provided[':hover'],
      backgroundColor: !isSelected && '#F4F4F4',
    },
  }),
  indicatorSeparator: (provided: any) => ({
    ...provided,
    display: 'none',
  }),
  singleValue: (provided: any) => ({
    ...provided,
  }),
  input: (provided: any) => ({
    ...provided,
  }),
  menu: (provided: any) => ({
    ...provided,
  }),
};

function Select({
  onChange,
  options,
  placeholder,
  defaultValue,
}: {
  onChange: (newValue: SingleValue<{ label: string; value: string }>) => void;
  options: { label: string; value: string }[];
  placeholder?: string;
  defaultValue?: { label: string; value: string };
}) {
  return (
    <Container>
      <ReactSelect
        onChange={onChange}
        options={options}
        placeholder={placeholder}
        styles={customStyles}
        defaultValue={defaultValue}
      />
    </Container>
  );
}

export default Select;
