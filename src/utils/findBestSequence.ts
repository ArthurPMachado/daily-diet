import { IMeal } from '@/interface/IMeal'

export function findBestSequence(meals: IMeal[]) {
  const mealsInDiet: IMeal[] = []
  const mealsOutDiet: IMeal[] = []
  let highestSequence: IMeal[] = []
  let actualSequence: IMeal[] = []

  meals.forEach((meal) => {
    if (meal.is_in_diet) {
      actualSequence.push(meal)
      mealsInDiet.push(meal)
    } else {
      if (actualSequence.length > highestSequence.length) {
        highestSequence = [...actualSequence]
      }
      actualSequence = []
      mealsOutDiet.push(meal)
    }
  })

  if (actualSequence.length > highestSequence.length) {
    highestSequence = [...actualSequence]
  }

  const mealsMetrics = {
    mealsInDiet,
    mealsOutDiet,
    highestSequence,
  }

  return mealsMetrics
}
