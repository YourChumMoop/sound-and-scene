console.log('****starting server/src/types/express/index.d.ts****')

declare namespace Express {
    interface Request {
      user?: {
        username: string;
      };
    }
  }
