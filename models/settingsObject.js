import mongoose from "mongoose"

const SettingsObjectSchema = mongoose.Schema({
    acctName: String,
    uploadDate: Number,
    sO_reportsInfo: Object,
    keyDriverObjs: Array,
    locationObjs: Array
})

export default mongoose.model('smarterObject', SmarterObjectSchema)