import { Checkbox } from '@mui/material';
import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';
import SellIcon from '@mui/icons-material/Sell';
import { StyledIconWrapper } from '@/components/style';
import { ChangeEvent } from 'react';
import CardStore from '@/store/CardStore';
import { CardModel } from '@/models/CardModel';
import { observer } from 'mobx-react-lite';
import Star from '@/components/Star';

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

  const handleCardDelete = (id: number) => {
    CardStore.deleteCard(id);
    // id를 가지고 스토어에서 해당 카드 삭제
  };
  return (
    <StyledCard>
      <StyledCardLeft>
        <Checkbox
          onChange={event => handleCheckBoxClick(card.id, event)}
          checked={card.checked}
          size="large"
        />
        <strong>{card.title}</strong>
        <span>{card.date}</span>
      </StyledCardLeft>

      <StyledCardRight>
        <Star
          isBookMarked={card.isBookMakred}
          handleClick={() => handleBookMarkChange(card.id)}
        />
        {/* <StyledIconWrapper>
          <SellIcon fontSize="large" />
        </StyledIconWrapper> */}
        <StyledIconWrapper onClick={() => handleCardDelete(card.id)}>
          <CloseIcon fontSize="large" />
        </StyledIconWrapper>
      </StyledCardRight>
    </StyledCard>
  );
});

export default Card;

const StyledCard = styled.div`
  display: flex;
  width: calc(100% - 2px);
  height: 65px;
  border: 1px solid black;
  align-items: center;
  justify-content: space-between;
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
