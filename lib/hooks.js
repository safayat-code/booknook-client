"use client";
import { useCallback, useEffect, useState } from "react";
import { api } from "./api";

export function usePageTitle(title) {
  useEffect(() => {
    document.title = `BookNook | ${title}`;
  }, [title]);
}

export function useApi(path, { auth = false } = {}) {
  const [state, setState] = useState({ data: null, loading: true, error: null });

  const load = useCallback(async () => {
    setState((s) => ({ ...s, loading: true, error: null }));
    try {
      const data = await api(path, { auth });
      setState({ data, loading: false, error: null });
    } catch (e) {
      setState({ data: null, loading: false, error: e.message });
    }
  }, [path, auth]);

  useEffect(() => {
    load();
  }, [load]);

  const setData = (fn) =>
    setState((s) => ({ ...s, data: typeof fn === "function" ? fn(s.data) : fn }));

  return { ...state, reload: load, setData };
}
