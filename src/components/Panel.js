import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class Panel extends Component {
  render() {
    const { config } = this.props;
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <Link to={`/quiz/${config.index}`} style={styles.link}>
            {config.title}
          </Link>
        </div>
        <div style={styles.body}>
          <Link to={`/quiz/${config.index}`} style={styles.placeholder} />
          <ul style={styles.ul}>
            <li style={styles.featureTitle}>{config.featureTitle} &#10003;</li>
            <li style={styles.featureDescription}>{config.featureDescription}</li>
          </ul>
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: '#94bcd9',
    color: '#665e5e',
    border: 'solid 2px',
    maxWidth: '27%',
    maxHeight: '75%',
  },
  header: {
    height: '20%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fcfcfc',
    borderBottom: 'solid 2px',
  },
  body: {
    height: '80%',
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholder: {
    backgroundColor: '#8e96ff',
    width: '50%',
    height: '40%',
    border: 'solid 2px',
  },
  ul: {
    paddingLeft: 0,
    listStyle: 'none',
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center',
  },
  featureTitle: {
    fontWeight: '700',
  },
  featureDescription: {
    maxWidth: '90%',
    fontSize: '0.8em',
  },
  link: {
    textDecoration: 'none',
    color: '#665e5e',
    fontWeight: '700',
  },
};

Panel.propTypes = {
  config: PropTypes.object.isRequired,
};

export default Panel;
