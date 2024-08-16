import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Admin',
        email: 'admin@gmail.com',
        password: bcrypt.hashSync('123456', 5), // Hash the password before storing
        isAdmin: true,
    },
];

export default users;
