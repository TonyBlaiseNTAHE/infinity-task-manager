import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
    {
        name: { type: String, require: true},
        email: { type: String, required: true, unique: true},
        password: { type: String, required: true},
        profileImageUrl: { type: String, default: null},
        role: { type: String, enum: ["admin", "member"], default: "member"}, // Role-based access
    },
    { timestamps: true}
);

const Employee = mongoose.model('Employee', UserSchema);

export default Employee;