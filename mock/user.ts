import type { Request, Response } from 'express';
import { waitTime, defaultUser } from './utils';

type UserRole = 'admin' | 'contributor' | 'verifier';
type UserStatus = 'Active' | 'Inactive';

interface UserAccount {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
}

const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION } =
  process.env;

const users: UserAccount[] = [
  {
    id: '1',
    name: 'System Administrator',
    email: 'admin@example.com',
    password: 'lci.database',
    role: 'admin',
    status: 'Active',
    createdAt: '2026-11-17',
  },
  {
    id: '2',
    name: 'Contributor',
    email: 'user@example.com',
    password: 'lci.database',
    role: 'contributor',
    status: 'Active',
    createdAt: '2026-11-17',
  },
  {
    id: '3',
    name: 'Verifier',
    email: 'verifier@example.com',
    password: 'lci.database',
    role: 'verifier',
    status: 'Active',
    createdAt: '2026-11-17',
  },
];

let currentUserId: string | null =
  ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site'
    ? '1'
    : null;

let nextUserId = 4;

const getCurrentUser = () =>
  users.find((user) => user.id === currentUserId);

const getSafeUser = (user: UserAccount) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  role: user.role,
  status: user.status,
  createdAt: user.createdAt,
});

const isAdmin = () => getCurrentUser()?.role === 'admin';

const validRoles: UserRole[] = [
  'admin',
  'contributor',
  'verifier',
];

export default {
  'GET /api/currentUser': (_req: Request, res: Response) => {
    const user = getCurrentUser();

    if (!user || user.status !== 'Active') {
      currentUserId = null;

      res.status(401).send({
        data: {
          isLogin: false,
        },
        errorCode: '401',
        errorMessage: 'Please login first.',
        success: false,
      });
      return;
    }

    res.send({
      success: true,
      data: {
        ...defaultUser,
        userid: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        access: user.role,
      },
    });
  },

  'GET /api/users': (_req: Request, res: Response) => {
    if (!isAdmin()) {
      res.status(403).send({
        success: false,
        message: 'Access denied.',
      });
      return;
    }

    res.send({
      success: true,
      data: users.map(getSafeUser),
    });
  },

  'POST /api/users': (req: Request, res: Response) => {
    if (!isAdmin()) {
      res.status(403).send({
        success: false,
        message: 'Access denied.',
      });
      return;
    }

    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      res.status(400).send({
        success: false,
        message: 'Please complete all required fields.',
      });
      return;
    }

    if (!validRoles.includes(role)) {
      res.status(400).send({
        success: false,
        message: 'Invalid user role.',
      });
      return;
    }

    const normalizedEmail = String(email).trim().toLowerCase();

    const emailExists = users.some(
      (user) => user.email.toLowerCase() === normalizedEmail,
    );

    if (emailExists) {
      res.status(409).send({
        success: false,
        message: 'Email is already registered.',
      });
      return;
    }

    const newUser: UserAccount = {
      id: String(nextUserId++),
      name: String(name).trim(),
      email: normalizedEmail,
      password: String(password),
      role,
      status: 'Active',
      createdAt: new Date().toISOString().slice(0, 10),
    };

    users.push(newUser);

    res.send({
      success: true,
      data: getSafeUser(newUser),
      message: 'User created successfully.',
    });
  },

  'PUT /api/users/:id': (req: Request, res: Response) => {
    if (!isAdmin()) {
      res.status(403).send({
        success: false,
        message: 'Access denied.',
      });
      return;
    }

    const user = users.find(
      (item) => item.id === req.params.id,
    );

    if (!user) {
      res.status(404).send({
        success: false,
        message: 'User not found.',
      });
      return;
    }

    const { name, email, role, password } = req.body;

    if (!name || !email || !role) {
      res.status(400).send({
        success: false,
        message: 'Please complete all required fields.',
      });
      return;
    }

    if (!validRoles.includes(role)) {
      res.status(400).send({
        success: false,
        message: 'Invalid user role.',
      });
      return;
    }

    const normalizedEmail = String(email).trim().toLowerCase();

    const emailExists = users.some(
      (item) =>
        item.id !== user.id &&
        item.email.toLowerCase() === normalizedEmail,
    );

    if (emailExists) {
      res.status(409).send({
        success: false,
        message: 'Email is already registered.',
      });
      return;
    }

    user.name = String(name).trim();
    user.email = normalizedEmail;
    user.role = role;

    if (password) {
      user.password = String(password);
    }

    res.send({
      success: true,
      data: getSafeUser(user),
      message: 'User updated successfully.',
    });
  },

  'PATCH /api/users/:id/status': (req: Request, res: Response) => {
    if (!isAdmin()) {
      res.status(403).send({
        success: false,
        message: 'Access denied.',
      });
      return;
    }

    const user = users.find(
      (item) => item.id === req.params.id,
    );

    if (!user) {
      res.status(404).send({
        success: false,
        message: 'User not found.',
      });
      return;
    }

    if (user.id === '1') {
      res.status(400).send({
        success: false,
        message: 'The main administrator account cannot be deactivated.',
      });
      return;
    }

    const { status } = req.body;

    if (status !== 'Active' && status !== 'Inactive') {
      res.status(400).send({
        success: false,
        message: 'Invalid user status.',
      });
      return;
    }

    user.status = status;

    res.send({
      success: true,
      data: getSafeUser(user),
      message: 'User status updated successfully.',
    });
  },

  'POST /api/login/account': async (
    req: Request,
    res: Response,
  ) => {
    const { password, email, type } = req.body;

    await waitTime(1000);

    const normalizedEmail = String(email || '')
      .trim()
      .toLowerCase();

    const user = users.find(
      (item) => item.email.toLowerCase() === normalizedEmail,
    );

    // Invalid email or password
    if (!user || user.password !== password) {
      currentUserId = null;

      res.send({
        status: 'error',
        type,
        currentAuthority: 'guest',
        message: 'Invalid email or password.',
      });
      return;
    }
    // Account has been deactivated
    if (user.status !== 'Active') {
      currentUserId = null;

      res.send({
        status: 'inactive',
        type,
        currentAuthority: 'guest',
        message:
          'Your account has been deactivated. Please contact the Administrator.',
      });
      return;
    }

    // Login successful
    currentUserId = user.id;

    res.send({
      status: 'ok',
      type,
      currentAuthority: user.role,
    });
  },
};