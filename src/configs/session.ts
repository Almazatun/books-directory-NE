import {SESSION_SECRET} from "../confirm/sessionKey";
import {v4} from 'uuid'

export const SESSION = `${process.env.SESSION_KEY}_${v4()}` || SESSION_SECRET
export const MAX_AGE = 1000 * 60 * 60 * 3; // Three hours