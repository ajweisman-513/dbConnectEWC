import mongoose from "mongoose"

const SmarterObjectSchema = mongoose.Schema({
    name: String,
    uploadDate: Number,
    sO_reportsInfo: Object,
    keyDriverObjs: Array,
    locationObjs: Array
})

export default mongoose.model('smarterObject', SmarterObjectSchema)