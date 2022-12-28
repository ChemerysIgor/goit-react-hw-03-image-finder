import PropTypes from 'prop-types';

import { Button } from './ButtonStyled';
export const LoadMore = ({ MoreLoading }) => {
  console.log();
  return (
    <>
      <Button type="submit" onClick={MoreLoading}>
        Load More
      </Button>
    </>
  );
};
LoadMore.propTypes = { MoreLoading: PropTypes.func.isRequired };
