export const findSavedlesson = (savedlessons=[], savedId) =>
  savedlessons.find(lesson => lesson.id === parseInt(savedId))

export const getUserSavedlesson = (savedlessons=[], userId) => (
  (!userId)
  ? savedlessons
  : savedlessons.filter(lesson => lesson.user_id === parseInt(userId))
  )