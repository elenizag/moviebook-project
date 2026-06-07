const API_URL = "http://localhost:8000/api/auth";

export const register = async (credentials: { 
    name: string;
    username: string;
    email: string;
    password: string; 
    password_confirmation: string;
    }) => {
    try {
        const response = await fetch(`${API_URL}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });

        if (!response.ok) {
            throw new Error('Registration failed');
        }

    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const login = async (credentials: { email: string; password: string }) => {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

    } catch (error) {
        console.log(error);
        throw error;
    }

};

export const user = async () => {
    try {
        const response = await fetch(`${API_URL}/me`, {
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data?.message || 'Credential failed');
        }

        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }

};

export const logout = async () => {
    try {
        const response = await fetch(`${API_URL}/logout`, {
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
        });


        if (!response.ok) {
            throw new Error('Logout failed');
        }

    } catch (error) {
        console.log(error);
        throw error;
    }


};