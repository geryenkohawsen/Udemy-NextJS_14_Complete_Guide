import sql from 'better-sqlite3'

import type { News } from '@/dummy-news'
import { DUMMY_NEWS } from '@/dummy-news'

const db = sql('data.db')

export function getAllNews(): News {
  const news = db.prepare('SELECT * FROM news').all()
  return news as News
}

export function getLatestNews() {
  return DUMMY_NEWS.slice(0, 3)
}

export function getAvailableNewsYears() {
  return DUMMY_NEWS.reduce((years: number[], news) => {
    const year = new Date(news.date).getFullYear()
    if (!years.includes(year)) {
      years.push(year)
    }
    return years
  }, []).sort((a, b) => b - a)
}

export function getAvailableNewsMonths(year: number) {
  return DUMMY_NEWS.reduce((months: number[], news) => {
    const newsYear = new Date(news.date).getFullYear()
    if (newsYear === +year) {
      const month = new Date(news.date).getMonth()
      if (!months.includes(month)) {
        months.push(month + 1)
      }
    }
    return months
  }, []).sort((a, b) => b - a)
}

export function getNewsForYear(year: number) {
  return DUMMY_NEWS.filter((news) => new Date(news.date).getFullYear() === +year)
}

export function getNewsForYearAndMonth(year: number, month: number) {
  return DUMMY_NEWS.filter((news) => {
    const newsYear = new Date(news.date).getFullYear()
    const newsMonth = new Date(news.date).getMonth() + 1
    return newsYear === +year && newsMonth === +month
  })
}
