import mongoose from 'mongoose';
const { Schema } = mongoose;
const Mixed = Schema.Types.Mixed;

const reqString = { type: String, required: true }

const MacroObjectSchema = new Schema({
	_kpi: String,
	_eeCode: String,
	_eeName: String,
	_position: String,
	_uuid: Number,
	_isComplete: Boolean,
	_isPresent: Boolean,
	_isPromptAs: String,
	_isCompletedAs: String,
	_keyDriver: String,
	_target: Number,
	_l1_now: Number,
	_locationTotalTickets: Number,
	_p1_now: Number,
	_p2_prev: Number,
	_employeeTotalTickets: Number,
	_swayFactor: Number,
	_locVarianceRaw: Number,
	_eeVarianceRaw: Number,
	_eeVarianceCalibrated: Number,
	_eeTrajectoryPercent: Mixed,
	_eeTrajectoryStated: String
}, {
    timestamps: true
})

export default MacroObjectSchema