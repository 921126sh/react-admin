import globalHeader from './ko-KR/globalHeader';
import exception from './ko-KR/exception';
import menu from './ko-KR/menu';
import login from './ko-KR/login';
import passwordReset from './ko-KR/password-reset';
import validation from './ko-KR/validation';
import settings from './ko-KR/settings';

export default {
  'navBar.lang': 'Languages',
  ...menu,
  ...login,
  ...passwordReset,
  ...validation,
  ...settings,
  ...exception,
  ...globalHeader
};
