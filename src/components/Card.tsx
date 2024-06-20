import { Checkbox, Chip } from '@mui/material';
import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';
import { StyledIconWrapper } from '@/components/style';
import { ChangeEvent, MouseEvent } from 'react';
import CardStore from '@/store/CardStore';
import { CardModel } from '@/models/CardModel';
import { observer } from 'mobx-react-lite';
import Star from '@/components/Star';
import UiStore from '@/store/UiStore';

export interface CardProps {
  card: CardModel;
}

const Card = observer(({ card }: CardProps) => {
  const handleCheckBoxClick = (
    id: number,
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    CardStore.toggleChecked(id, event.target.checked);
  };

  const handleBookMarkChange = (id: number) => {
    CardStore.toggleBookMark(id);
  };

  const handleCardDelete = () => {
    CardStore.setSelectedCard(card);
    UiStore.handleDialogVisible(true);
  };

  const handleChipClick = (event: MouseEvent<HTMLDivElement>) => {
    UiStore.handleCalendarPosition(event.clientY, event.clientX);
    UiStore.handleCalendarVisible(true);
    CardStore.setSelectedCard(card);
  };

  return (
    <StyledCard checked={card.checked} $isbookmarked={card.isBookMarked}>
      <StyledCardLeft>
        <Checkbox
          onChange={event => handleCheckBoxClick(card.id, event)}
          checked={card.checked}
          size="large"
        />
        <StyledStrong checked={card.checked}>{card.title}</StyledStrong>
        <Chip
          label={card.date || '날짜를 선택해 주세요'}
          onClick={handleChipClick}
          clickable
        />
      </StyledCardLeft>

      <StyledCardRight>
        {!card.checked && (
          <Star
            $isbookmarked={card.isBookMarked}
            handleClick={() => handleBookMarkChange(card.id)}
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

const StyledCardRight = styled.div`
  display: flex;
  align-items: center;
`;

const StyledStrong = styled.strong<{ checked?: boolean }>`
  text-decoration: ${props => (props.checked ? 'line-through' : '')};
`;
