insert into match_exercise_target_zone
  ("matchId", "exerciseId", "exerciseTargetId", "targetId", "zoneId")
  select "matchId", "exerciseId", exercise_target."id", exercise_target."targetId", target_zone."id"
  from exercise
  inner join exercise_target on exercise.id = exercise_target."exerciseId"
  inner join target_zone on exercise_target."targetId" = target_zone."targetId"
  where exercise.id = 5;