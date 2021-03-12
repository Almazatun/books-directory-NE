import {v4} from 'uuid'

export const SESSION = `${process.env.SESSION_KEY}_${v4()}` || `${v4()}`
export const MAX_AGE = Number(process.env.MAX_AGE) || 1000 * 60 * 60 * 3 // Three hours