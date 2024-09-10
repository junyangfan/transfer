// 判断是否是微信环境
export const isWeChat = () => {
  const ua = window.navigator.userAgent.toLowerCase()
  return /micromessenger/i.test(ua) || /wxwork/i.test(ua)
}

// 获取随机数
export const getRandomNum = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * 处理Promise，返回一个包含错误信息或数据的数组。
 *
 * @param { Promise<T> } promise - 传入的Promise对象。
 * @param { Partial<T> } [errorExt={}] - 拓展错误对象，部分属性将被添加到错误对象中。
 * @return { Promise<[Error | null, T | undefined]> } 返回一个Promise，包含错误信息或数据的数组。
 */
export const to = <T>(
  promise: Promise<T>,
  errorExt?: object,
): Promise<[Error | null, T | undefined]> => {
  return promise
    .then((data: T) => [null, data] as [Error | null, T])
    .catch((err: Error) => {
      const parsedError = errorExt ? Object.assign({}, err, errorExt) : err;
      return [parsedError, undefined] as [Error, undefined];
    });
};

interface Tokens {
  y: string;
  M: string;
  d: string;
  h: string;
  m: string;
  s: string;
}

export const formatDate = (item: number, format: string) => {
  const date = new Date(item)
  const pad = (n: number) => (n < 10 ? '0' + n : n.toString())
  const tokens = {
    'y': date.getFullYear().toString(), // 年
    'M': pad(date.getMonth() + 1), // 月
    'd': pad(date.getDate()), // 日
    'h': pad(date.getHours()), // 小时 (24小时制)
    'm': pad(date.getMinutes()), // 分钟
    's': pad(date.getSeconds()) // 秒
  }

  return format.replace(/y|M|d|h|m|s/g, (match) => {
    if (tokens.hasOwnProperty(match)) {
      return tokens[match as keyof Tokens];
    }
    return match;
  });
}

export const getCurrentTime = () => {
  let time = new Date();
  let year = time.getFullYear();
  let month = time.getMonth() + 1 < 10 ? "0" + (time.getMonth() + 1) : time.getMonth() + 1;
  let day = time.getDate() < 10 ? "0" + time.getDate() : time.getDate();
  let hour = time.getHours() < 10 ? "0" + time.getHours() : time.getHours();
  let minute = time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes();
  let second = time.getSeconds() < 10 ? "0" + time.getSeconds() : time.getSeconds();
  let weekday = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
  let currentTime = {
    year,
    month,
    day,
    hour,
    minute,
    second,
    weekday: weekday[time.getDay()],
  };
  return currentTime;
};

/**
 * copyToClipboard 复制内容到剪切板
 * @param text 文本 string格式
 * @returns Promise<boolean | Error>
 */
export const copyToClipboard = (text: string) => {
  return new Promise((resolve, reject) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(text)
        .then(() => resolve(true))
        .catch((err) => reject(err));
    } else {
      const textarea = document.createElement('textarea');
      document.body.appendChild(textarea);
      textarea.style.position = 'fixed';
      textarea.style.clipPath = 'rect(0, 0, 0, 0)';
      textarea.value = text;
      textarea.select();
      try {
        const successful = document.execCommand('copy');
        if (successful) {
          resolve(true);
        } else {
          reject(new Error('copyToClipboard failed'));
        }
      } catch (err) {
        reject(err);
      } finally {
        document.body.removeChild(textarea);
      }
    }
  });
};