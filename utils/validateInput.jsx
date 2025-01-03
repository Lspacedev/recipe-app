const validateInput = (type, value) => {
  if (value.trim() === "") {
    return {
      valid: false,
      error: "Input is required",
    };
  }
  if (type === "email") {
    return /\S+\@S+\.\S+/.test(value)
      ? {
          valid: true,
          error: null,
        }
      : {
          valid: false,
          error: "Please insert a valid email",
        };
  }
  if (type === "string") {
    return /([A-Za-z])+/.test(value)
      ? {
          valid: true,
          error: null,
        }
      : {
          valid: false,
          error: "Only alphabets allowed ",
        };
  }
  if (type === "number") {
    return /^\d+$/g.test(value)
      ? {
          valid: true,
          error: null,
        }
      : {
          valid: false,
          error: "Only numbers allowed on this field",
        };
  }
};

export { validateInput };
