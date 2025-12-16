import { Request, Response, NextFunction } from "express";
import { User } from "../models/User.model";

type Trole = "admin" | "user" | "moderator"
// Permite solo usuarios con un rol específico
export function requireRole(role:Trole ) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findById((req as any).userId);

    if (!user) return res.status(401).json({ error: "User not found" });

    if (!user.roles.includes(role)) {
      return res.status(403).json({ error: "Forbidden: insufficient role" });
    }

    next();
  };
}

// Permite usuarios con uno de varios roles
export function requireAnyRole(roles: Trole[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findById((req as any).userId);

    if (!user) return res.status(401).json({ error: "User not found" });

    const allowed = roles.some((r:Trole) => user.roles.includes(r));
    if (!allowed) {
      return res.status(403).json({ error: "Forbidden: insufficient role" });
    }

    next();
  };
}
