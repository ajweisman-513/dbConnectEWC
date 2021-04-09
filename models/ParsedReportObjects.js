import mongoose from "mongoose"


    const ParsedReportObjectSchema = mongoose.Schema({
        acctName: String,
        reportType: String,
        runDate: Number,
        runDateReadable: String,
        runPeriod: String,
        reportData: Array
    })
    return mongoose.model('parsedReportObject', ParsedReportObjectSchema, prefix + 'parsedReportObject')



module.exports = dynamicParsedReportObjectSchema