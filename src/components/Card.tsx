import { Checkbox } from '@mui/material';
import styled from 'styled-components';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import CloseIcon from '@mui/icons-material/Close';
import SellIcon from '@mui/icons-material/Sell';
import { StyledIconWrapper } from '@/components/style';
import { ChangeEvent } from 'react';

export interface CardProps {
  id: number;
  checked: boolean;
  title: string;
  date: string;
  isBookMarked: boolean;
  tagColor?: string;
}

const Card = ({ id, checked, title, date, isBookMarked }: CardProps) => {
  const handleCheckBoxClick = (
    id: number,
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    console.log(event.target.checked);
  };

  const handleCardDelete = (id: number) => {
    // id를 가지고 스토어에서 해당 카드 삭제
  };
  return (
    <StyledCard>
      <StyledCardLeft>
        <Checkbox
          onChange={event => handleCheckBoxClick(id, event)}
          checked={checked}
          size="large"
        />
        <strong>{title}</strong>
        <span>{date}</span>
      </StyledCardLeft>

      <StyledCardRight>
        <StyledIconWrapper>
          <StarBorderIcon fontSize="large" />
        </StyledIconWrapper>
        <StyledIconWrapper>
          <SellIcon fontSize="large" />
        </StyledIconWrapper>
        <StyledIconWrapper onClick={() => handleCardDelete(id)}>
          <CloseIcon fontSize="large" />
        </StyledIconWrapper>
      </StyledCardRight>
    </StyledCard>
  );
};

export default Card;

const StyledCard = styled.div`
  display: flex;
  width: 100%;
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
