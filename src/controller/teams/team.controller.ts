import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { NotFoundError } from '../../core/ApiError';
import { SuccessResponse } from '../../core/ApiResponse';
import { createTeam, deleteTeam, findOneTeamById, getAllTeams, updateTeamParams } from '../../database/repository/team.repo';

const createATeam = expressAsyncHandler(async (req: Request, res: Response) => {
  const data = req.body;
  const newTeam = await createTeam(data);
  if (!newTeam) throw new NotFoundError('Team not created');
  new SuccessResponse('team created successfully', { team:newTeam }).send(res);
});

const findOneTeam= expressAsyncHandler(async (req: Request, res: Response) => {
  const data = req.params?.id;
  const team = await findOneTeamById(data);
  if (!team) throw new NotFoundError('team not found');
  new SuccessResponse('team retrieved successfully', { team:team }).send(res);
});

const findAllTeams = expressAsyncHandler(async (req: Request, res: Response) => {
    const teams = await getAllTeams();
    if (!teams) throw new NotFoundError('team not found');
    new SuccessResponse('all teams retrieved', { teams:teams }).send(res);
});

const updateTeam = expressAsyncHandler(async (req: Request, res: Response) => {
  const data = {_id : req.params.id}
  const newProperty = req.body
  const updatedTeam = await updateTeamParams(data, newProperty );
  if (!updatedTeam) throw new NotFoundError('team not found');
  new SuccessResponse('all teams retrieved', {updatedTeam: updatedTeam }).send(res);
});

const deleteATeam= expressAsyncHandler(async (req: Request, res: Response) => {
    const data = req.params?.id;
    const team = await deleteTeam(data);
    if (!team) throw new NotFoundError('team not found');
    new SuccessResponse('team deleted successfully', { team:team }).send(res);
  }); 

export { createATeam, findOneTeam, findAllTeams, deleteATeam, updateTeam };
