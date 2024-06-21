import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { StyledIconWrapper } from '@/components/style';
import styled from 'styled-components';

interface StarProps {
  $isbookmarked?: boolean;
  handleClick?: () => void;
}
const Star = ({ $isbookmarked, handleClick }: StarProps) => {
  return (
    <StyledIconWrapper onClick={handleClick}>
      {$isbookmarked ? (
        <StyledStarIcon fontSize="large" color="info" />
      ) : (
        <StarBorderIcon fontSize="large" />
      )}
    </StyledIconWrapper>
  );
};

export default Star;

const StyledStarIcon = styled(StarIcon)`
  &.MuiSvgIcon-root {
    color: #0064ff;
  }
`;
