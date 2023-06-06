import { format } from 'date-fns'

import supabase from '../supabase'

// Queries

export async function getToday(_key, user_id) {
  const currentDate = new Date()
  const today = format(currentDate, 'yyyy-MM-dd')

  let { data } = await supabase
    .from('diaries')
    .select('*')
    .eq('user_id_date', `${user_id}-${today}`)
    .single()

  return data
}

// Mutations

export async function createDiary({ isTitle, userData, user_id }) {
  const currentDate = new Date()
  const today = format(currentDate, 'yyyy-MM-dd')

  const commonData = {
    user_id,
    user_id_date: `${user_id}--${today}`,
    date: today,
  }

  try {
    const { error } = await supabase
      .from('diaries')
      .insert([
        isTitle
          ? { ...commonData, title: userData }
          : { ...commonData, diary: userData },
      ])

    if (!error) {
      return { data: true }
    }
    return { error }
  } catch (error) {
    return { error }
  }
}
