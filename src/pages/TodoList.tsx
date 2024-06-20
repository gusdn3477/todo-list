import InputField from '@/components/InputField';
import styled from 'styled-components';
import { KeyboardEvent, ChangeEvent, useEffect, useRef } from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';
import CardStore from '@/store/CardStore';
import Card from '@/components/Card';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import UiStore from '@/store/UiStore';
import { MouseEvent } from 'react';

const TodoList = observer(() => {
  const store = useLocalObservable(() => ({
    title: '',
    taskName: '',
    // TODO: DB로 관리 필요
    lastIdx: 0,
  }));

  const calendarRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent<Document>) => {
    if (
      calendarRef.current &&
      !calendarRef.current.contains(event.target as Node)
    ) {
      UiStore.handleCalendarVisible(false);
    }
  };

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
              isBookMarked: false,
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

  useEffect(() => {
    document.addEventListener(
      'mousedown',
      handleClickOutside as unknown as EventListener,
    );
    return () => {
      document.removeEventListener(
        'mousedown',
        handleClickOutside as unknown as EventListener,
      );
    };
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
      {CardStore.bookMarkedList.map(card => (
        <Card card={card} key={`bookmark_${card.id}`} />
      ))}

      {CardStore.normalList.map(card => (
        <Card card={card} key={`normal_${card.id}`} />
      ))}

      {CardStore.completedList.map(card => (
        <Card card={card} key={`completed_${card.id}`} />
      ))}

      {UiStore.calendarOpen && (
        <StyledCalendarWrapper
          ref={calendarRef}
          top={UiStore.calendarPosition.top}
          left={UiStore.calendarPosition.left}
        >
          <Calendar onClickDay={e => console.log(e)} />
        </StyledCalendarWrapper>
      )}
    </>
  );
});

export default TodoList;

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background-color: skyblue;
`;

const StyledCalendarWrapper = styled.div<{ top: number; left: number }>`
  position: absolute;
  top: ${props => props.top}px;
  left: ${props => props.left}px;
  z-index: 1000;
`;
