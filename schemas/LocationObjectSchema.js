import mongoose from 'mongoose';
const { Schema } = mongoose;

import MacroObjectSchema from './MacroObjectSchema.js'

const LocationObjectSchema = new Schema({
    _locationName: { type: String, required: true },
    _locPerfStats: { type: Object, required: true },
    _locKdStatCards:{ type: Array, required: true },
    _eeObjs: { type: Array, required: true },
    _keyDrvMacrosVarPositive: { type: Array, required: true },
    _keyDrvMacrosVarNegative: { type: Array, required: true }
})

export default LocationObjectSchema
