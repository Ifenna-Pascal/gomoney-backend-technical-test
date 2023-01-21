import { Router} from 'express';
import { processRequestBody, processRequestParams } from 'zod-express-middleware';
import { createAFixture, deleteAFixture, findAllFixtures, updateFixture } from '../controller/fixtures/fixture.controller';
import { createATeam, updateTeam, deleteATeam, findAllTeams } from '../controller/teams/team.controller';
import isAdmin from '../middleware/isAdmin';
import { fixtureSchema, teamSchema } from '../validation/team.schema';

const router = Router();

// team crud routes
router.get("/view_teams", [isAdmin], findAllTeams);
router.post("/create_team", [processRequestBody(teamSchema.body), isAdmin], createATeam);
router.put("/edit_team/:id", [processRequestParams(teamSchema.params), processRequestBody(teamSchema.body), isAdmin], updateTeam);
router.delete("/delete_team/:id", [processRequestParams(teamSchema.params), isAdmin], deleteATeam);

// fixture crud routes
router.get("/view_fixtures", [isAdmin], findAllFixtures);
router.post("/create_fixture", [isAdmin], createAFixture)
router.put("/edit_fixture_score/:id", [processRequestParams(teamSchema.params), processRequestBody(fixtureSchema.body), isAdmin], updateFixture);
router.put("/edit_fixture_status/:id", [processRequestParams(teamSchema.params), processRequestBody(fixtureSchema.status), isAdmin], updateFixture);
router.delete("/delete_fixture/:id", [processRequestParams(teamSchema.params), isAdmin], deleteAFixture);

export default router;