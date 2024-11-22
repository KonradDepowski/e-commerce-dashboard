import mongoose from "mongoose";

type CachedMongoose = {
  conn: unknown | null;
  promise: Promise<unknown> | null;
};

const MONGO_URI = process.env.MONGO_URI;

const cached: CachedMongoose = (
  globalThis as typeof globalThis & { mongoose?: CachedMongoose }
).mongoose || {
  conn: null,
  promise: null,
};

export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn;

  if (!MONGO_URI) throw new Error("MONGO_URI is missing");

  cached.promise =
    cached.promise ||
    mongoose.connect(MONGO_URI, {
      bufferCommands: false,
    });

  cached.conn = await cached.promise;
  return cached.conn;
};
