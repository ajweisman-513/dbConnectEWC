import mongoose from 'mongoose';
const { Schema } = mongoose;
import LocationObjectSchema from './LocationObjectSchema.js'

const SmarterObjectSchema = new Schema({
    acctName: { type: String, required: true },
    acctName2: { type: String, required: true },
    dbPushDate: { type: String, required: true },
    sO_reportsInfo: { type: Object, required: true },
    kpiSettings: { type: Array, required: true },
    keyDriverObjs: { type: Array, required: true },
    locationObjs: [LocationObjectSchema]
}, {
    timestamps: true
})

export default SmarterObjectSchema