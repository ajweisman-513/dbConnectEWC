import mongoose from 'mongoose';
const { Schema } = mongoose;

const EmployeeReportSchema = new Schema({
    reportType: { type: String, required: true },
    acctName: { type: String, required: true },
    originatingReportName: { type: String, required: false },
    mongoDocumentName: { type: String, required: false },
    reportDate: { type: String, required: false },
    pRepresentation: { type: String, required: false },
    data: { type: Array, required: true }
}, {
    timestamps: true
})

export default EmployeeReportSchema
