const getNotices = (req, res) =>
  res.json({
    status: 200,
    data: [
      {
        id: '000000001',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
        title: '타이틀',
        datetime: '2017-08-09',
        type: 'notification',
      },
    ],
    message: 'success'
  });

export default {
  'GET /notices': getNotices,
};
