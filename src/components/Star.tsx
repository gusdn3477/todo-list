import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { StyledIconWrapper } from '@/components/style';

interface StarProps {
  isBookMarked?: boolean;
  handleClick?: () => void;
}
const Star = ({ isBookMarked, handleClick }: StarProps) => {
  return (
    <StyledIconWrapper onClick={handleClick}>
      {isBookMarked ? (
        <StarIcon fontSize="large" color="info" />
      ) : (
        <StarBorderIcon fontSize="large" />
      )}
    </StyledIconWrapper>
  );
};

export default Star;
