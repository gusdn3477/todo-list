import InputField from '@/components/InputField';
import Card from '@/components/Card';
import styled from 'styled-components';

const TodoList = () => {
  return (
    <>
      <StyledHeader>
        <InputField />
      </StyledHeader>
      <InputField />
      <Card />
    </>
  );
};

export default TodoList;

const StyledHeader = styled.div`
  width: 100%;
  background-color: blue;
`;
