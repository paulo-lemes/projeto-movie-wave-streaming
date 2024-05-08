import { getMoviesOrSeries } from '@/api'
import React from 'react'

export async function ContentRow() {
  const data = await getMoviesOrSeries("movie/now_playing?language=pt-BR&page=1");
  
  return (
    <div>
    </div>
  )
}
