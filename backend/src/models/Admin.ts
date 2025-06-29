import { Document, Schema, model } from 'mongoose';

export interface IAdmin extends Document {
  email: string;
  password: string;
}

const adminSchema = new Schema<IAdmin>({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

const Admin = model<IAdmin>('Admin', adminSchema);
export default Admin;
