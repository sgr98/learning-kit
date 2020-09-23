const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { stepSchema } = require('./step')

const buildCircuitSchema = new Schema({
    courseId: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
    },
    steps: [{
        type: Schema.Types.ObjectId,
        ref: 'Step'
    }],
});
exports.buildCircuitSchema = buildCircuitSchema
exports.BuildCircuit = mongoose.model('BuildCircuit', buildCircuitSchema);