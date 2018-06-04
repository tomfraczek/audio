/* eslint-disable */


// 1. en,
// 2. de
const text = {
  // 'getCurrLangSpesh' is an escape hatch to get current chosen language
  'getCurrLang!': [
    'en',
    'de',
  ],
  // if key not found defaults to this
  txtErr: [
    'Error! Text not found',
    'Error! Text not found',
    'Error! Text not found',
    'Error! Text not found',
    'Error! Text not found',
    'Error! Text not found',
    'Error! Text not found',
  ],
  title: [
    'Learning',
    'Lernen',
  ],
  chooseCourse: [
    'Choose a course',
    'Wählen Sie einen Kurs',
  ],
  course: [
    'Course',
    'Kurs',
  ],
  about: [
    'About',
    'Über',
  ],
  signIn: [
    'Sign in',
    'Anmelden',
  ],
  signOut: [
    'Sign out',
    'Ausloggen',
  ],
  register: [
    'Register',
    'Registrieren',
  ],
  email: [
    'Email',
    '(DE) Email',
  ],
  password: [
    'Password',
    'Passwort',
  ],
  confirmPassword: [
    'Confirm password',
    'Bestätige das Passwort',
  ],
  loggingIn: [
    'Logging in...',
    'Einloggen',
  ],
  complete: [
    'Complete',
    'Komplett',
  ],
  checkAnswers: [
    'Check answers',
    'Antworten kontrollieren',
  ],
  resources: [
    'Resource',
    'Ressource',
  ],
  previous: [
    'Previous',
    'Bisherige',
  ],
  next: [
    'Next',
    'Nächster',
  ],
  selectAnswer: [
    'Select an answer',
    'Wählen Sie eine Antwort aus',
  ],
  changeLanguage: [
    'Change language',
    'Sprache ändern',
  ],
  chooseLanguage: [
    'Please choose a language',
    'Bitte wähle eine Sprache',
  ],
  english: [
    'English',
    'Englisch',
  ],
  german: [
    'German',
    'Deutsche',
  ],
  confirm: [
    'Confirm',
    'Bestätigen',
  ],
  languageHelp: [
    'Press confirm to save your changes',
    'Drücken Sie bestätigen, um Ihre Änderungen zu speichern',
  ],
  assessment: [
    'Assessment',
    'Bewertung',
  ],
  passMinimum: [
    'Pass minimum',
    'Pass minimum',
  ],
  passed: [
    'Passed',
    'Bestanden',
  ],
  failed: [
    'Failed',
    'Gescheitert',
  ],
  answerAll: [
    'You must answer every question',
    'Sie müssen jede Frage beantworten',
  ],
  missing: [
    'Missing',
    'Vermisst',
  ],
  tryAgain: [
    'Try again',
    'Versuch es noch einmal',
  ],
  congratulationsCompletingCourse: [
    'Congratulations on completing the course!',
    'Congratulations on completing the course!',
  ],
  certificate: [
    'Certificate',
    'Certificate de',
  ],
  emailTo: [
    'Email certificate to',
    'Email certificate to',
  ],
  title404: [
    '404: Page not found',
    '404: Page not found (DE)',
  ],
  followToHome: [
    'Follow the link to return to the home page',
    'Follow the link to return to the home page (DE)',
  ],
  homePage: [
    'Home page',
    'Home page',
  ],
  firstName: [
    'First Name',
    '(DE) First Name',
  ],
  lastName: [
    'Last Name',
    '(DE) Last Name',
  ],
  company: [
    'Company',
    '(DE) Company',
  ],
  country: [
    'Country',
    '(DE) Country',
  ],
  resetSuccess: [
    'Success! We have sent you an email with further instructions.',
    '(DE) Success! We have sent you an email with further instructions.',
  ],
  resetPassword: [
    'Reset password',
    '(DE) Reset password',
  ],
  takeCourse: [
    'Take course',
    '(DE) Take course',
  ],
  courseComplete: [
    'Course complete',
    '(DE) Course complete',
  ],
  confirmTsAndCs: [
    'Tick to confirm you have read and agree to the Ts & Cs',
    '(DE) Please confirm you have read and agreed to the Ts & Cs',
  ],
  cancel: [
    'Cancel',
    '(DE) Cancel',
  ],
  resetPass: [
    'Reset password',
    '(DE) Reset password',
  ],
  registering: [
    'Registering you...',
    '(DE) Registering you...',
  ],
  emailChanged: [
    'Email changed',
    '(DE) Email changed',
  ],
  profile: [
    'Profile',
    '(DE) Profile',
  ],
  edit: [
    'Edit',
    '(DE) Edit',
  ]
};

const translate = (lang) => {
  switch (lang) {
    case 'de':
      return (string) => validateTranslation(string, 1)[1];
    case 'en':
    default:
      return (string) => validateTranslation(string, 0)[0];
  }
};

const validateTranslation = (string, length) => {
  return text[string] && length <= (text[string].length - 1)
    ? text[string]
    : text['txtErr']
};

export default translate;
