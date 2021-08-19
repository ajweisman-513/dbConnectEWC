import mongoose from 'mongoose';
const { Schema } = mongoose;

const EmployeeReportSchema = new Schema({
    _reportType: { type: String, required: true },
    _acctName: { type: String, required: true },
    _originatingReportName: { type: String, required: false },
    _mongoDocumentName: { type: String, required: false },
    _reportDate: { type: String, required: false },
    _pRepresentation: { type: String, required: false },
    _data: { type: Array, required: true }
}, {
    timestamps: true
})

export default EmployeeReportSchema
