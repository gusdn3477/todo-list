import InputField from '@/components/InputField';
import Card from '@/components/Card';
import styled from 'styled-components';
import * as T from '@/types/Card';
import { useCallback, useState, KeyboardEvent, ChangeEvent } from 'react';

const data: T.Card = {
  id: 0,
  checked: false,
  title: '123',
  date: '2022-02-02',
  isBookMarked: false,
  tagColor: 'red',
};

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
      <Card
        id={data.id}
        checked={data.checked}
        title={data.title}
        date={data.date}
        isBookMarked={data.isBookMarked}
        tagColor={data.tagColor}
      />
    </>
  );
};

export default TodoList;

const StyledHeader = styled.div`
  width: 100%;
  background-color: blue;
`;
