export function goToUrl(url: string): void {
  const isHtppsInclude = url.includes('https://');
  const newUrl = isHtppsInclude ? url : `https://${url}`;
  window.open(newUrl);
}
