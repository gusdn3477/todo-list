import InputField from '@/components/InputField';
import styled from 'styled-components';
import { KeyboardEvent, ChangeEvent, useEffect, useRef } from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';
import TodoStore from '@/store/TodoStore';
import Card from '@/components/Card';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import UiStore from '@/store/UiStore';
import { MouseEvent } from 'react';
import { ConfirmDialog } from '@/components/ConfirmDialog';
import { Button } from '@mui/material';

const TodoList = observer(() => {
  const store = useLocalObservable(() => ({
    title: localStorage.getItem('title') || '',
    taskName: '',
    disabled: localStorage.getItem('title') ? true : false,
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
      if (type === 'title')
        event.target.value.length <= 10 && (store[type] = event.target.value);
      else
        event.target.value.length <= 15 && (store[type] = event.target.value);
    };

  const handleEnterKeyPress =
    (type: 'title' | 'taskName') => (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        if (type === 'title' && store.title.length > 0) {
          localStorage.setItem('title', store.title);
          store.disabled = true;
        } else {
          if (store.taskName.length > 0) {
            TodoStore.addCard({
              id: TodoStore.lastCardIndex,
              checked: false,
              title: store.taskName,
              isBookMarked: false,
            });
            store.taskName = '';
          }
        }
      }
    };

  const handleCardDelete = () => {
    TodoStore.deleteCard(TodoStore.selectedCard.id);
    UiStore.handleDialogVisible('delete', false);
  };

  const handleReset = () => {
    localStorage.clear();
    UiStore.init();
    TodoStore.init();
    store.title = '';
    store.taskName = '';
    store.disabled = false;
  };

  const handleClickDay = (value: Date) => {
    UiStore.handleCalendarVisible(false);
    const card = {
      ...TodoStore.selectedCard,
      date: value.toLocaleDateString(),
    };
    TodoStore.updateCard(card);
  };

  useEffect(() => {
    TodoStore.fetchLastData();
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
          placeholder="제목을 입력해 주세요. (최대 10자)"
          handleEnterKeyPress={handleEnterKeyPress('title')}
          disabled={store.disabled}
        />
        <StyledButton
          onClick={() => UiStore.handleDialogVisible('reset', true)}
        >
          초기화
        </StyledButton>
      </StyledHeader>
      <InputField
        contents={store.taskName}
        handleContentsChange={handleContentsChange('taskName')}
        placeholder="할 일을 입력해 주세요. (최대 15자)"
        handleEnterKeyPress={handleEnterKeyPress('taskName')}
      />
      {TodoStore.bookMarkedList.map(card => (
        <Card card={card} key={`bookmark_${card.id}`} />
      ))}

      {TodoStore.normalList.map(card => (
        <Card card={card} key={`normal_${card.id}`} />
      ))}

      {TodoStore.checkedList.map(card => (
        <Card card={card} key={`checked_${card.id}`} />
      ))}

      {UiStore.calendarOpen && (
        <StyledCalendarWrapper
          ref={calendarRef}
          top={UiStore.calendarPosition.top}
          left={UiStore.calendarPosition.left}
        >
          <Calendar
            value={
              TodoStore.selectedCard?.date &&
              new Date(TodoStore.selectedCard.date)
            }
            onClickDay={handleClickDay}
          />
        </StyledCalendarWrapper>
      )}
      <ConfirmDialog
        title={'일정을 삭제하시겠습니까?'}
        contents={'삭제한 일정은 복구할 수 없습니다.'}
        open={UiStore.deleteConfirmDialogOpen}
        handleClose={() => UiStore.handleDialogVisible('delete', false)}
        handleConfirm={handleCardDelete}
      />
      <ConfirmDialog
        title={'일정을 초기화하시겠습니까?'}
        contents={
          '모든 데이터가 삭제되며 초기화된 데이터는 복구할 수 없습니다.'
        }
        open={UiStore.resetConfirmDialogOpen}
        handleClose={() => UiStore.handleDialogVisible('reset', false)}
        handleConfirm={handleReset}
        confirmText={'초기화'}
      />
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

const StyledButton = styled(Button)`
  &.MuiButtonBase-root {
    background-color: #0064ff;
    color: white;
    width: 120px;
    border-radius: 8px;

    &:hover {
      background-color: #0064ff;
    }
    &:active {
      background-color: #0064ff;
    }
  }
  height: 40px;
`;
