export default class HockeyService {
  static getTeams = async () => {
    const response = await fetch(
      "https://statsapi.web.nhl.com/api/v1/teams?expand=team.roster"
    );
    const payload = await response.json();
    return payload.teams;
  };
}
