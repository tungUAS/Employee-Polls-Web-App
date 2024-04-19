export const SET_AUTHED_USER = 'SET_AUTHED_USER';

export function setAuthedUser({id,name}:{id: number | null,name: string | null}) {
    return {
        type: SET_AUTHED_USER,
        id,
        name
    };
};
