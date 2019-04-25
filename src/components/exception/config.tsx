interface IConfig {
  [key: number]: {
    img: string;
    title: string;
    desc: string;
  }
}

const config: IConfig = {
  403: {
    img: 'https://gw.alipayobjects.com/zos/rmsportal/wZcnGqRDyhPOEYFcZDnb.svg',
    title: '403',
    desc: '죄송합니다.이 페이지에 액세스 할 수 없습니다.',
  },
  404: {
    img: 'https://gw.alipayobjects.com/zos/rmsportal/KpnpchXsobRgLElEozzI.svg',
    title: '404',
    desc: '죄송합니다. 방문한 페이지가 없습니다.',
  },
  500: {
    img: 'https://gw.alipayobjects.com/zos/rmsportal/RVRUAYdCGeYNBWoKiIwB.svg',
    title: '500',
    desc: '서버에서 알 수 없는 에러가 발생하였습니다.',
  },
};

export default config;
