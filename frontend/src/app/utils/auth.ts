import { GetServerSidePropsContext } from "next";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "DSJSJDKEWJKL#$&U#*$&^@*(359439849457348543438GHGDHJGJHFD3784637463";

export const requireAuth = async (ctx: GetServerSidePropsContext) => {
  const { req } = ctx;
  const token = req.cookies.auth_token;

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    return { props: { user: decoded } };
  } catch {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
};
