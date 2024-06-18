import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { StyledIconWrapper } from '@/components/style';

interface StartProps {
  isBookMarked?: boolean;
  handleClick?: () => void;
}
const Star = ({ isBookMarked, handleClick }: StartProps) => {
  return (
    <StyledIconWrapper onClick={handleClick}>
      {isBookMarked ? <StarIcon /> : <StarBorderIcon />}
    </StyledIconWrapper>
  );
};

export default Star;
