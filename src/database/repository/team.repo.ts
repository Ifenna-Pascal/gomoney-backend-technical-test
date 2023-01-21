import { Team, TeamModel } from "../model/teams.model"

const createTeam = async (team:Team):Promise<Team> => {
    return TeamModel.create(team);
}


async function updateTeamParams(userDetails: object, value: object) {
    return TeamModel.updateOne(userDetails, value, {
      new: true,
    });
}


const getAllTeams = async ():Promise<Team[]> => {
    return TeamModel.find();
}


const findOneTeamById = async (_id:string):Promise<Team | null> => {
    return TeamModel.findById(_id);
}

const deleteTeam = async (_id:string):Promise<Team | null> => {
    return TeamModel.findOneAndDelete({_id:_id})
}

const teamSearch = async (param:string | undefined): Promise<Team[] | null> => {
   return TeamModel.find({$or:[{name:{'$regex':param}},{nickName:{'$regex':param}},{teamCEO:{'$regex':param}}, {location:{'$regex':param}},{yearOfEstablisment:{'$regex':param}} ]})
}

export {createTeam, updateTeamParams, getAllTeams, findOneTeamById, deleteTeam, teamSearch}