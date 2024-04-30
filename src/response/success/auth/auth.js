const defaultPayload ={
    accessToken: null,
    refreshToken: null,
}

export const login = (payload=defaultPayload)=>(res)=>{
    res.status(200).json({
        status: 200,
        statusMessage: "Login successful",
        data: payload
    });
}

export const refresh = (payload=defaultPayload)=>(res)=>{
    res.status(200).json({
        status: 200,
        statusMessage: "Refresh tokens successful",
        data: payload
    });
}

export const signUp = (payload=defaultPayload)=>(res)=>{
    res.status(201).json({
        status: 200,
        statusMessage: "Registration successful",
        data: payload
    });
}

export const logout = (res)=>res.status(200).json({status: 200, statusMessage: "Logout successful", data:defaultPayload});

export const deleteUser = (payload=defaultPayload)=>(res)=>{
    res.status(200).json({
        status: 200,
        statusMessage: "User deleted",
        data: payload
    });
}

export const updateUser = (payload=defaultPayload)=>(res)=>{
    res.status(200).json({
        status: 200,
        statusMessage: "User updated",
        data: payload
    });
}

export const getAllUsers = (payload=defaultPayload)=>(res)=>{
    res.status(200).json({
        status: 200,
        statusMessage: "Users retrieved",
        data: payload
    });
}
