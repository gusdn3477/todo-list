export const isMobile = () => {
  const userAgent = navigator.userAgent;

  // iOS
  if (/iPhone|iPad|iPod/i.test(userAgent)) {
    return true;
  }

  // Android
  if (/Android/i.test(userAgent)) {
    return true;
  }

  // 타 모바일 브라우저
  if (/webOS|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
    return true;
  }
  return false;
};
