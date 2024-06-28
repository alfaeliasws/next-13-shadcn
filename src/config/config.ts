type configType = {
  dbPool: {
    host: string;
    user: string;
    password: string;
    database: string;
    waitForConnections: boolean;
    connectionLimit: number;
  };
  jwt1: string;
  jwt2: string;
};

export const config: configType = {
  dbPool: {
    host: process.env.DB_HOST ?? "",
    user: process.env.DB_USERNAME ?? "",
    password: process.env.DB_PASSWORD ?? "",
    database: process.env.DB_NAME ?? "",
    waitForConnections: true, // (optional) Whether the pool should wait for a connection to be available if none are available.
    connectionLimit: 10, // (optional) Maximum number of connections in the pool
  },
  jwt1: process.env.NEXT_PUBLIC_JWT_1 ?? "",
  jwt2: process.env.JWT_2 ?? "",
};

