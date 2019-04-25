import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { NativeButtonProps } from 'antd/es/button/button';
import { isPromise } from '@/utils/utils';

export interface IProps extends NativeButtonProps {
  // 카운트 다운 지속 시간 (초) 기본값 60
  second?: number;
  // 텍스트를 표시하려면 버튼 초기화
  initText?: string;
  // 런타임시 텍스트 표시
  // 내 설정에 {% s}이 (가) 있어야합니다.
  runText?: string;
  // 실행 종료 후 텍스트 표시
  resetText?: string;
  // 카운트 다운 시간 저장 sessionStorage 키 값
  // 설정이 비어 있지 않으면 새로 고침 페이지 카운트 다운이 계속됩니다
  storageKey?: string;
  // 카운트 다운 종료 실행 기능
  onEnd?: () => void;
  // 인증 코드 실행 기능 얻기
  // 반환 된 결과에 따라 카운트 다운 수행 여부를 결정합니다.
  onCaptcha?: () => boolean | Promise<any>;
}

export const SendCode: React.FC<IProps> = (props) => {
  let timer: NodeJS.Timer = null;
  let lastSecond: number = 0;
  const {
    second,
    initText,
    runText,
    resetText,
    onCaptcha,
    storageKey,
    onEnd,
    ...rest
  } = props;
  const [buttonText, setButtonText] = useState<string>(initText);
  const [start, setStart] = useState<boolean>(false);
  // 倒计时最后结束的秒数
  const [runSecond] = useState<number>(second);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const second = sessionStorage.getItem(storageKey);
    if (storageKey && second) {
      const newLastSecond = ~~((Number(second) - new Date().getTime()) / 1000);

      if (newLastSecond > 0) {
        lastSecond = newLastSecond;
        setButtonText(getTemplateText(newLastSecond));
        startCountdown();
      }
    }

    return () => {
      timer && clearInterval(timer);
    }
  }, []);

  // 인증 코드를 가져 오기 위해 트리거
  function handleClick(event) {
    event.preventDefault();
    setLoading(true);
    const result = onCaptcha ? onCaptcha() : null;

    if (isPromise(result)) {
      result
        .then(() => {
          setLoading(false);
          startCountdown();
        })
        .catch(() => {
          setLoading(false);
          console.log('인증 코드를받지 못했습니다.');
        });
      return;
    }

    if (result) {
      setLoading(false);
      startCountdown();
    }
  }

  // 서식있는 텍스트 가져 오기
  function getTemplateText(second: number): string {
    return runText.replace(/\{([^{]*?)%s(.*?)\}/g, second.toString());
  }

  function startCountdown() {
    setStart(true);
    let second = lastSecond ? lastSecond : runSecond;

    if (storageKey) {
      const runSecond = new Date().getTime() + second * 1000;
      sessionStorage.setItem(storageKey, runSecond.toString());
    }

    if (!lastSecond) {
      setButtonText(getTemplateText(second));
    }

    timer = setInterval(() => {
      second--;
      setButtonText(getTemplateText(second));

      if (second <= 0) {
        timeout();
      }
    }, 1000)
  }

  // 카운트 다운 종료 처리 기능
  function timeout() {
    // 실행 종료 후 텍스트로 설정
    setButtonText(resetText);
    setStart(false);
    timer && clearInterval(timer);
    if (storageKey) {
      sessionStorage.removeItem(storageKey);
    }
    onEnd && onEnd();
  }

  return (
    <Button
      {...rest}
      onClick={handleClick}
      loading={loading}
      disabled={start}
    >
      {buttonText}
    </Button>
  )
};

SendCode.defaultProps = {
  second: 60,
  initText: '인증 코드 받기',
  runText: '{%s}초 후에 다시 시도하십시오',
  resetText: '인증 코드 다시 받기'
};
