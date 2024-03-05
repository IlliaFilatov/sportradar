export const getMatchName = (homeTeam: string, awayTeam: string) => {
  return `${homeTeam}(Home) vs ${awayTeam}(Away)`;
};

export const getInitials = (fullName: string) => {
  return fullName
    .split(' ')
    .map((str) => `${str[0].toUpperCase()}.`)
    .join('');
};
