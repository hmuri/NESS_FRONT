import Cookies from "universal-cookie";

const cookies = new Cookies();

export const setAccessToken = (accessToken: string): void => {
  const today = new Date();
  const expireDate = today.setDate(today.getDate() + 7);

  cookies.set("accessToken", accessToken, {
    sameSite: "strict",
    path: "/",
    expires: new Date(expireDate),
  });
};

export const setRefreshToken = (refreshToken: string): void => {
  const today = new Date();
  const expireDate = today.setDate(today.getDate() + 14);

  cookies.set("refreshToken", refreshToken, {
    sameSite: "none",
    path: "/",
    httpOnly: false,
    expires: new Date(expireDate),
  });
};

export const getAccessToken = (): string | undefined => {
  return cookies.get("accessToken");
};

export const getRefreshToken = (): string | undefined => {
  console.log("refreshToken", cookies.get("refreshToken"));
  return cookies.get("refreshToken");
};

export const removeAccessToken = (): void => {
  cookies.remove("accessToken", { sameSite: "strict", path: "/" });
};

export const removeRefreshToken = (): void => {
  cookies.remove("refreshToken", { sameSite: "strict", path: "/" });
};
