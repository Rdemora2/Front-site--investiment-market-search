export default {
  "*.{js,jsx,ts,tsx}": (filenames) => {
    return [
      `prettier --write ${filenames.join(" ")}`,
      `eslint --fix --max-warnings=100 ${filenames.join(" ")} || true`
    ];
  },
  "*.{json,css,scss,md,html}": (filenames) => {
    return [`prettier --write ${filenames.join(" ")}`];
  }
};
