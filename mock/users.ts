/**
 * 현재 사용자를 동기화한다.
 * 
 * @param req 요청
 * @param res 응답
 */
function fetchCurrent(req, res) {
  const { token } = req.headers;
  console.log(token);
  res.send({
    code: 200,
    data: {
      name: '김성현',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
      unreadCount: 11,
      email: 'seonghyun.kim@ikoob.com'
    },
    message: 'success'
  });
}

/**
 * 로그인을 한다.
 * 
 * @param req 요청
 * @param res 응답
 */
function fetchLogin(req, res) {
  const { username, password } = req.body;

  // 관리자라면...
  if (username === 'admin' && password === '123456') {
    res.send({
      code: 200,
      message: 'success',
      data: {
        token: 'admin_token'
      }
    });

    return;
  }

  // 일반 사용자라면...
  if (username === 'user'  && password === '123456') {
    res.send({
      code: 200,
      message: 'success',
      data: {
        token: 'user_token'
      }
    });

    return;
  }

  res.send({
    code: 10001,
    message: '잘못된 계정 또는 비밀번호 입니다.',
    data: {}
  });
}

/**
 * 로그아웃 한다.
 * 
 * @param req 요청
 * @param res 응답
 */
function fetchLogout(req, res) {
  res.send({
    code: 200,
    message: 'success',
    data: {}
  });
}

export default {
  'POST /api/users/login': fetchLogin,
  'GET /api/users/current': fetchCurrent,
  'GET /api/users/logout': fetchLogout
};
