import { format } from 'date-fns'

import supabase from '../supabase'

// Queries

export async function getToday([_key, user_id]) {
  const currentDate = new Date()
  const today = format(currentDate, 'yyyy-MM-dd')

  let { data } = await supabase
    .from('diaries')
    .select('*')
    .eq('user_id_date', `${user_id}--${today}`)
    .single()

  return data
}

export async function getDiaries([_key, user_id]) {
  let { data } = await supabase
    .from('diaries')
    .select('date, created_at, diary, id, title')
    .eq('user_id', user_id)

  return data
}

// Mutations

export async function createDiary({ isTitle, formData, user_id }) {
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
          ? { ...commonData, title: formData }
          : { ...commonData, diary: formData },
      ])

    if (error) {
      return { error }
    }
    return { ok: true }
  } catch (error) {
    return { error }
  }
}

export async function updateDiary({ isTitle, formData, story_id }) {
  try {
    const { error } = await supabase
      .from('diaries')
      .update([
        isTitle
          ? { updated_at: new Date(), title: formData }
          : { updated_at: new Date(), diary: formData },
      ])
      .eq('id', story_id)

    if (error) {
      return { error }
    }
    return { ok: true }
  } catch (error) {
    return { error }
  }
}
