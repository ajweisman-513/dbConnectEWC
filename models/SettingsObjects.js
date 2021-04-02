import mongoose from "mongoose"

const SettingsObjectSchema = mongoose.Schema({
    acctName: String,
    settingsDate: Number,
    settingsDateReadable: Number,
    keyDriverSettings: Array,
    kpiSettings: Array
})


export default mongoose.model('settingsObject', SettingsObjectSchema)