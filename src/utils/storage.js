export const getGuards = () => {
    const guards = localStorage.getItem("guards");
    return guards ? JSON.parse(guards) : [];
};

export const saveGuards = (guards) => {
    localStorage.setItem("guards", JSON.stringify(guards));
};
