export const findCategory = (categories=[], categoryId) =>
  categories.find(category => category.id === categoryId)

export const findActivity = (activities=[], activityId) =>
  activities.find(activity => activity.id === activityId)

export const getActivityForCategory = (activities=[], categoryId) => (
  (!categoryId)
    ? activities
    : activities.filter(activity => activity.categoryId === categoryId)
)

export const countActivityForCategory = (activities=[], categoryId) =>
  activities.filter(activity => activity.categoryId === categoryId).length