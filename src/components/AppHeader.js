import React, { PropTypes } from 'react';

const AppHeader = (props) => {
  const { title } = props;

  return (
    <div style={styles.container}>
      <h1>{title}</h1>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

AppHeader.propTypes = {
  title: PropTypes.string.isRequired,
};

export default AppHeader;
