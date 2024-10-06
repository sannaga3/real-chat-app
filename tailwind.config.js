export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        "1/10": "10%",
        "2/10": "20%",
        "3/10": "30%",
        "4/10": "40%",
        "5/10": "50%",
        "6/10": "60%",
        "7/10": "70%",
        "8/10": "80%",
        "9/10": "90%",
      },
      backgroundColor: { bgYellow: "#fef3b5" },
      backgroundImage: {
        "checkered-pattern": `
          linear-gradient(90deg, #f5c400 20px, transparent 20px),
          linear-gradient(#f5c400 20px, transparent 20px),
          linear-gradient(90deg, transparent 20px, #FFD700 20px, #FFD700 25px, transparent 25px),
          linear-gradient(transparent 20px, #FFD700 20px, #FFD700 25px, transparent 25px)
        `,
      },
      backgroundSize: {
        "checkered-size": "150px 150px",
      },
      backgroundPosition: {
        "checkered-position": "-50px -50px",
      },
    },
  },
  plugins: [],
};
