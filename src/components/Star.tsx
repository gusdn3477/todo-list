import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { StyledIconWrapper } from '@/components/style';

interface StarProps {
  $isbookmarked?: boolean;
  handleClick?: () => void;
}
const Star = ({ $isbookmarked, handleClick }: StarProps) => {
  return (
    <StyledIconWrapper onClick={handleClick}>
      {$isbookmarked ? (
        <StarIcon fontSize="large" color="info" />
      ) : (
        <StarBorderIcon fontSize="large" />
      )}
    </StyledIconWrapper>
  );
};

export default Star;
