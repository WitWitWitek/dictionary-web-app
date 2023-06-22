type originCallback = (err: Error | null, allow?: boolean) => void;

const allowedOrigins = ["http://localhost:5173"];

export const corsOptions = {
  origin: function (origin: string | undefined, callback: originCallback) {
    console.log(origin);
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};
