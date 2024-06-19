import InputField from '@/components/InputField';
import styled from 'styled-components';
import { KeyboardEvent, ChangeEvent } from 'react';
import CardList from '@/components/CardList';
import { observer, useLocalObservable } from 'mobx-react-lite';

const TodoList = observer(() => {
  const store = useLocalObservable(() => ({
    title: '',
    taskName: '',
  }));

  const handleContentsChange =
    (type: 'title' | 'taskName') => (event: ChangeEvent<HTMLInputElement>) => {
      if (type === 'title') store[type] = event.target.value;
      else store[type] = event.target.value;
    };

  const handleEnterKeyPress =
    (type: 'title' | 'taskName') => (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        if (type === 'title') console.log('제목 변경');
        else console.log('새로운 태스크 추가');
      }
    };

  return (
    <>
      <StyledHeader>
        <InputField
          contents={store.title}
          handleContentsChange={handleContentsChange('title')}
          placeholder={store.title}
          handleEnterKeyPress={handleEnterKeyPress('title')}
        />
      </StyledHeader>
      <InputField
        contents={store.taskName}
        handleContentsChange={handleContentsChange('taskName')}
        placeholder="할 일을 입력해 주세요."
        handleEnterKeyPress={handleEnterKeyPress('taskName')}
      />
      <CardList />
    </>
  );
});

export default TodoList;

const StyledHeader = styled.div`
  width: 100%;
  background-color: blue;
`;
