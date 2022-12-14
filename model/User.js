const mongoose = require('mongoose');
require('mongoose-double')(mongoose);
const { Types: { ObjectId, Double } } = mongoose.Schema;

const userSchema = mongoose.Schema({

  user_name: String,
  user_pwd: {
    type: String,
    select: false,
    default: ""
  },
  user_email: {
    type: String
  },
  // 데이터 파싱 필요
  user_address: String,
  user_nickname: {
    type: String,
    required: true,
    unique: true
  },
  user_profile_img: {
    type: String,
    default: "https://d1cfu69a4bd45f.cloudfront.net/profile_image/62d68b0843aefb57300fe342_2022_08_24_12_09_46.png"
  },
  user_original_profile_img: {
    type: String,
    select: false,
    default: "https://fitmate-s3-bucket.s3.ap-northeast-2.amazonaws.com/profile_image/62d68b0843aefb57300fe342_2022_08_24_12_09_46.png"
  },
  // 운동 스케줄 (0 : 아침, 1 : 오후, 2 : 저녁)
  user_schedule_time: Number,
  user_weekday: {
    mon: { type: Boolean, default: false },
    tue: { type: Boolean, default: false },
    wed: { type: Boolean, default: false },
    thu: { type: Boolean, default: false },
    fri: { type: Boolean, default: false },
    sat: { type: Boolean, default: false },
    sun: { type: Boolean, default: false }
  },
  user_introduce: {
    type: String,
    default: "안녕하세요! 같이 운동해요 :)"
  },
  user_fitness_part: [{
    type: ObjectId,
    ref: 'FitnessPart'
  }],
  // 확인 필요
  user_age: {
    type: Number,
    default: 0
  },
  user_gender: {
    type: Boolean,
    required: true
  },
  user_loc_bound: {
    type: Number,
    default: 3
  },
  fitness_center_id: {
    type: ObjectId,
    ref: 'FitnessCenter',
    required: true,
    default: '631d65a35c8fcf2a7116f0d7'
  },
  user_longitude: {
    type: Double,
    default: 0.0,
  },
  user_latitude: {
    type: Double,
    default: 0.0,
  },
  location_id: {
    type: ObjectId,
    ref: 'Location',
  },
  blocked_users: [{
    type: ObjectId,
    ref: 'User'
  }],
  social: {
    user_id: {
      type: String,
      unique: true
    },
    user_name: String,
    provider: String,
    device_token: [String],
    firebase_info: Object,
  },
  is_deleted: {
    type: Boolean,
    default: false
  },
  is_certificated: {
    type: Boolean,
    default: false
  },
  survey_candidates: [{
    type: ObjectId,
    ref: 'SurveyCandidates'
  }],
}, {
  versionKey: false,
  timestamps: true,
  toJSON: { virtuals: true }
});

const User = mongoose.model('User', userSchema);

module.exports = { User };


