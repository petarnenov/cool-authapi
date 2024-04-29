export const login = (payload={})=>(res)=>{
    res.status(200).json({
        status: "success",
        message: "Login successful",
        data: payload
    });
}

export const refresh = (payload={})=>(res)=>{
    res.status(200).json({
        status: "success",
        message: "Refresh token successful",
        data: payload
    });
}

export const signUp = (payload={})=>(res)=>{
    res.status(201).json({
        status: "success",
        message: "Registration successful",
        data: payload
    });
}

export const logout = (res)=>res.status(200).json({status: "success", message: "Logout successful"});

export const deleteUser = (payload={})=>(res)=>{
    res.status(200).json({
        status: "success",
        message: "User deleted",
        data: payload
    });
}

export const updateUser = (payload={})=>(res)=>{
    res.status(200).json({
        status: "success",
        message: "User updated",
        data: payload
    });
}
