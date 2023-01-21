import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { NotFoundError } from "../../core/ApiError";
import { SuccessResponse } from "../../core/ApiResponse";
import { Fixture } from "../../database/model/fixture.model";
import { Team } from "../../database/model/teams.model";
import { fixtureSearch } from "../../database/repository/fixture.repo";
import { teamSearch } from "../../database/repository/team.repo";

const apiSearch = expressAsyncHandler(async (req: Request, res: Response) => {
    const data = req.query.search;
    const result = [];
    const teamResult = await teamSearch(data as string);
    result.push(...teamResult as Team[]);
    const fixtureResult = await fixtureSearch(data as string);
    result.push(...fixtureResult as Fixture[]);
    // if (!allFixtures || allFixtures.length <= 0) throw new NotFoundError('No Fixture found');
  
    new SuccessResponse('fixtures created successfully', {result: result}).send(res);
  });

export {apiSearch}