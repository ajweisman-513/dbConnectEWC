import mongoose from "mongoose"

const SettingsObjectSchema = mongoose.Schema({
    acctName: String,
    settingsDate: Number,
    settingsDateReadable: String,
    keyDriverSettings: Array,
    kpiSettings: Array
})


export default mongoose.model('settingsObject', SettingsObjectSchema)