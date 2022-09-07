import React from 'react';
import AnswersList from './AnswersList.jsx';


class QandAElement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      helpfulness: this.props.qa.question_helpfulness
    }
    this.plusOne = this.plusOne.bind(this);
    this.addAnswer = this.addAnswer.bind(this);
  }

  plusOne(e) {
    this.setState((state) => {
      return {helpfulness: state.helpfulness + 1}
    })
  }

  addAnswer(e) {
    console.log('add answer for this question');
  }


  render() {
    var qa = this.props.qa; // one question and the corresponding answer list
    return (
      <div>
        {/* one question */}
        <div className='QA-Q' data-testid={qa.question_id}>Q: {qa.question_body}
          <span className='QA-4in1'>
            <span className='QA-helpful-text'>Helpful?</span>
            <span className='QA-yes' onClick={() => this.plusOne()}>yes</span>
            <span className='QA-helpfulness'>({this.state.helpfulness}) |</span>
            <span className='QA-addAnswer' onClick={() => this.addAnswer()}>Add Answer</span>
          </span>
        </div>
        {/* corresponding answer list */}
        <div>
          <span>A: </span>
          <AnswersList answersList={Object.values(qa.answers)} />
        </div>
      </div>
    )
  }

}

export default QandAElement;