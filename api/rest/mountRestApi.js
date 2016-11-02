import CRUDRest from './CRUDRest'
import ExerciseRest from './ExerciseRest'

import Tournament from '../../universal/model/Tournament'
import TournamentService from '../service/TournamentService'

import Match from '../../universal/model/Match'
import MatchService from '../service/MatchService'

import Competitor from '../../universal/model/Competitor'
import CompetitorService from '../service/CompetitorService'

import MatchCompetitor from '../../universal/model/MatchCompetitor'
import MatchCompetitorService from '../service/MatchCompetitorService'

import Exercise from '../../universal/model/Exercise'
import ExerciseService from '../service/ExerciseService'

import ExerciseTargetZone from '../../universal/model/ExerciseTargetZone'
import ExerciseTargetZoneService from '../service/ExerciseTargetZoneService'

import User from '../../universal/model/User'
import UserService from '../service/UserService'

import Target from '../../universal/model/Target'
import TargetService from '../service/TargetService'

export default function mountRestApi(app, {
  authMiddleware
}) {
  CRUDRest.factory(new MatchService(Match), {
    endpoint: '/match'
  }).register(app)
  CRUDRest.factory(new TournamentService(Tournament), {
    middleware: authMiddleware
  }).register(app)
  CRUDRest.factory(new ExerciseTargetZoneService(ExerciseTargetZone)).register(app)
  CRUDRest.factory(new CompetitorService(Competitor)).register(app)
  CRUDRest.factory(new MatchCompetitorService(MatchCompetitor)).register(app)
  CRUDRest.factory(new TargetService(Target)).register(app)
  CRUDRest.factory(new UserService(User), {
    endpoint: '/user'
  }).register(app)
  new ExerciseRest(new ExerciseService(Exercise)).register(app)
}
