export default {
  common: {
    serverError: () => "There is a server error. Sorry for inconvenience",
    valueAlreadyExist: (name, value) => `The ${name} (${value}) already exist`,
    fileUploadFailed: () => "File to upload file",
    fileUploadSuccess: () => "File uploaded successfully",
    requiredValidImageFile: () => "Required a valid image file",
    invalidFileType: (allowedTypes) => `Invalid file type allowed types are ${allowedTypes}`,
    fileSizeTooLarge: (allowedFileSize, format) => `File Size is too large. Allowed file size is ${allowedFileSize} ${format}`,
  },
  validation: {
    invalidEmail: () => "The email address is not valid!",
    maxLength: (name, maxLength) => `The ${name} has more than ${maxLength} characters`,
    minLength: (name, minLength) => `The ${name} requires length should be ${minLength} or more`,
    required: (name) => `The ${name} is required!`,
  },
};
