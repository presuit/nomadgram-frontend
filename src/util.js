export const convertDate = (date) => {
    const newFormDate = new Date(date);
    const year = newFormDate.getFullYear();
    const month = newFormDate.getMonth();
    const day = newFormDate.getDate();

    return `${year}년 ${month}월 ${day}일`;
};
