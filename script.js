let countdown;

function startCountdown() {
  const eventTime = new Date(document.getElementById('eventTime').value).getTime();
  clearInterval(countdown);

  countdown = setInterval(() => {
    const now = new Date().getTime();
    const distance = eventTime - now;

    if (distance < 0) {
      clearInterval(countdown);
      document.getElementById('timer').innerHTML = "Event Started!";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('timer').innerHTML =
      `${days}d : ${hours}h : ${minutes}m : ${seconds}s`;
  }, 1000);
}
