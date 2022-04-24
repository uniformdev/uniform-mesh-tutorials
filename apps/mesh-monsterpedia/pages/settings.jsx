import React, { useState } from "react";
import {
  useUniformMeshLocation,
  Button,
  Input,
  LoadingOverlay,
  Callout,
} from "@uniformdev/mesh-sdk-react";
import { createClient } from "canvas-monsterpedia";
import { useEffect } from "react";

export default function Settings() {
  const { value, setValue } = useUniformMeshLocation();
  const [isWorking, setIsWorking] = useState(false);
  const [message, setMessage] = useState(undefined);
  const [url, setUrl] = useState(value?.url);
  const [client, setClient] = useState();

  useEffect(() => {
    const client = createClient(url);
    setClient(client);
  }, [url]);

  async function onTest() {
    try {
      setIsWorking(true);
      if (!isValidUrl(url)) {
        setMessage({ type: "error", text: "URL is not valid." });
        return;
      }
      const monsters = await client.getMonsters();
      if (monsters?.count >= 0) {
        setMessage({
          type: "success",
          text: `This is a valid endpoint (${monsters.count} monsters returned)`,
        });
      } else {
        setMessage({
          type: "error",
          text: "The endpoint did not return the expected output.",
        });
      }
      return;
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setIsWorking(false);
    }
  }

  function isValidUrl(url) {
    try {
      if (url) new URL(url);
      return true;
    } catch {
      return false;
    }
  }
  
  async function onSave() {
    if (!isValidUrl(url)) {
      setMessage({ type: "error", text: "URL is not valid." });
      return;
    }
    setIsWorking(true);
    try {
      await setValue({ url });
      setMessage({ type: "success", text: "Settings were saved." });
    } catch (error) {
      setMessage({
        type: "error",
        text: `Unable to save settings: ${error.message}`,
      });
    } finally {
      setIsWorking(false);
    }
  }

  return (
    <>
      <h3 className="main-heading">Monsterpedia settings</h3>
      <p>These settings are used to establish a connection Monsterpedia.</p>
      <div className="space-y-4 relative">
        <LoadingOverlay isActive={isWorking} />
        {message ? <Callout type={message.type}>{message.text}</Callout> : null}
        <Input
          name="url"
          label="URL (optional)"
          onChange={(e) => setUrl(e?.target?.value)}
          value={url}
          placeholder={client?.getUrl()}
        />
        <p className="text-xs text-green-500">
          Specify the URL for the D&amp;D 5th Edition API.
        </p>
        <Button type="submit" buttonType="secondary" onClick={onSave}>
          Save
        </Button>
        <Button type="button" className="ml-2" onClick={onTest}>
          Test
        </Button>
      </div>
    </>
  );
}
