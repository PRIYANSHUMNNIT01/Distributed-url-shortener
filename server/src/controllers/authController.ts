import { FastifyReply, FastifyRequest } from 'fastify';
import bcrypt from 'bcrypt';
import { User } from '../models/User';

export const register = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { name, email, password } = request.body as {
      name: string;
      email: string;
      password: string;
    };

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return reply.status(400).send({
        message: 'User already exists',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return reply.status(201).send({
      message: 'User registered successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);

    return reply.status(500).send({
      message: 'Internal Server Error',
    });
  }
};

export const login = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { email, password } = request.body as {
      email: string;
      password: string;
    };

    const user = await User.findOne({ email });

    if (!user) {
      return reply.status(401).send({
        message: 'Invalid credentials',
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return reply.status(401).send({
        message: 'Invalid credentials',
      });
    }

    const token = await reply.jwtSign({
      userId: user._id,
      email: user.email,
    });

    return reply.send({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);

    return reply.status(500).send({
      message: 'Internal Server Error',
    });
  }
};