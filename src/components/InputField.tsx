import { TextField } from '@mui/material';
import { ChangeEvent, KeyboardEvent } from 'react';
import styled from 'styled-components';

interface InputFieldProps {
  contents: string;
  placeholder: string;
  handleContentsChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleEnterKeyPress: (event: KeyboardEvent<HTMLDivElement>) => void;
}

const InputField = ({
  placeholder,
  contents,
  handleContentsChange,
  handleEnterKeyPress,
}: InputFieldProps) => {
  return (
    <StyledTextField
      value={contents}
      onChange={handleContentsChange}
      onKeyDown={handleEnterKeyPress}
      placeholder={placeholder}
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
`;
