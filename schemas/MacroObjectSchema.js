import mongoose from 'mongoose';
const { Schema } = mongoose;

const MacroObjectSchema = new Schema({
	_kpi: { type: String, required: true },
	_eeCode: { type: String, required: true },
	_eeName: { type: String, required: true },
	_position: { type: String, required: true },
	_uuid: { type: Number, required: true },
	_isComplete: { type: Boolean, required: false },
	_isPresent: { type: Boolean, required: false },
	_isPromptAs: { type: String, required: false },
	_isCompletedAs: { type: String, required: false },
	_keyDriver: { type: String, required: true },
	_target: { type: Number, required: true },
	_l1_now: { type: Number, required: true },
	_locationTotalTickets: { type: Number, required: true },
	_p1_now: { type: Number, required: true },
	_p2_prev: { type: Number, required: true },
	_employeeTotalTickets: { type: Number, required: true },
	_swayFactor: { type: Number, required: true },
	_locVarianceRaw: { type: Number, required: true },
	_eeVarianceRaw: { type: Number, required: true },
	_eeVarianceCalibrated: { type: Number, required: true },
	_eeTrajectoryPercent: { type: Number, required: true },
	_eeTrajectoryStated: { type: String, required: true }
})

export default MacroObjectSchema