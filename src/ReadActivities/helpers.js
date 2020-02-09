export const findCategory = (categories=[], categoryId) =>
  categories.find(category => category.id === parseInt(categoryId))

export const findActivity = (activities=[], activityId) =>
  activities.find(activity => activity.id === parseInt(activityId))

export const getActivityForCategory = (activities=[], categoryId) => (
  (!categoryId)
    ? activities
    : activities.filter(activity => activity.category_id === parseInt(categoryId))
)

export const countActivityForCategory = (activities=[], categoryId) =>
  activities.filter(activity => activity.category_id === parseInt(categoryId)).length