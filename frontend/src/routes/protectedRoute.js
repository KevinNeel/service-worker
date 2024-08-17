import { Link, Navigate } from 'react-router-dom';

import User from '../Pages/User';

const protectedRoute = [
    { path: '*', element: <Navigate to='/' replace /> },
    { path: '/', element: <User /> },

]

export default protectedRoute