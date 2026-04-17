export const requiredValidator = (value) =>{
    return !!value || "این بخش ضروری میباشد"
}

export const emailValidator = (value) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(value) || "ایمیل نادرست است";
};