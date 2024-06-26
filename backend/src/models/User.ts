import { Schema, model } from 'mongoose';

import { ICart, IUser } from '../types/user';

export const cartSchema = new Schema<ICart>({
	products: [
		{
			productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
			quantity: { type: Number, required: true },
		},
	],
	totalQuantity: { type: Number },
});

const userSchema = new Schema<IUser>({
	email: { type: String, required: true },
	password: { type: String, required: true },
	isActive: { type: Boolean, required: true },
	cart: cartSchema,
	refreshToken: { type: String },
	refreshTokenExpiration: { type: Date },
	activateToken: { type: String },
	activateTokenExpiration: { type: Date },
});

export const User = model<IUser>('User', userSchema);
