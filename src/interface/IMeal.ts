export interface IMeal {
  id: string
  user_id: string
  name: string
  description?: string | undefined
  meal_date: string
  meal_time: string
  is_in_diet: boolean
  created_at?: string
  session_id?: string
}
