const fetchUser = async () => {
  const res = await fetch("/api/v1/me");
  const data = await res.json();

  return { status: res.status, data };
};

export { fetchUser };
