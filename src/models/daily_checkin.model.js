import mongoose from "mongoose";
import User from './user.model.js';

const dailyCheckinSchema = new mongoose.Schema({
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
    date: {
        type: Date,
        default: Date.now,
        required: true,
    },
    feel: {
        type: String,
        enum: ['Excellent', 'Happy', 'Normal', 'Sad', 'Terrible'],
        required: true,
    },
    description: {
        type: String,
    }
}, {
    timestamps: true
});

const DailyCheckin = new mongoose.model('Dailycheckin', dailyCheckinSchema);
export default DailyCheckin;