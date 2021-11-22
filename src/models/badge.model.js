import mongoose from "mongoose";
import User from './user.model.js';

const badgeSchema = new mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: 'User',
        validate: async (value) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                throw new Error('Invalid ID: ${id}, Must match bson ObjectId!');
            } else {
                const user = await User.findById(value);
                if (!user) {
                    throw new Error('UserID not exists!');
                }
            }
        },
    },
    createDate: {
        type: Date,
        default: Date.now,
        required: true
    }
}, {
    timestamps: true
});

const Badge = new mongoose.model('Badge', badgeSchema);
export default Badge;