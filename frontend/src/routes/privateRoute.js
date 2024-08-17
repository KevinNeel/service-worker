import { Navigate } from 'react-router-dom';

import Register from '../Pages/Auth/Register/Register';

const privateRoute = [
    { path: '*', element: <Navigate to='/register' replace /> },
    { path: '/register', element: <Register /> }
]

export default privateRoute