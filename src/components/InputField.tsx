import { TextField } from '@mui/material';
import { useCallback, useState } from 'react';
import styled from 'styled-components';

const InputField = () => {
  const [contents, setContents] = useState('');
  const placeholder = `할 일을 입력해 주세요.`;

  const handleContentsChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setContents(event.target.value);
    },
    [],
  );

  return (
    <div>
      <StyledTextField
        value={contents}
        onChange={handleContentsChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputField;

const StyledTextField = styled(TextField)`
  & input {
    color: red;
  }

  &.MuiTextField-root {
    width: 100%;
  }
`;
