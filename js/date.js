export const formatRelativeTime = function (timestamp) {
  const now = Date.now();
  const elapsed = now - timestamp;

  const formatter = new Intl.RelativeTimeFormat('en-US', { numeric: 'auto' });

  if (elapsed < 60 * 1000) {
    // Less than a minute ago
    return formatter.format(-1, 'second');
  } else if (elapsed < 60 * 60 * 1000) {
    // Minutes ago
    const minutesAgo = Math.floor(elapsed / (60 * 1000));
    return formatter.format(-minutesAgo, 'minute');
  } else if (elapsed < 24 * 60 * 60 * 1000) {
    // Hours ago
    const hoursAgo = Math.floor(elapsed / (60 * 60 * 1000));
    return formatter.format(-hoursAgo, 'hour');
  } else if (elapsed < 48 * 60 * 60 * 1000) {
    // Yesterday
    return formatter.format(-1, 'day');
  } else {
    // Days ago
    const daysAgo = Math.floor(elapsed / (24 * 60 * 60 * 1000));
    return formatter.format(-daysAgo, 'day');
  }
};
