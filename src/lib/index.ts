const fetchUser = async () => {
  const res = await fetch("/api/v1/me");
  const me = await res.json();

  return { ok: false, me };
};

export { fetchUser };
