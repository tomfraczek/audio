// @flow
import React, {Component} from 'react';
import {localisedCertificateEndpoint} from '../../config/config';

type PropsType = {
  email: string,
  t: (string) => string,
  courseId: string,
  language: string,
  firstName: string,
  lastName: string,
};

type StateType = {
  certificateIsSent: boolean,
  error: string,
};

class CourseCertificate extends Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state ={
      certificateIsSent: false,
      error: '',
    };
  }
  handleSentCertificate = () => {
    this.setState({
      certificateIsSent: true,
    });
  }
  handleError = () => {
    this.setState({
      certificateIsSent: false,
      error: `Sorry, something went wrong. Either try again, 
        or if the problem persists contact us.`,
    });
  }
  handleClick = () => {
    postCertificateRequest(this.props).then((res: boolean): void => {
      if (res) {
        return this.handleSentCertificate();
      }
    });
  }
  render(): * {
    return (
      <div>
        <h4>{this.props.t('certificate')}</h4>
        <p>
          {this.props.t('congratulationsCompletingCourse')}
        </p>
        {
          this.state.certificateIsSent
            ? <div>Sent!</div>
            : (
              <button onClick={(): void => this.handleClick()}>
                {this.props.t('emailTo')} {this.props.email}
              </button>
            )
        }
      </div>
    );
  }
}

type PostCertificateRequestType = {
  email: string,
  courseId: string,
  language: string,
  firstName: string,
  lastName: string,
};

const postCertificateRequest = ({
  email,
  courseId,
  language,
  firstName,
  lastName,
}: PostCertificateRequestType): * => {
  const body = {
    email: email,
    name: {
      first_name: firstName,
      last_name: lastName,
    },
    course: {
      nid: courseId,
    },
    language: language,
    country: 'gb',
  };
  const url = localisedCertificateEndpoint(language);
  return req(url, body).then((res: any): boolean => {
    return true;
  }).catch((err: any): boolean => false);
};

type BodyType = {
  email: string,
  name: {
    first_name: string,
    last_name: string,
  },
  course: {
    nid: string,
  },
  language: string,
  country: 'gb',
};

const req = (url: string, body: BodyType): * => fetch(url, {
  body: JSON.stringify(body),
  cache: 'no-cache',
  method: 'POST',
  mode: 'cors',
  headers: {
    'content-type': 'application/json',
  },
});

export default CourseCertificate;
