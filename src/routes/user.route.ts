import { Router} from 'express';
import { findAllFixtures, findPendingFixtures, findCompletedFixtures } from '../controller/fixtures/fixture.controller';
import { findAllTeams } from '../controller/teams/team.controller';
import isAuth from '../middleware/isAuth';
const router = Router();

router.get("/view_teams", isAuth, findAllTeams);
router.get("/view_all_fixtures", isAuth, findAllFixtures);
router.get("/view_pending_fixtures", isAuth, findPendingFixtures);
router.get("/view_completed_fixtures", isAuth, findCompletedFixtures);


export default router;