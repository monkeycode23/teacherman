import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },

  avatar: { type: String, default: "https://i.pravatar.cc/32" },
  bio: { type: String, default: null },

  // Verificación de email
  emailVerified: { type: Boolean, default: false },
  verificationToken: { type: String, default: null },
  verificationTokenExpires: { type: Date, default: null },

  // Recuperación de contraseña
  resetPasswordToken: { type: String, default: null },
  resetPasswordExpires: { type: Date, default: null },

  // Seguridad
  failedLoginAttempts: { type: Number, default: 0 },
  lockUntil: { type: Date, default: null },

  //terminos 
  terms: { type: Boolean, default: false },
  privacy: { type: Boolean, default: false },
    
  // Tokens
  refreshTokens: [
    {
      type: Schema.Types.ObjectId,
      ref: "Token",
      default: null,
    }
  ],

  // Roles
  roles: {
      type: [String],
      enum: ["user", "admin", "moderator"],
      default: ["user"],
    },


    projects:[
      { type: Schema.Types.ObjectId, ref: "Project" }
    ],

    clients:[
      { type: Schema.Types.ObjectId, ref: "Client" }
    ],


  // 2FA opcional
  twoFactorEnabled: { type: Boolean, default: false },
  twoFactorSecret: { type: String, default: null },

}, { timestamps: true });

export const User = model("User", UserSchema);
