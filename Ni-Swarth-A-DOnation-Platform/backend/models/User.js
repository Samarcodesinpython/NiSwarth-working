import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['donor', 'volunteer', 'ngo'],
    required: true
  },
  avatar: String,
  phone: String,
  address: {
    street: String,
    city: String,
    state: String,
    pincode: String,
    country: String
  },
  // Donor specific fields
  donorProfile: {
    totalDonations: {
      type: Number,
      default: 0
    },
    donationHistory: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Donation'
    }],
    preferences: {
      categories: [{
        type: String,
        enum: ['Food', 'Education', 'Health', 'Environment', 'Emergency', 'Other']
      }],
      isAnonymous: {
        type: Boolean,
        default: false
      }
    }
  },
  // Volunteer specific fields
  volunteerProfile: {
    skills: [String],
    availability: {
      weekdays: Boolean,
      weekends: Boolean,
      flexible: Boolean
    },
    interests: [String],
    experience: String,
    totalHours: {
      type: Number,
      default: 0
    },
    eventsAttended: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event'
    }],
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0
    }
  },
  // NGO admin specific fields
  ngoProfile: {
    ngoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'NGO'
    },
    position: String,
    department: String
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  isPhoneVerified: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'suspended'],
    default: 'active'
  },
  lastLogin: Date,
  resetPasswordToken: String,
  resetPasswordExpire: Date
}, {
  timestamps: true
});

// Password hashing before save
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Match password method
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;
