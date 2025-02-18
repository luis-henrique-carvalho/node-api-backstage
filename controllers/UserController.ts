import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

export class UserController {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await this.prisma.user.findMany();
      res.json({
        message: "List of all users",
        data: users,
      });
    } catch (error) {
      res.status(500).json({ error: "An error occurred while fetching users" });
    }
  }

  async createUser(req: Request, res: Response) {
    const { firstName, lastName, email } = req.body;
    try {
      const user = await this.prisma.user.create({
        data: {
          firstName,
          lastName,
          email,
        },
      });
      res.json({
        message: "User created successfully",
        data: user,
      });
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while creating the user" });
    }
  }
}
