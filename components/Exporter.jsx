import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Box, Button, SvgIcon, Typography } from "@mui/material";

import { useAppContext } from "context";
import Sheet from "assets/Sheet.svg";
import { differenceInHours } from "date-fns";

const Select = dynamic(() => import("./Select"));
const GoogleAuth = dynamic(() => import("./GoogleAuth"));
const NoConnectionNode = dynamic(() => import("./NoConnectionNode"));

export default function Exporter({ node }) {
  const intervalRef = useRef();
  const [form, setForm] = useState({ account: null, sheet: null, tab: null });
  const [options, setOptions] = useState({ sheets: [], tabs: [] });
  const [errors, setErrors] = useState({});
  const [exported, setExported] = useState(null);
  const [displayExported, setDisplayExported] = useState(null);

  const { accounts, signIn, getNode } = useAppContext();
  const leftNode = useMemo(() => getNode(node.left), [getNode, node.left]);

  const fetchExported = useCallback(async () => {
    if (!accounts.length) return;
    try {
      const res = await fetch(`/api/export/${node.id}`);
      const data = await res.json();
      if (!res.ok) throw data;

      setExported(data.exported);
      const arrRes = await Promise.all([
        fetch(`/api/accounts/sheets/${data.account}`),
        fetch(`/api/accounts/tabs/${data.sheet}`),
      ]);
      const [resSheets, resTabs] = arrRes;
      const sheets = await resSheets.json();
      const tabs = await resTabs.json();
      setOptions({ sheets, tabs });
      const account = accounts.find((a) => a.id === data.account);
      const sheet = sheets.find((a) => a.id === data.sheet);
      const tab = tabs.find((a) => a.id === data.tab);
      setForm({ account, sheet, tab });
    } catch (err) {
      console.error(err);
    }
  }, [accounts, node.id]);

  useEffect(() => {
    fetchExported();
  }, [fetchExported]);

  useEffect(() => {
    if (!exported) return;
    setDisplayExported(new Date());
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setDisplayExported(new Date());
    }, 1000 * 60 * 60);

    return () => intervalRef.current && clearInterval(intervalRef.current);
  }, [exported]);

  async function selectAccount(id) {
    const account = accounts.find((a) => a.id === id);
    setForm({ account, sheet: null, tab: null });
    setErrors({ account: undefined, sheet: undefined, tab: undefined });
    try {
      const res = await fetch(`/api/accounts/sheets/${account.id}`);
      const data = await res.json();
      setOptions({ sheets: data, tabs: [] });
    } catch (err) {
      console.error(err.message || err);
    }
  }

  function unselectAccount() {
    setForm({ account: null, sheet: null, tab: null });
    setOptions({ sheets: [], tabs: [] });
  }

  async function selectSheet(id) {
    const sheet = options.sheets.find((s) => s.id === id);
    setForm((v) => ({ ...v, sheet, tab: null }));
    setErrors((v) => ({ ...v, sheet: undefined, tab: undefined }));
    try {
      const res = await fetch(`/api/accounts/tabs/${sheet.id}`);
      const data = await res.json();
      setOptions((v) => ({ ...v, tabs: data }));
    } catch (err) {
      console.error(err.message || err);
    }
  }

  function unselectSheet() {
    setForm((v) => ({ ...v, sheet: null, tab: null }));
    setOptions((v) => ({ ...v, tabs: [] }));
  }

  function selectTab(id) {
    const tab = options.tabs.find((t) => t.id === id);
    setForm((v) => ({ ...v, tab }));
    setErrors((v) => ({ ...v, tab: undefined }));
  }

  function validate() {
    let errs = {};
    if (!form.account) errs = { ...errs, account: "Required" };
    if (!form.sheet) errs = { ...errs, sheet: "Required" };
    if (!form.tab) errs = { ...errs, tab: "Required" };

    setErrors(errs);
    return errs;
  }

  async function handleExport(e) {
    e.preventDefault();
    const isValid = !Boolean(Object.keys(validate()).length);
    if (!isValid) return;

    try {
      const res = await fetch("/api/export", { method: "POST", body: form });
      const data = await res.json();
      setExported(data.exported);
    } catch (err) {
      console.error(err.message || err);
    }
  }

  if (!accounts.length) return <GoogleAuth onSignIn={signIn} />;
  if (!leftNode) return <NoConnectionNode />;

  return (
    <form onSubmit={handleExport}>
      <Select
        sx={{ marginBottom: "12px" }}
        label="Google Account"
        placeholder="Account Name"
        value={form.account?.id}
        displayValue={form.account?.name}
        onChange={selectAccount}
        onDelete={unselectAccount}
        options={accounts.map((a) => ({ label: a.name, value: a.id }))}
        error={errors.account}
      />

      <Select
        sx={{ marginBottom: "12px" }}
        label="File"
        placeholder="sheetname"
        value={form.sheet?.id}
        displayValue={
          form.sheet?.name ? (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <SvgIcon component={Sheet} sx={{ marginRight: "8px" }} />
              {form.sheet.name}
            </Box>
          ) : null
        }
        onChange={selectSheet}
        onDelete={unselectSheet}
        options={options.sheets.map((s) => ({
          icon: Sheet,
          label: s.name,
          value: s.id,
        }))}
        endAdornment={
          Boolean(form.sheet) && (
            <Select
              placeholder="Tab"
              value={form.tab?.id}
              displayValue={form.tab?.name}
              onChange={selectTab}
              options={options.tabs.map((t) => ({
                label: t.name,
                value: t.id,
              }))}
              sx={{
                height: "auto",
                backgroundColor: "#F5F5F5",
                borderRadius: "24px",
                "& .MuiTypography-root": { color: "#848484" },
                "& .MuiButtonBase-root": { padding: 0 },
              }}
              error={errors.tab}
            />
          )
        }
        error={errors.sheet}
      />

      <Button
        type="submit"
        variant="contained"
        fullWidth
        onClick={handleExport}
        sx={{
          textTransform: "unset",
          fontSize: "10px",
          backgroundColor: "#2483F3",
          height: "32px",
          borderRadius: "5px",
          padding: "10px 12px",
          marginBottom: "8px",
        }}
      >
        Export
      </Button>
      {displayExported && (
        <Typography
          sx={{
            textAlign: "center",
            fontSize: "10px",
            lineHeight: "12px",
            color: "#848484",
          }}
        >
          Last export{" "}
          {differenceInHours(new Date(displayExported), new Date(exported))}h
          ago
        </Typography>
      )}
    </form>
  );
}
