import Tournament from "round-robin-tournament";
import { Team } from "../database/model/teams.model";

// const generateFixtures = (allTeams: any) => {
//     const tournament = new Tournament(allTeams);
//     return tournament.matches
// }

const generateFixtures = (teams:any) => {
    let schedule = [] as any
    let league:any = teams.slice() as any
    
    if (league.length % 2) {
      league.push('None')
    }
    
    let rounds = league.length
    
    for (let j=0; j<(rounds-1)*2; j ++) {
      schedule[j] = []
      for (let i=0; i<rounds/2; i++) {
        if (league[i] !== 'None' && league[rounds-1-i] !== 'None') {
          if (j % 2 == 1) {
            schedule[j].push([league[i], league[rounds-1-i]])
          } else {
            schedule[j].push([league[rounds-1-i], league[i]])
          }
        }
      }
      league.splice(1, 0, league.pop())
    }
    return schedule
  }
export {generateFixtures}