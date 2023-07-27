export const dateUtil = {
  isExpired(time: number): boolean {
    return time < Date.now();
  },
  formatLargeTimestamp(largeTimestamp: number) {
    return largeTimestamp / 1000000;
  },
  timeUntil(target: number): number {
    return target - Date.now();
  },
  msToTime(ms: number) {
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);

    const hrs = hours ? `${hours.toString().padStart(2, "0")}:` : "";
    const mins = minutes ? `${minutes.toString().padStart(2, "0")}:` : "";
    const secs = `${seconds.toString().padStart(2, "0")}`;

    return hrs + mins + secs;
  },
  getMinsInMs(min: number) {
    return min * 1000;
  },
};
