import { Checkbox, Chip } from '@mui/material';
import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';
import { StyledIconWrapper } from '@/components/style';
import { ChangeEvent, MouseEvent } from 'react';
import TodoStore from '@/store/TodoStore';
import { TodoModel } from '@/models/TodoModel';
import { observer } from 'mobx-react-lite';
import Star from '@/components/Star';
import UiStore from '@/store/UiStore';
import { isMobile } from '@/util/isMobile';

export interface CardProps {
  card: TodoModel;
}

const Card = observer(({ card }: CardProps) => {
  const handleCheckBoxClick = (event: ChangeEvent<HTMLInputElement>) => {
    const copiedCard = { ...card, checked: event.target.checked };
    TodoStore.updateCard(copiedCard);
  };

  const handleBookMarkChange = () => {
    const copiedCard = { ...card, isBookMarked: !card.isBookMarked };
    TodoStore.updateCard(copiedCard);
  };

  const handleCardDelete = () => {
    TodoStore.setSelectedCard(card);
    UiStore.handleDialogVisible('delete', true);
  };

  const handleChipClick = (event: MouseEvent<HTMLDivElement>) => {
    UiStore.handleCalendarPosition(event.clientY, event.clientX);
    UiStore.handleCalendarVisible(true);
    TodoStore.setSelectedCard(card);
  };

  return (
    <StyledCard checked={card.checked} $isbookmarked={card.isBookMarked}>
      <StyledCardLeft>
        <StyledCheckBox
          onChange={handleCheckBoxClick}
          checked={card.checked}
          size="large"
        />
        <StyledStrong checked={card.checked}>{card.title}</StyledStrong>
        {!isMobile() && (
          <Chip
            label={card.date || '날짜를 선택해 주세요'}
            onClick={handleChipClick}
            clickable
          />
        )}
      </StyledCardLeft>

      <StyledCardRight>
        {!card.checked && (
          <Star
            $isbookmarked={card.isBookMarked}
            handleClick={handleBookMarkChange}
          />
        )}

        <StyledIconWrapper onClick={handleCardDelete}>
          <CloseIcon fontSize="large" />
        </StyledIconWrapper>
      </StyledCardRight>
    </StyledCard>
  );
});

export default Card;

const StyledCard = styled.div<{ checked?: boolean; $isbookmarked?: boolean }>`
  display: flex;
  width: calc(100% - 2px);
  height: 65px;
  border: 1px solid black;
  align-items: center;
  justify-content: space-between;
  background-color: ${props =>
    props.checked ? '#E2E2E2' : props.$isbookmarked ? '#daeefa' : 'white'};
`;

const StyledCardLeft = styled.div`
  display: flex;
  align-items: center;
  & > :nth-child(n + 2) {
    margin-left: 15px;
  }
`;

const StyledCheckBox = styled(Checkbox)`
  &.MuiCheckbox-root.Mui-checked {
    color: #0064ff;
  }
`;
const StyledCardRight = styled.div`
  display: flex;
  align-items: center;
`;

const StyledStrong = styled.strong<{ checked?: boolean }>`
  text-decoration: ${props => (props.checked ? 'line-through' : '')};
`;
