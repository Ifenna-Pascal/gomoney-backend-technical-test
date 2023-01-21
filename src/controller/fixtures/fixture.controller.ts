import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { NotFoundError } from '../../core/ApiError';
import { SuccessMsgResponse, SuccessResponse } from '../../core/ApiResponse';
import { STATUSTYPE } from '../../database/model/fixture.model';
import { createFixture, deleteFixture, findFixturesByParam, findOneFixtureById, getAllFixtures, updateFixtureParams } from '../../database/repository/fixture.repo';
import { getAllTeams } from '../../database/repository/team.repo';
import { IFixture } from '../../interface/controller.intrface';
import { generateFixtures } from '../../services/matchfixture.service';


const createAFixture = expressAsyncHandler(async (req: Request, res: Response) => {
  const allFixtures= await getAllTeams() as any;
  if (!allFixtures || allFixtures.length <= 0) throw new NotFoundError('No Fixture found');
 const fixtures = generateFixtures(allFixtures);
 for (let i = 0; i < fixtures.length; i++) {
    for (let j = 0; j < fixtures[i].length; j++) {
    const fixing = {} as IFixture;
    fixing.home = fixtures[i][j][0]._id,
    fixing.away = fixtures[i][j][1]._id
    await createFixture(fixing);
    }
  }
  new SuccessMsgResponse('fixtures created successfully').send(res);
});

const findOneFixture= expressAsyncHandler(async (req: Request, res: Response) => {
  const data = req.params?.id;
  const Fixture = await findOneFixtureById(data);
  if (!Fixture) throw new NotFoundError('Fixture not found');
  new SuccessResponse('Fixture retrieved successfully', { Fixture:Fixture }).send(res);
});

const findAllFixtures = expressAsyncHandler(async (req: Request, res: Response) => {
    const Fixtures = await getAllFixtures();
    if (!Fixtures) throw new NotFoundError('Fixture not found');
    new SuccessResponse('all Fixtures retrieved', { Fixtures:Fixtures }).send(res);
});


const findPendingFixtures = expressAsyncHandler(async (req: Request, res: Response) => {
  const param = {status: STATUSTYPE.PENDING}
  const Fixtures = await findFixturesByParam(param);
  if (!Fixtures) throw new NotFoundError('Fixture not found');
  new SuccessResponse('pending Fixtures retrieved', { Fixtures:Fixtures }).send(res);
});

const findCompletedFixtures = expressAsyncHandler(async (req: Request, res: Response) => {
  const param = {status: STATUSTYPE.COMPLETED}
  const Fixtures = await findFixturesByParam(param);
  if (!Fixtures) throw new NotFoundError('Fixture not found');
  new SuccessResponse('completed Fixtures retrieved', { Fixtures:Fixtures }).send(res);
});



const updateFixture = expressAsyncHandler(async (req: Request, res: Response) => {
  const data = {_id : req.params.id}
  const newProperty = req.body
  const updatedFixture = await updateFixtureParams(data, newProperty );
  if (!updatedFixture) throw new NotFoundError('Fixture not found');
  new SuccessResponse('all Fixtures retrieved', {updatedFixture: updatedFixture }).send(res);
});

const deleteAFixture= expressAsyncHandler(async (req: Request, res: Response) => {
    const data = req.params?.id;
    const Fixture = await deleteFixture(data);
    if (!Fixture) throw new NotFoundError('Fixture not found');
    new SuccessResponse('Fixture deleted successfully', { Fixture:Fixture }).send(res);
  }); 


export {createAFixture, deleteAFixture, updateFixture, findAllFixtures, findOneFixture, findPendingFixtures, findCompletedFixtures}