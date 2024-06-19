import InputField from '@/components/InputField';
import styled from 'styled-components';
import { useCallback, useState, KeyboardEvent, ChangeEvent } from 'react';
import CardList from '@/components/CardList';

const TodoList = () => {
  const [title, setTitle] = useState('');
  const [task, setTask] = useState('');

  const handleContentsChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setTitle(event.target.value);
    },
    [],
  );

  const handleEnterKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      console.log('엔터키 클릭');
    }
  };

  return (
    <>
      <StyledHeader>
        <InputField
          contents={title}
          handleContentsChange={handleContentsChange}
          placeholder="My to-do list 06/18/2024"
          handleEnterKeyPress={handleEnterKeyPress}
        />
      </StyledHeader>
      <InputField
        contents={task}
        handleContentsChange={handleContentsChange}
        placeholder="할 일을 입력해 주세요."
        handleEnterKeyPress={handleEnterKeyPress}
      />
      <CardList />
    </>
  );
};

export default TodoList;

const StyledHeader = styled.div`
  width: 100%;
  background-color: blue;
`;
