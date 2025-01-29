const validator = require("validator");

const allowedRequestStatus = ["interested", "ignored"];;

const validatorForEachDocumentField = {
  email: (email) => {
    const isAllowedLength = email.length <= 25;
    if (!isAllowedLength) {
      throw new Error("Enter valid credentials");
    }
  },
  password: (password) => {
    const isAllowedLength = password.length <= 25;
    if (!isAllowedLength) {
      throw new Error("Enter valid credentials");
    }
    const isStrongPassword = validator.isStrongPassword(password);
    if (!isStrongPassword) {
      throw new Error("Enter string password");
    }
  },
  age: (age) => {
    const isValidAge = age >= 0 && age <= 100;
    if (!isValidAge) {
      throw new Error("Enter valid Age");
    }
  },
  skills: (skills) => {
    const isAllowedLength = skills.length <= 10;
    if (!isValidAge) {
      throw new Error("Enter Data Again");
    }
  },
  about: (about) => {
    const isAllowedLength = about.length <= 10;
    if (!isAllowedLength) {
      throw new Error("Enter Data Again");
    }
  },
};

const validateSignupData = (req) => {
  const { email, firstName, password, lastName } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Name is not valid");
  }

  if (firstName.length < 4 || firstName.length > 50) {
    throw new Error("First Name is not valid");
  }

  if (lastName.length < 4 || lastName.length > 50) {
    throw new Error("Last Name is not valid");
  }

  if (!email || !password) {
    throw new Error("Email and password is required");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Email is not valid");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error("Password needs to be Strong");
  }
};

const validateLoginData = (req, fields) => {
  if (!req.body) {
    throw new Error("Please provide email and password");
  }
  const areSpecifiedFields = Object.keys(req?.body).every((field) =>
    fields.includes(field)
  );
  if (!areSpecifiedFields) {
    throw new Error("Data not correct");
  }
  if (!validator.isEmail(req.body.email)) {
    throw new Error("Not a valid email");
  }
};

const validateProfileEdit = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "email",
    "age",
    "gender",
    "photoUrl",
    "about",
    "skills",
  ];
  const requestBody = req.body;
  if (!requestBody) {
    throw new Error("Provide data to edit");
  }
  console.log(requestBody);
  const isEditAllowed = Object.keys(requestBody).every((field) => {
    const isAllowed = allowedEditFields.includes(field);
    return isAllowed;
  });
  console.log(isEditAllowed);
  if (!isEditAllowed) {
    throw new Error("Provided data is not allowed");
  }
};

const validatePasswordData = (req) => {
  const allowedField = ["password"];
  const requestBody = req.body;
  const isPasswordEditAllowed = Object.keys(requestBody).every((field) => {
    const isAllowed = allowedField.includes(field);
    return isAllowed;
  });
  if (!isPasswordEditAllowed) {
    throw new Error("'Provided data is not allowed'");
  }
  const { password } = req.body;
  validatorForEachDocumentField['password'](password);
};

const validateSendRequestStatus = (status) => {
  if(!allowedRequestStatus.includes(status)) {
    throw new Error("Invalid Status type")
  }
}

module.exports = {
  validateSignupData,
  validateLoginData,
  validateProfileEdit,
  validatePasswordData,
  validateSendRequestStatus
};
