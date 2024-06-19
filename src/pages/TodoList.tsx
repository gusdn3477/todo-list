import InputField from '@/components/InputField';
import styled from 'styled-components';
import { KeyboardEvent, ChangeEvent, useEffect } from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';
import CardStore from '@/store/CardStore';
import Card from '@/components/Card';

const TodoList = observer(() => {
  const store = useLocalObservable(() => ({
    title: '',
    taskName: '',
    lastIdx: 0,
  }));

  const handleContentsChange =
    (type: 'title' | 'taskName') => (event: ChangeEvent<HTMLInputElement>) => {
      if (type === 'title') store[type] = event.target.value;
      else store[type] = event.target.value;
    };

  const handleEnterKeyPress =
    (type: 'title' | 'taskName') => (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        if (type === 'title') {
          console.log('엔터 키 입력');
        } else {
          if (store.taskName.length > 0) {
            CardStore.addCard({
              id: store.lastIdx++,
              checked: false,
              title: store.taskName,
              date: new Date().toISOString(),
              isBookMakred: false,
              tagColor: '',
            });
            store.taskName = '';
          }
        }
      }
    };

  useEffect(() => {
    CardStore.fetchCardList();
  }, []);

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
      {CardStore.cardList.map(card => (
        <Card card={card} key={card.id} />
      ))}
    </>
  );
});

export default TodoList;

const StyledHeader = styled.div`
  width: 100%;
  background-color: blue;
`;
