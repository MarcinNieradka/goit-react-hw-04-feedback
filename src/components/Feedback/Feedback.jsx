import React, { useState } from 'react';
import { FeedbackOptions, Statistics } from 'components';
import './Feedback.css';
import clsx from 'clsx';
import PropTypes from 'prop-types';

const Notification = ({ message }) => {
  return <>{message}</>;
};

const Section = ({ children }) => {
  return <div className={clsx('wrapper')}>{children}</div>;
};

const Feedback = ({ step = 1, initialValue = 0 }) => {
  const [state, setState] = useState({
    good: initialValue,
    neutral: initialValue,
    bad: initialValue,
  });

  const countTotalFeedback = () => state.good + state.neutral + state.bad;

  const countPositiveFeedbackPercentage = () =>
    Math.floor((state.good / countTotalFeedback()) * 100);

  const handleChange = e => {
    setState(prevState => ({
      ...prevState,
      [e]: prevState[e] + step,
    }));
  };

  const total = countTotalFeedback();
  const positivePercentage = countPositiveFeedbackPercentage();

  return (
    <Section title="">
      <h1>Please leave feedback </h1>
      <FeedbackOptions
        options={Object.keys(state)}
        onLeaveFeedback={handleChange}
      />
      <br /> <br />
      {countTotalFeedback() ? (
        <Statistics
          good={state.good}
          neutral={state.neutral}
          bad={state.bad}
          total={total}
          positivePercentage={positivePercentage}
        />
      ) : (
        <Notification message="There is no feedback" />
      )}
    </Section>
  );
};

Feedback.propTypes = {
  step: PropTypes.number.isRequired,
  initialValue: PropTypes.number.isRequired,
};

export default Feedback;
