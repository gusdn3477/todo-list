import { Checkbox } from '@mui/material';
import styled from 'styled-components';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import CloseIcon from '@mui/icons-material/Close';
import SellIcon from '@mui/icons-material/Sell';

interface CardProps {
  checked?: boolean;
  title?: string;
  date?: string;
  isBookMarked?: boolean;
  tagColor?: string;
}

const Card = ({
  checked = false,
  title,
  date,
  isBookMarked = false,
  tagColor,
}: CardProps) => {
  return (
    <StyledCard>
      <StyledCardLeft>
        <Checkbox />
        <strong>{title}</strong>
        <div>{date}</div>
      </StyledCardLeft>
      <StyledCardRight>
        <StyledIconWrapper>
          <StarBorderIcon />
        </StyledIconWrapper>
        <StyledIconWrapper>
          <SellIcon />
        </StyledIconWrapper>
        <StyledIconWrapper>
          <CloseIcon />
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
`;

const StyledCardRight = styled.div`
  display: flex;
  align-items: center;
`;

const StyledIconWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  width: 35px;
  height: 35px;
`;
