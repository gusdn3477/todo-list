import { TextField } from '@mui/material';
import { ChangeEvent, KeyboardEvent } from 'react';
import styled from 'styled-components';

interface InputFieldProps {
  contents: string;
  placeholder: string;
  handleContentsChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleEnterKeyPress: (event: KeyboardEvent<HTMLDivElement>) => void;
  disabled?: boolean;
}

const InputField = ({
  placeholder,
  contents,
  handleContentsChange,
  handleEnterKeyPress,
  disabled,
}: InputFieldProps) => {
  return (
    <StyledTextField
      value={contents}
      onChange={handleContentsChange}
      onKeyDown={handleEnterKeyPress}
      placeholder={placeholder}
      disabled={disabled}
    />
  );
};

export default InputField;

const StyledTextField = styled(TextField)`
  & input {
    color: black;
  }

  &.MuiTextField-root {
    width: 100%;
  }

  & .MuiInputBase-input.Mui-disabled {
    color: black;
    font-size: 32px;
    -webkit-text-fill-color: black;
  }

  & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border: 1px solid black;
    }
  }
`;
