export const requiredValidator = (value) =>{
    return !!value || "این بخش ضروری مسباشد"
}

export const emailValidator = (value) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(value) || "ایمیل ضروری میباشد";
};