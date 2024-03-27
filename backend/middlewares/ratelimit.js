import {rateLimit} from 'express-rate-limit'


const limiter = (time, numberLimit) => rateLimit({
	windowMs: time * 60 * 1000, // Interval de temps max pour atteindre le nombre maximum de connexion
	limit: numberLimit,  // Nombre maximum de connexions autorisées
	standardHeaders: 'draft-7',
	legacyHeaders: false, 
})

export const normalLimiter = limiter(60,200);
export const mediumLimiter = limiter(15,6);
export const hardLimiter = limiter(30,3);