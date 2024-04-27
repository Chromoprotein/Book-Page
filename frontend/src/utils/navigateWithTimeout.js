export function navigateWithTimeout(navigate, url = '/') {
    setTimeout(() => {
        navigate(url);
      }, 3000);
}